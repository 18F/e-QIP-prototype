package saml

import (
	"encoding/base64"
	"errors"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	saml "github.com/RobotsAndPencils/go-saml"
)

// Service implements the handling of SAMl requests and responses.
type Service struct {
	Log      api.LogService
	Env      api.Settings
	provider saml.ServiceProviderSettings
}

// CreateAuthenticationRequest creates a SAML 2.0 authentication request based on the service provider settings.
// If configured to sign the request then the Base64 XML will be signed.
func (service *Service) CreateAuthenticationRequest() (string, string, error) {
	service.configure()
	var encoded string
	var err error

	// Generate the AuthnRequest and then get a base64 encoded string of the XML
	request := service.provider.GetAuthnRequest()
	if service.provider.SPSignRequest {
		encoded, err = request.EncodedSignedString(service.provider.PrivateKeyPath)
	} else {
		encoded, err = request.EncodedString()
	}

	if err != nil {
		return "", "", err
	}
	requestAsXML, _ := request.String()
	service.Log.Debug("SAML authentication request", api.LogFields{"xml": requestAsXML})

	return encoded, service.provider.IDPSSOURL, err
}

const (
	authnResponseXMLName  = "Response"
	logoutResponseXMLName = "LogoutResponse"
)

// ResponseType returns an "enum" that indicates what type of response the encoded message represents
func (service *Service) ResponseType(encoded string) (api.SAMLResponseType, error) {
	response, err := saml.ParseEncodedResponse(encoded)
	if err != nil {
		service.Log.WarnError(api.SamlParseError, err, api.LogFields{})
		return "", err
	}

	xmlName := response.XMLName.Local
	switch xmlName {
	case authnResponseXMLName:
		return api.AuthnSAMLResponseType, nil
	case logoutResponseXMLName:
		return api.LogoutSAMLResponseType, nil
	default:
		service.Log.Fatal("Unknown SAML response type", api.LogFields{"SAMLResponseType": xmlName})
		return "", errors.New("Unknown SAML response type")
	}
}

// ValidateAuthenticationResponse validations a SAML authentication response.
func (service *Service) ValidateAuthenticationResponse(encoded string) (string, string, error) {
	service.configure()

	authnResponseXML, _ := base64.StdEncoding.DecodeString(encoded)
	service.Log.Debug("SAML authentication response", api.LogFields{"xml": string(authnResponseXML)})

	response, err := saml.ParseEncodedResponse(encoded)
	if err != nil {
		service.Log.WarnError(api.SamlParseError, err, api.LogFields{})
		return "", "", err
	}

	// err = response.Validate(&service.provider)
	err = service.validate(response, string(authnResponseXML))
	if err != nil {
		service.Log.WarnError(api.SamlInvalid, err, api.LogFields{})
		return "", "", err
	}

	username := cleanName(response.Assertion.Subject.NameID.Value)
	if username == "" {
		service.Log.WarnError(api.SamlIdentifierMissing, err, api.LogFields{})
		return "", "", err
	}

	var sessionIndex string
	for _, authnStatement := range response.Assertion.AuthnStatements {
		if authnStatement.SessionIndex != "" {
			sessionIndex = authnStatement.SessionIndex
		}
	}

	if sessionIndex == "" && service.Env.True(api.SamlSloEnabled) {
		service.Log.Warn("SAML Auth Response does not include a SessionIndex. WSO2 is probably misconfigured and SLO will not work correctly.", api.LogFields{})
		return "", "", errors.New("the SAML Auth Response does not include a SessionIndex. WSO2 is probably misconfigured and SLO will not work correctly")
	}

	return username, sessionIndex, nil
}

