package form

// transform provides a library of possible transformations to
// be made on a JSON structure converting it in to an Entity
// interface.
var transform = map[string]func() Entity{
	"benefit":                                         func() Entity { return &Benefit{} },
	"branch":                                          func() Entity { return &Branch{} },
	"checkbox":                                        func() Entity { return &Checkbox{} },
	"checkboxgroup":                                   func() Entity { return &CheckboxGroup{} },
	"clearancelevel":                                  func() Entity { return &ClearanceLevel{} },
	"collection":                                      func() Entity { return &Collection{} },
	"contacts":                                        func() Entity { return &Contacts{} },
	"coowners":                                        func() Entity { return &CoOwners{} },
	"country":                                         func() Entity { return &Country{} },
	"datecontrol":                                     func() Entity { return &DateControl{} },
	"daterange":                                       func() Entity { return &DateRange{} },
	"email":                                           func() Entity { return &Email{} },
	"employmentactivity":                              func() Entity { return &EmploymentActivity{} },
	"foreignborndocument":                             func() Entity { return &ForeignBornDocument{} },
	"height":                                          func() Entity { return &Height{} },
	"location":                                        func() Entity { return &Location{} },
	"name":                                            func() Entity { return &Name{} },
	"notapplicable":                                   func() Entity { return &NotApplicable{} },
	"number":                                          func() Entity { return &Number{} },
	"physicaladdress":                                 func() Entity { return &PhysicalAddress{} },
	"radio":                                           func() Entity { return &Radio{} },
	"reasonleft":                                      func() Entity { return &ReasonLeft{} },
	"reference":                                       func() Entity { return &Reference{} },
	"sentence":                                        func() Entity { return &Sentence{} },
	"signature":                                       func() Entity { return &Signature{} },
	"ssn":                                             func() Entity { return &SSN{} },
	"supervisor":                                      func() Entity { return &Supervisor{} },
	"telephone":                                       func() Entity { return &Telephone{} },
	"text":                                            func() Entity { return &Text{} },
	"textarea":                                        func() Entity { return &Textarea{} },
	"identification.name":                             func() Entity { return &IdentificationName{} },
	"identification.contacts":                         func() Entity { return &IdentificationContacts{} },
	"identification.othernames":                       func() Entity { return &IdentificationOtherNames{} },
	"identification.birthdate":                        func() Entity { return &IdentificationBirthDate{} },
	"identification.birthplace":                       func() Entity { return &IdentificationBirthPlace{} },
	"identification.ssn":                              func() Entity { return &IdentificationSSN{} },
	"identification.physical":                         func() Entity { return &IdentificationPhysical{} },
	"financial.bankruptcy":                            func() Entity { return &FinancialBankruptcy{} },
	"financial.gambling":                              func() Entity { return &FinancialGambling{} },
	"financial.taxes":                                 func() Entity { return &FinancialTaxes{} },
	"financial.card":                                  func() Entity { return &FinancialCard{} },
	"financial.credit":                                func() Entity { return &FinancialCredit{} },
	"financial.delinquent":                            func() Entity { return &FinancialDelinquent{} },
	"financial.nonpayment":                            func() Entity { return &FinancialNonpayment{} },
	"history.residence":                               func() Entity { return &HistoryResidence{} },
	"history.employment":                              func() Entity { return &HistoryEmployment{} },
	"history.education":                               func() Entity { return &HistoryEducation{} },
	"history.federal":                                 func() Entity { return &HistoryFederal{} },
	"relationships.status.marital":                    func() Entity { return &RelationshipsMarital{} },
	"relationships.status.cohabitant":                 func() Entity { return &RelationshipsCohabitants{} },
	"relationships.people":                            func() Entity { return &RelationshipsPeople{} },
	"relationships.relatives":                         func() Entity { return &RelationshipsRelatives{} },
	"citizenship.status":                              func() Entity { return &CitizenshipStatus{} },
	"citizenship.multiple":                            func() Entity { return &CitizenshipMultiple{} },
	"citizenship.passports":                           func() Entity { return &CitizenshipPassports{} },
	"military.selective":                              func() Entity { return &MilitarySelective{} },
	"military.history":                                func() Entity { return &MilitaryHistory{} },
	"military.disciplinary":                           func() Entity { return &MilitaryDisciplinary{} },
	"military.foreign":                                func() Entity { return &MilitaryForeign{} },
	"foreign.passport":                                func() Entity { return &ForeignPassport{} },
	"foreign.contacts":                                func() Entity { return &ForeignContacts{} },
	"foreign.travel":                                  func() Entity { return &ForeignTravel{} },
	"foreign.activities.benefits":                     func() Entity { return &ForeignActivitiesBenefits{} },
	"foreign.activities.direct":                       func() Entity { return &ForeignActivitiesDirect{} },
	"foreign.activities.indirect":                     func() Entity { return &ForeignActivitiesIndirect{} },
	"foreign.activities.realestate":                   func() Entity { return &ForeignActivitiesRealEstate{} },
	"foreign.activities.support":                      func() Entity { return &ForeignActivitiesSupport{} },
	"foreign.business.advice":                         func() Entity { return &ForeignBusinessAdvice{} },
	"foreign.business.conferences":                    func() Entity { return &ForeignBusinessConferences{} },
	"foreign.business.contact":                        func() Entity { return &ForeignBusinessContact{} },
	"foreign.business.employment":                     func() Entity { return &ForeignBusinessEmployment{} },
	"foreign.business.family":                         func() Entity { return &ForeignBusinessFamily{} },
	"foreign.business.political":                      func() Entity { return &ForeignBusinessPolitical{} },
	"foreign.business.sponsorship":                    func() Entity { return &ForeignBusinessSponsorship{} },
	"foreign.business.ventures":                       func() Entity { return &ForeignBusinessVentures{} },
	"foreign.business.voting":                         func() Entity { return &ForeignBusinessVoting{} },
	"substance.drug.clearance":                        func() Entity { return &SubstanceDrugClearance{} },
	"substance.drug.misuse":                           func() Entity { return &SubstanceDrugMisuse{} },
	"substance.drug.ordered":                          func() Entity { return &SubstanceDrugOrdered{} },
	"substance.drug.publicsafety":                     func() Entity { return &SubstanceDrugPublicSafety{} },
	"substance.drug.purchase":                         func() Entity { return &SubstanceDrugPurchase{} },
	"substance.drug.usage":                            func() Entity { return &SubstanceDrugUsage{} },
	"substance.drug.voluntary":                        func() Entity { return &SubstanceDrugVoluntary{} },
	"substance.alcohol.negative":                      func() Entity { return &SubstanceAlcoholNegative{} },
	"substance.alcohol.ordered":                       func() Entity { return &SubstanceAlcoholOrdered{} },
	"substance.alcohol.voluntary":                     func() Entity { return &SubstanceAlcoholVoluntary{} },
	"substance.alcohol.additional":                    func() Entity { return &SubstanceAlcoholAdditional{} },
	"legal.associations.activities-to-overthrow":      func() Entity { return &LegalAssociationsActivitiesToOverthrow{} },
	"legal.associations.advocating":                   func() Entity { return &LegalAssociationsAdvocating{} },
	"legal.associations.engaged-in-terrorism":         func() Entity { return &LegalAssociationsEngagedInTerrorism{} },
	"legal.associations.membership-overthrow":         func() Entity { return &LegalAssociationsMembershipOverthrow{} },
	"legal.associations.membership-violence-or-force": func() Entity { return &LegalAssociationsMembershipViolence{} },
	"legal.associations.terrorism-association":        func() Entity { return &LegalAssociationsTerrorismAssociation{} },
	"legal.associations.terrorist-organization":       func() Entity { return &LegalAssociationsTerroristOrganization{} },
	"legal.court":                                     func() Entity { return &LegalCourt{} },
	"legal.investigations.debarred":                   func() Entity { return &LegalInvestigationsDebarred{} },
	"legal.investigations.history":                    func() Entity { return &LegalInvestigationsHistory{} },
	"legal.investigations.revoked":                    func() Entity { return &LegalInvestigationsRevoked{} },
	"legal.police.additionaloffenses":                 func() Entity { return &LegalPoliceAdditionalOffenses{} },
	"legal.police.domesticviolence":                   func() Entity { return &LegalPoliceDomesticViolence{} },
	"legal.police.offenses":                           func() Entity { return &LegalPoliceOffenses{} },
	"legal.technology.manipulating":                   func() Entity { return &LegalTechnologyManipulating{} },
	"legal.technology.unauthorized":                   func() Entity { return &LegalTechnologyUnauthorized{} },
	"legal.technology.unlawful":                       func() Entity { return &LegalTechnologyUnlawful{} },
	"psychological.competence":                        func() Entity { return &PsychologicalCompetence{} },
	"psychological.consultations":                     func() Entity { return &PsychologicalConsultations{} },
	"psychological.diagnoses":                         func() Entity { return &PsychologicalDiagnoses{} },
	"psychological.conditions":                        func() Entity { return &PsychologicalExisting{} },
	"psychological.hospitalizations":                  func() Entity { return &PsychologicalHospitalizations{} },
	"psychological.treatment":                         func() Entity { return &Treatment{} },
	"submission.releases":                             func() Entity { return &Submission{} },
	"submission.additionalcomments":                   func() Entity { return &SubmissionAdditionalComments{} },
	"submission.general":                              func() Entity { return &SubmissionGeneral{} },
	"submission.medical":                              func() Entity { return &SubmissionMedical{} },
	"submission.credit":                               func() Entity { return &SubmissionCredit{} },
}
