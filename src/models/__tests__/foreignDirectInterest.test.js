import { validateModel } from 'models/validate'
import foreignDirectInterest from '../foreignDirectInterest'

describe('The foreignDirectInterest model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'InterestTypes.presence.REQUIRED',
      'InterestType.presence.REQUIRED',
      'Acquired.presence.REQUIRED',
      'HowAcquired.presence.REQUIRED',
      'Cost.presence.REQUIRED',
      'Value.presence.REQUIRED',
      'Relinquished.presence.REQUIRED',
      'CoOwners.presence.REQUIRED',
      'Explanation.presence.REQUIRED',
    ]

    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestTypes must have at least one value', () => {
    const testData = {
      InterestTypes: { values: [] },
    }
    const expectedErrors = ['InterestTypes.array.array.length.LENGTH_TOO_SHORT']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('InterestType must have a value', () => {
    const testData = {
      InterestType: { value: false },
    }
    const expectedErrors = ['InterestType.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Acquired must be a valid date', () => {
    const testData = {
      Acquired: { month: 15, year: 9 },
    }
    const expectedErrors = ['Acquired.date.date.datetime.INVALID_DATE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Acquired cannot be in the future', () => {
    const testData = {
      Acquired: { day: 2, month: 11, year: 2030 },
    }
    const expectedErrors = ['Acquired.date.date.datetime.DATE_TOO_LATE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('HowAcquired must have a value', () => {
    const testData = {
      HowAcquired: { value: false },
    }
    const expectedErrors = ['HowAcquired.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Cost must have a value', () => {
    const testData = {
      Cost: { value: false },
    }
    const expectedErrors = ['Cost.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Value must have a value', () => {
    const testData = {
      Value: { value: false },
    }
    const expectedErrors = ['Value.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('CoOwners must be valid', () => {
    const testData = {
      CoOwners: {
        List: {
          items: [
            {
              Item: {
                Has: { value: 'Yes' },
              },
            },
          ],
        },
      },
    }

    const expectedErrors = ['CoOwners.model.List.branchCollection.INCOMPLETE_COLLECTION']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relinquished must be a valid month/year', () => {
    const testData = {
      Relinquished: { day: 2, month: 10 },
    }
    const expectedErrors = [
      'Relinquished.date.year.presence.REQUIRED',
    ]
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relinquished cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Relinquished: { month: 1, year: 1970, day: 2 },
    }

    const expectedErrors = [
      'Relinquished.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, foreignDirectInterest, {
      applicantBirthdate,
    }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Relinquished cannot be in the future', () => {
    const testData = {
      Relinquished: { month: 1, year: 2050, day: 2 },
    }

    const expectedErrors = [
      'Relinquished.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: { value: false },
    }
    const expectedErrors = ['Explanation.hasValue.MISSING_VALUE']
    expect(validateModel(testData, foreignDirectInterest))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if RelinquishedNotApplicable', () => {
    it('Relinquished is not required', () => {
      const testData = {
        RelinquishedNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Relinquished.presence.REQUIRED']
      expect(validateModel(testData, foreignDirectInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('Explanation is not required', () => {
      const testData = {
        RelinquishedNotApplicable: { applicable: false },
      }
      const expectedErrors = ['Explanation.presence.REQUIRED']
      expect(validateModel(testData, foreignDirectInterest))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid foreign direct interest', () => {
      const testData = {
        InterestTypes: { values: ['One', 'Two'] },
        InterestType: { value: 'Something' },
        Acquired: { day: 4, month: 2, year: '2002' },
        HowAcquired: { value: 'I bought it' },
        Cost: { value: 2500 },
        Value: { value: '12000' },
        RelinquishedNotApplicable: { applicable: false },
        CoOwners: {
          List: {
            items: [
              {
                Item: {
                  Has: { value: 'Yes' },
                  Name: { first: 'my', middle: 'full', last: 'name' },
                  Address: {
                    street: '123 Coowner St',
                    city: 'London',
                    country: 'United Kingdom',
                  },
                  Countries: { value: ['United States', 'Canada'] },
                  RelationshipNature: { value: 'Some test thing' },
                },
              },
              { Item: { Has: { value: 'No' } } },
            ],
          },
        },
      }

      expect(validateModel(testData, foreignDirectInterest)).toEqual(true)
    })
  })

  it('passes a valid foreign direct interest', () => {
    const testData = {
      InterestTypes: { values: ['One', 'Two'] },
      InterestType: { value: 'Something' },
      Acquired: { day: 2, month: 2, year: '2002' },
      HowAcquired: { value: 'I bought it' },
      Cost: { value: 2500 },
      Value: { value: '12000' },
      Relinquished: { day: 12, month: '10', year: '2010' },
      Explanation: { value: 'I sold it' },
      CoOwners: {
        List: {
          items: [
            { Item: { Has: { value: 'No' } } },
          ],
        },
      },
    }

    expect(validateModel(testData, foreignDirectInterest)).toEqual(true)
  })
})