// Example configuration:
//  - PublicCertPath:              "../default.crt",
//  - PrivateKeyPath:              "../default.key",
//  - IDPSSOURL:                   "http://idp/saml2",
//  - IDPSSODescriptorURL:         "http://idp/issuer",
//  - IDPPublicCertPath:           "idpcert.crt",
//  - SPSignRequest:               "true",
//  - AssertionConsumerServiceURL: "http://localhost:8000/saml_consume",
func (service *Service) configure() {
	service.provider = saml.ServiceProviderSettings{
		PublicCertPath:              service.Env.String(api.SamlPublicCert),
		PrivateKeyPath:              service.Env.String(api.SamlPrivateCert),
		IDPSSOURL:                   service.Env.String(api.SamlIdpSsoURL),
		IDPSSODescriptorURL:         service.Env.String(api.SamlIdpSsoDescURL),
		IDPPublicCertPath:           service.Env.String(api.SamlIdpPublicCert),
		SPSignRequest:               service.Env.True(api.SamlSignRequest),
		AssertionConsumerServiceURL: service.Env.String(api.SamlConsumerServiceURL),
	}

	if service.provider.AssertionConsumerServiceURL == "" {
		service.provider.AssertionConsumerServiceURL = service.Env.String(api.APIBaseURL) + "/auth/saml/callback"
	}

	service.provider.Init()
}

func (service *Service) validate(response *saml.Response, original string) error {
	if response.Version != "2.0" {
		return errors.New("unsupported SAML Version")
	}

	if len(response.ID) == 0 {
		return errors.New("missing ID attribute on SAML Response")
	}

	if len(response.Assertion.ID) == 0 {
		return errors.New("no Assertions")
	}

	if len(response.Signature.SignatureValue.Value) == 0 {
		return errors.New("no signature")
	}

	if response.Destination != service.provider.AssertionConsumerServiceURL {
		return errors.New("destination mismatch exception: " + service.provider.AssertionConsumerServiceURL + " not " + response.Destination)
	}

	if response.Assertion.Subject.SubjectConfirmation.Method != "urn:oasis:names:tc:SAML:2.0:cm:bearer" {
		return errors.New("assertion method exception")
	}

	if response.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient != service.provider.AssertionConsumerServiceURL {
		return errors.New("subject recipient mismatch, expected: " + service.provider.AssertionConsumerServiceURL + " not " + response.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient)
	}

	//CHECK TIMES
	expires := response.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.NotOnOrAfter
	notOnOrAfter, e := time.Parse(time.RFC3339, expires)
	if e != nil {
		return e
	}
	if notOnOrAfter.Before(time.Now()) {
		return errors.New("assertion has expired on: " + expires)
	}

	err := saml.VerifyResponseSignature(original, service.provider.IDPPublicCertPath)
	if err != nil {
		if service.Env.True(api.SamlVerifyInsecure) {
			service.Log.WarnError(api.SamlVerificationError, err, api.LogFields{})
		} else {
			return err
		}
	}

	return nil
}

// cleanName applies some basic sanitization of the NameID for storage.
func cleanName(nameID string) string {
	// Trim any leading or trailing whitespace characters.
	nameID = strings.TrimSpace(nameID)

	// Check for any special whitespace characters within the string and
	// remove them.
	for _, c := range []string{"\n", "\t", "\r"} {
		nameID = strings.Replace(nameID, c, "", -1)
	}

	// The database only allows the username to be 200 characters.
	// Passing an empty substring to `strings.Count()` returns the number of
	// runes + 1.
	if strings.Count(nameID, "")-1 > 200 {
		runes := []rune{}
		for i, r := range nameID {
			if i > 199 {
				break
			}
			runes = append(runes, r)
		}
		nameID = string(runes)
	}

	return nameID
}

// CreateSLORequest creates an encoded SAML Logout Request suitable for sending to the identity server
func (service *Service) CreateSLORequest(username string, sessionIndex string) (string, string, error) {
	service.configure()
	req := newLogoutRequest(service.provider.IDPSSODescriptorURL, service.provider.IDPSSOURL, username, sessionIndex)

	signedRequest, err := req.signedRequest(service.provider.PublicCertPath, service.provider.PrivateKeyPath)
	if err != nil {
		service.Log.WarnError("Failed to sign the SLO Request.", err, api.LogFields{})
		return "", "", err
	}
	encoded := base64.StdEncoding.EncodeToString([]byte(signedRequest))

	return encoded, service.provider.IDPSSOURL, err
}
