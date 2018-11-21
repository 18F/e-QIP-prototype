import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import DrugClearanceUses from './DrugClearanceUses'

describe('The DrugClearanceUses component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <DrugClearanceUses {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = mount(<DrugClearanceUses />)
    expect(component.find('.drug-clearance-uses').length).toBe(1)
  })

  it('Performs update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.drug-clearance-uses').length).toBe(1)
    component.find('.used-drugs .yes input').simulate('change')
    expect(updates).toBe(1)
  })

  it('Performs updates to accordion', () => {
    let updates = 0
    const expected = {
      List: {
        items: [
          {
            DrugClearanceUse: {
              InvolvementDates: {
                from: {
                  date: new Date('1/1/2010')
                },
                to: {
                  date: new Date('1/1/2012')
                }
              },
              Description: {
                value: 'Foo'
              },
              EstimatedUse: {
                value: 'Foo'
              }
            }
          }
        ]
      },
      onUpdate: () => {
        updates++
      },
      UsedDrugs: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.drug-clearance-uses').length).toBe(1)
    component
      .find('.description textarea')
      .first()
      .simulate('change')
    expect(updates).toBe(2)
  })
})
