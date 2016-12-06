package handlers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/truetandem/e-QIP-prototype/api/twofactor"
)

var (
	secret = twofactor.Secret()
)

// TwofactorHandler is the initial entry and subscription for two-factor
// authentication.
func TwofactorHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	account := vars["account"]

	png, err := twofactor.Generate(account, secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, png)
}

// TwofactorVerifyHandler verifies a token provided by the end user.
func TwofactorVerifyHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		fmt.Fprintf(w, "")
		return
	}

	var body struct {
		Token string
	}
	DecodeJSON(r.Body, &body)

	ok, err := twofactor.Authenticate(body.Token, secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "Failed two-factor authentication", http.StatusUnauthorized)
		return
	}

	fmt.Fprintf(w, "")
}

// TwofactorEmailHandler sends a token to the user by email.
func TwofactorEmailHandler(w http.ResponseWriter, r *http.Request) {
	err := twofactor.Email("fake@mail.gov", secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "")
}
