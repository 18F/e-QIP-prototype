import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import OneTimeBenefit from './OneTimeBenefit'

describe('The OneTimeBenefit component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) =>
      mount(
        <Provider store={store}>
          <OneTimeBenefit {...expected} />
        </Provider>
      )
  })

  it('Renders without errors', () => {
    const component = createComponent()
    expect(component.find('.onetime-benefit').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      }
    }
    const component = createComponent(expected)
    expect(component.find('.onetime-benefit').length).toBe(1)
    component
      .find('.received input[name="month"]')
      .simulate('change', { target: { value: '1' } })
    component
      .find('input[name="Country"]')
      .simulate('change', { target: { value: 'Germany' } })
    component.find('input[name="Value"]').simulate('change')
    component.find('input[name="ValueEstimated"]').simulate('change')
    component.find('textarea[name="Reason"]').simulate('change')
    component.find('.obligated .yes input').simulate('change')

    expect(updates).toBe(6)
  })

  it('Performs an obligatedExplanation update', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates++
      },
      Obligated: { value: 'Yes' }
    }
    const component = createComponent(expected)
    expect(component.find('.onetime-benefit').length).toBe(1)
    component
      .find('.explanation textarea[name="Explanation"]')
      .simulate('change')
    expect(updates).toBe(1)
  })
})
