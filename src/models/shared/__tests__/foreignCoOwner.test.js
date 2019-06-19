import { validateModel } from 'models/validate'
import foreignCoOwner from '../foreignCoOwner'

describe('The foreignCoOwner model', () => {
  it('Name, Address, Countries, Relationship nature are required', () => {
    const testData = {}
    const expectedErrors = [
      'Name.required',
      'Address.required',
      'Countries.required',
      'RelationshipNature.required',
    ]

    expect(validateModel(testData, foreignCoOwner))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Name must be a valid name', () => {
    const testData = {
      Name: { first: 'my', last: 'name' },
    }
    const expectedErrors = ['Name.model']

    expect(validateModel(testData, foreignCoOwner))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Address must be a valid address', () => {
    const testData = {
      Address: { city: 'somewhere', state: 'NY' },
    }
    const expectedErrors = ['Address.location']

    expect(validateModel(testData, foreignCoOwner))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('Countries must have at least one value', () => {
    const testData = {
      Countries: { value: [] },
    }
    const expectedErrors = ['Countries.hasValue']

    expect(validateModel(testData, foreignCoOwner))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('RelationshipNature must have a value', () => {
    const testData = {
      RelationshipNature: { values: 'invalid' },
    }
    const expectedErrors = ['RelationshipNature.hasValue']

    expect(validateModel(testData, foreignCoOwner))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('passes a valid ForeignCoOwner', () => {
    const testData = {
      Name: { first: 'my', middle: 'full', last: 'name' },
      Address: {
        street: '123 Coowner St',
        city: 'London',
        country: 'United Kingdom',
      },
      Countries: { value: ['United States', 'Canada'] },
      RelationshipNature: { value: 'Some test thing' },
    }

    expect(validateModel(testData, foreignCoOwner)).toEqual(true)
  })
})