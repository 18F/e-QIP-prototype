import { validateModel } from 'models/validate'
import debarred from '../debarred'

describe('The debarred model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Agency.required',
      'Date.required',
      'Explanation.required',
    ]

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Agency must have a value', () => {
    const testData = {
      Agency: 'test agency',
    }
    const expectedErrors = ['Agency.hasValue']

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Date must be a valid date', () => {
    const testData = {
      Date: 12345,
    }
    const expectedErrors = ['Date.date']

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Explanation must have a value', () => {
    const testData = {
      Explanation: 'test',
    }
    const expectedErrors = ['Explanation.hasValue']

    expect(validateModel(testData, debarred))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid debarred', () => {
    const testData = {
      Agency: { value: 'Test Agency' },
      Date: { month: 9, day: 10, year: 1990 },
      Explanation: { value: 'Something something' },
    }

    expect(validateModel(testData, debarred)).toEqual(true)
  })
})