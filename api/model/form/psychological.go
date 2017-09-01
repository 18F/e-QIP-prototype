package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type PsychologicalCompetence struct {
	PayloadIsIncompetent Payload `json:"IsIncompetent" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	IsIncompetent *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int
	AccountID       int64
	IsIncompetentID int
	ListID          int
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalCompetence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	isIncompetent, err := entity.PayloadIsIncompetent.Entity()
	if err != nil {
		return err
	}
	entity.IsIncompetent = isIncompetent.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalCompetence) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.IsIncompetent.Valid(); !ok {
		stack.Append("PsychologicalCompetence", err)
	}

	if entity.IsIncompetent.Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalCompetence", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalCompetence) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	isIncompetentID, err := entity.IsIncompetent.Save(context, account)
	if err != nil {
		return isIncompetentID, err
	}
	entity.IsIncompetentID = isIncompetentID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&PsychologicalCompetence{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *PsychologicalCompetence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalCompetence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type PsychologicalConsultations struct {
	PayloadConsulted Payload `json:"Consulted" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	Consulted *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int
	AccountID   int64
	ConsultedID int
	ListID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalConsultations) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	consulted, err := entity.PayloadConsulted.Entity()
	if err != nil {
		return err
	}
	entity.Consulted = consulted.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalConsultations) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Consulted.Valid(); !ok {
		stack.Append("PsychologicalConsultations", err)
	}

	if entity.Consulted.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("PsychologicalConsultations", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalConsultations) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	consultedID, err := entity.Consulted.Save(context, account)
	if err != nil {
		return consultedID, err
	}
	entity.ConsultedID = consultedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&PsychologicalConsultations{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *PsychologicalConsultations) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalConsultations) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type PsychologicalDiagnoses struct {
	PayloadDiagnosed     Payload `json:"Diagnosed" sql:"-"`
	PayloadDidNotConsult Payload `json:"DidNotConsult" sql:"-"`
	PayloadDiagnosisList Payload `json:"DiagnosisList" sql:"-"`
	PayloadInTreatment   Payload `json:"InTreatment" sql:"-"`
	PayloadTreatmentList Payload `json:"TreatmentList" sql:"-"`

	// Validator specific fields
	Diagnosed     *Branch     `json:"-"`
	DidNotConsult *Branch     `json:"-"`
	DiagnosisList *Collection `json:"-"`
	InTreatment   *Branch     `json:"-"`
	TreatmentList *Collection `json:"-"`

	// Persister specific fields
	ID              int
	AccountID       int64
	DiagnosedID     int
	DidNotConsultID int
	DiagnosisListID int
	InTreatmentID   int
	TreatmentListID int
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalDiagnoses) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	diagnosed, err := entity.PayloadDiagnosed.Entity()
	if err != nil {
		return err
	}
	entity.Diagnosed = diagnosed.(*Branch)

	didNotConsult, err := entity.PayloadDidNotConsult.Entity()
	if err != nil {
		return err
	}
	entity.DidNotConsult = didNotConsult.(*Branch)

	diagnosisList, err := entity.PayloadDiagnosisList.Entity()
	if err != nil {
		return err
	}
	entity.DiagnosisList = diagnosisList.(*Collection)

	inTreatment, err := entity.PayloadInTreatment.Entity()
	if err != nil {
		return err
	}
	entity.InTreatment = inTreatment.(*Branch)

	treatmentList, err := entity.PayloadTreatmentList.Entity()
	if err != nil {
		return err
	}
	entity.TreatmentList = treatmentList.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalDiagnoses) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Diagnosed.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if entity.Diagnosed.Value == "Yes" {
		if ok, err := entity.DiagnosisList.Valid(); !ok {
			stack.Append("PsychologicalDiagnoses", err)
		}
	}

	if ok, err := entity.DidNotConsult.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if ok, err := entity.InTreatment.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if entity.InTreatment.Value == "Yes" {
		if ok, err := entity.TreatmentList.Valid(); !ok {
			stack.Append("PsychologicalDiagnoses", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalDiagnoses) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	diagnosedID, err := entity.Diagnosed.Save(context, account)
	if err != nil {
		return diagnosedID, err
	}
	entity.DiagnosedID = diagnosedID

	didNotConsultID, err := entity.DidNotConsult.Save(context, account)
	if err != nil {
		return didNotConsultID, err
	}
	entity.DidNotConsultID = didNotConsultID

	diagnosisListID, err := entity.DiagnosisList.Save(context, account)
	if err != nil {
		return diagnosisListID, err
	}
	entity.DiagnosisListID = diagnosisListID

	inTreatmentID, err := entity.InTreatment.Save(context, account)
	if err != nil {
		return inTreatmentID, err
	}
	entity.InTreatmentID = inTreatmentID

	treatmentListID, err := entity.TreatmentList.Save(context, account)
	if err != nil {
		return treatmentListID, err
	}
	entity.TreatmentListID = treatmentListID

	err = context.CreateTable(&PsychologicalDiagnoses{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *PsychologicalDiagnoses) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalDiagnoses) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type PsychologicalHospitalizations struct {
	PayloadHospitalized Payload `json:"Hospitalized" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	Hospitalized *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HospitalizedID int
	ListID         int
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalHospitalizations) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hospitalized, err := entity.PayloadHospitalized.Entity()
	if err != nil {
		return err
	}
	entity.Hospitalized = hospitalized.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalHospitalizations) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Hospitalized.Valid(); !ok {
		stack.Append("PsychologicalHospitalizations", err)
	}

	if entity.Hospitalized.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("PsychologicalHospitalizations", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalHospitalizations) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hospitalizedID, err := entity.Hospitalized.Save(context, account)
	if err != nil {
		return hospitalizedID, err
	}
	entity.HospitalizedID = hospitalizedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&PsychologicalHospitalizations{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *PsychologicalHospitalizations) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalHospitalizations) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type PsychologicalExisting struct {
	PayloadHasCondition            Payload `json:"HasCondition" sql:"-"`
	PayloadReceivedTreatment       Payload `json:"ReceivedTreatment" sql:"-"`
	PayloadExplanation             Payload `json:"Explanation" sql:"-"`
	PayloadTreatmentList           Payload `json:"TreatmentList" sql:"-"`
	PayloadDidNotFollow            Payload `json:"DidNotFollow" sql:"-"`
	PayloadDidNotFollowExplanation Payload `json:"DidNotFollowExplanation" sql:"-"`

	// Validator specific fields
	HasCondition            *Branch     `json:"-"`
	ReceivedTreatment       *Branch     `json:"-"`
	Explanation             *Textarea   `json:"-"`
	TreatmentList           *Collection `json:"-"`
	DidNotFollow            *Branch     `json:"-"`
	DidNotFollowExplanation *Textarea   `json:"-"`

	// Persister specific fields
	ID                        int
	AccountID                 int64
	HasConditionID            int
	ReceivedTreatmentID       int
	ExplanationID             int
	TreatmentListID           int
	DidNotFollowID            int
	DidNotFollowExplanationID int
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalExisting) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCondition, err := entity.PayloadHasCondition.Entity()
	if err != nil {
		return err
	}
	entity.HasCondition = hasCondition.(*Branch)

	receivedTreatment, err := entity.PayloadReceivedTreatment.Entity()
	if err != nil {
		return err
	}
	entity.ReceivedTreatment = receivedTreatment.(*Branch)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	treatmentList, err := entity.PayloadTreatmentList.Entity()
	if err != nil {
		return err
	}
	entity.TreatmentList = treatmentList.(*Collection)

	didNotFollow, err := entity.PayloadDidNotFollow.Entity()
	if err != nil {
		return err
	}
	entity.DidNotFollow = didNotFollow.(*Branch)

	didNotFollowExplanation, err := entity.PayloadDidNotFollowExplanation.Entity()
	if err != nil {
		return err
	}
	entity.DidNotFollowExplanation = didNotFollowExplanation.(*Textarea)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalExisting) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasCondition.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if entity.HasCondition.Value == "No" {
		return !stack.HasErrors(), stack
	}

	if ok, err := entity.ReceivedTreatment.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if entity.ReceivedTreatment.Value == "Yes" {
		if ok, err := entity.TreatmentList.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	} else if entity.ReceivedTreatment.Value == "No" {
		if ok, err := entity.Explanation.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	}

	if ok, err := entity.DidNotFollow.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if entity.DidNotFollow.Value == "Yes" {
		if ok, err := entity.DidNotFollowExplanation.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalExisting) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasConditionID, err := entity.HasCondition.Save(context, account)
	if err != nil {
		return hasConditionID, err
	}
	entity.HasConditionID = hasConditionID

	receivedTreatmentID, err := entity.ReceivedTreatment.Save(context, account)
	if err != nil {
		return receivedTreatmentID, err
	}
	entity.ReceivedTreatmentID = receivedTreatmentID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	treatmentListID, err := entity.TreatmentList.Save(context, account)
	if err != nil {
		return treatmentListID, err
	}
	entity.TreatmentListID = treatmentListID

	didNotFollowID, err := entity.DidNotFollow.Save(context, account)
	if err != nil {
		return didNotFollowID, err
	}
	entity.DidNotFollowID = didNotFollowID

	didNotFollowExplanationID, err := entity.DidNotFollowExplanation.Save(context, account)
	if err != nil {
		return didNotFollowExplanationID, err
	}
	entity.DidNotFollowExplanationID = didNotFollowExplanationID

	err = context.CreateTable(&PsychologicalExisting{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *PsychologicalExisting) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalExisting) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type PsychologicalTreatment struct {
	PayloadName    Payload `json:"Name" sql:"-"`
	PayloadPhone   Payload `json:"Phone" sql:"-"`
	PayloadAddress Payload `json:"Address" sql:"-"`

	// Validator specific fields
	Name    *Name      `json:"-"`
	Phone   *Telephone `json:"-"`
	Address *Location  `json:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	NameID    int
	PhoneID   int
	AddressID int
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalTreatment) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Name)

	phone, err := entity.PayloadPhone.Entity()
	if err != nil {
		return err
	}
	entity.Phone = phone.(*Telephone)

	address, err := entity.PayloadAddress.Entity()
	if err != nil {
		return err
	}
	entity.Address = address.(*Location)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalTreatment) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Name.Valid(); !ok {
		stack.Append("PsychologicalTreatment", err)
	}

	if ok, err := entity.Phone.Valid(); !ok {
		stack.Append("PsychologicalTreatment", err)
	}

	if ok, err := entity.Address.Valid(); !ok {
		stack.Append("PsychologicalTreatment", err)
	}

	return !stack.HasErrors(), stack
}

func (entity *PsychologicalTreatment) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	phoneID, err := entity.Phone.Save(context, account)
	if err != nil {
		return phoneID, err
	}
	entity.PhoneID = phoneID

	addressID, err := entity.Address.Save(context, account)
	if err != nil {
		return addressID, err
	}
	entity.AddressID = addressID

	err = context.CreateTable(&PsychologicalTreatment{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *PsychologicalTreatment) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *PsychologicalTreatment) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
