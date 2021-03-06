import React from 'react'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { testSnapshot } from 'components/test-helpers'
import { IdentificationSections } from 'components/Section/Identification/Identification'
import Section from 'components/Section'

const applicationState = {
  Identification: {
    Contacts: {
      PhoneNumbers: { items: [] },
    },
  },
  Settings: {
    formType: 'SF86',
  },
}

// give a fake GUID so the field IDs don't differ between snapshots
// https://github.com/facebook/jest/issues/936#issuecomment-404246102
jest.mock('../../Form/ValidationElement/helpers', () => (
  Object.assign(require.requireActual('../../Form/ValidationElement/helpers'), {
    newGuid: jest.fn().mockReturnValue('MOCK-GUID'),
  })
))

describe('The identification section', () => {
  const mockStore = configureMockStore()

  it('can review all subsections', () => {
    const store = mockStore({
      application: applicationState,
    })

    const component = mount(
      <MemoryRouter initialEntries={['/form/identification/review']}>
        <Provider store={store}>
          <Section section="identification" subsection="review" />
        </Provider>
      </MemoryRouter>,
    )

    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('can go to each subsection', () => {
    const sections = ['name', 'birthdate', 'birthplace', 'ssn']
    const store = mockStore({
      application: applicationState,
    })

    sections.forEach((section) => {
      const component = mount(
        <MemoryRouter initialEntries={[`/form/identification/${section}`]}>
          <Provider store={store}>
            <Section section="identification" subsection={section} />
          </Provider>
        </MemoryRouter>,
      )

      expect(component.find('div').length).toBeGreaterThan(0)
    })
  })

  it('renders the IdentificationSections component', () => {
    testSnapshot(<IdentificationSections />)
  })
})
