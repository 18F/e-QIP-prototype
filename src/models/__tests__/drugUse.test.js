import { validateModel } from 'models/validate'
import drugUse from '../drugUse'

describe('The drugUse model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'FirstUse.required',
      'RecentUse.required',
      'NatureOfUse.required',
      'UseWhileEmployed.required',
      'UseWithClearance.required',
      'UseInFuture.required',
      'Explanation.required',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('FirstUse must be a valid month/year', () => {
    const testData = {
      FirstUse: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'FirstUse.date',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('RecentUse must be a valid month/year', () => {
    const testData = {
      RecentUse: { day: 5, month: 10 },
    }
    const expectedErrors = [
      'RecentUse.date',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('NatureOfUse must have a value', () => {
    const testData = {
      NatureOfUse: 'testing',
    }
    const expectedErrors = [
      'NatureOfUse.hasValue',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UseWhileEmployed must have a valid value', () => {
    const testData = {
      UseWhileEmployed: { value: 'nope' },
    }
    const expectedErrors = [
      'UseWhileEmployed.hasValue',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UseWithClearance must have a valid value', () => {
    const testData = {
      UseWithClearance: { value: 'nope' },
    }
    const expectedErrors = [
      'UseWithClearance.hasValue',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('UseInFuture must have a valid value', () => {
    const testData = {
      UseInFuture: { value: 'nope' },
    }
    const expectedErrors = [
      'UseInFuture.hasValue',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: 'testing',
    }
    const expectedErrors = [
      'Explanation.hasValue',
    ]

    expect(validateModel(testData, drugUse))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if UseWhileEmployed is not required', () => {
    it('UseWhileEmployed is not required', () => {
      const testData = {}
      const expectedErrors = [
        'UseWhileEmployed.required',
      ]

      expect(validateModel(testData, drugUse, { requireUseWhileEmployed: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugUse', () => {
      const testData = {
        FirstUse: { month: 2, year: 1999 },
        RecentUse: { month: 5, year: 2001 },
        NatureOfUse: { value: 'Testing' },
        UseWithClearance: { value: 'No' },
        UseInFuture: { value: 'Yes' },
        Explanation: { value: 'testing' },
      }

      expect(validateModel(testData, drugUse, { requireUseWhileEmployed: false }))
        .toEqual(true)
    })
  })

  describe('if UseWithClearance is not required', () => {
    it('UseWithClearance is not required', () => {
      const testData = {}
      const expectedErrors = [
        'UseWithClearance.required',
      ]

      expect(validateModel(testData, drugUse, { requireUseWithClearance: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugUse', () => {
      const testData = {
        FirstUse: { month: 2, year: 1999 },
        RecentUse: { month: 5, year: 2001 },
        NatureOfUse: { value: 'Testing' },
        UseWhileEmployed: { value: 'No' },
        UseInFuture: { value: 'Yes' },
        Explanation: { value: 'testing' },
      }

      expect(validateModel(testData, drugUse, { requireUseWithClearance: false }))
        .toEqual(true)
    })
  })

  describe('if UseInFuture is not required', () => {
    it('UseInFuture is not required', () => {
      const testData = {}
      const expectedErrors = [
        'UseInFuture.required',
      ]

      expect(validateModel(testData, drugUse, { requireUseInFuture: false }))
        .not.toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugUse', () => {
      const testData = {
        FirstUse: { month: 2, year: 1999 },
        RecentUse: { month: 5, year: 2001 },
        NatureOfUse: { value: 'Testing' },
        UseWithClearance: { value: 'No' },
        UseWhileEmployed: { value: 'Yes' },
        Explanation: { value: 'testing' },
      }

      expect(validateModel(testData, drugUse, { requireUseInFuture: false }))
        .toEqual(true)
    })
  })

  it('passes a valid drugUse', () => {
    const testData = {
      FirstUse: { month: 2, year: 1999 },
      RecentUse: { month: 5, year: 2001 },
      NatureOfUse: { value: 'Testing' },
      UseWhileEmployed: { value: 'No' },
      UseWithClearance: { value: 'No' },
      UseInFuture: { value: 'Yes' },
      Explanation: { value: 'testing' },
    }

    expect(validateModel(testData, drugUse)).toEqual(true)
  })
})