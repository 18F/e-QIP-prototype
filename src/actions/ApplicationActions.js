import { env, navigationWalker } from 'config'
import { api } from 'services'
import schema, { unschema } from 'schema'
import validate from 'validators'

export function updateApplication(section, property, values) {
  return {
    type: `${section}.${property}`,
    section,
    property,
    values,
  }
}

export function getApplicationState(done) {
  return (dispatch) => {
    let locked = false
    let formData = {}
    api
      .status()
      .then((r) => {
        const statusData = (r || {}).data || {}
        dispatch(updateApplication('Settings', 'locked', statusData.Locked))
        dispatch(updateApplication('Settings', 'hash', statusData.Hash))

        if (statusData.Locked) {
          locked = true
          env.History().push('/locked')
        }
      })
      .then(() => {
        if (locked) {
          return
        }
        return api.form().then((r) => {
          formData = r.data
          const formType = window.formType ? window.formType : formData.Metadata.form_type

          dispatch(updateApplication('Settings', 'formType', formType))
          dispatch(updateApplication('Settings', 'formVersion', formData.Metadata.form_version))
          for (const section in formData) {
            for (const subsection in formData[section]) {
              dispatch(
                updateApplication(
                  section,
                  subsection,
                  unschema(formData[section][subsection])
                )
              )
            }
          }
        })
      })
      .then(() => {
        if (locked) {
          return
        }

        validateApplication(dispatch, formData)
        if (done) {
          done()
        }
      })
      .catch(() => {
        env.History().push('/error')
      })
  }
}

export function validateApplication(dispatch, application = {}) {
  navigationWalker((path, child) => {
    if (path.length && path[0].store && child.store && child.validator) {
      let sectionName = path[0].url
      let data
      // TODO HACK for moving Passports from Foreign to Citizenship
      if (path[0].url === 'citizenship' && child.store === 'Passport') {
        sectionName = 'foreign'
        data = application.Foreign
      } else {
        sectionName = path[0].url
        data = (application[path[0].store] || {})[child.store] || {}
      }

      let subsectionName = child.url
      if (path.length > 1) {
        for (let i = path.length - 1; i > 0; i -= 1) {
          subsectionName = `${path[i].url}/${subsectionName}`
        }
      }

      let valid = null
      try {
        if (data.type && data.props) {
          data = schema(data.type, unschema(data.props))
        }
        valid = validate(data)
      } catch (e) {
        valid = null
      }

      dispatch(
        reportCompletion(
          sectionName.toLowerCase(),
          subsectionName.toLowerCase(),
          valid
        )
      )
    }
  })
}

// Special action that provides a way to flush all errors for a section+subsection upon entry so it may be stored with the re-validated data.
export function clearErrors(property, subsection) {
  const section = 'Errors'
  return {
    type: `${section}.${property}`,
    section,
    property,
    subsection,
    clear: true,
  }
}

/**
 * This is a generic function to report any errors for a particular
 * section.
 */
export function reportErrors(section, subsection, codes) {
  // set the section and subsection, in case not otherwise set
  const mappedCodes = codes.map(err => ({
    ...err,
    section: err.section || section,
    subsection: err.subsection || subsection,
  }))
  return updateApplication('Errors', section, mappedCodes)
}

export function reportCompletion(section, subsection, status) {
  return updateApplication('Completed', section, [
    {
      code: `${section}/${subsection}`.trim(),
      section,
      subsection,
      valid: status,
    },
  ])
}

export function updateIdentificationApplicantName(values) {
  return updateApplication('Identification', 'ApplicantName', values)
}

export function updateIdentificationBirthPlace(values) {
  return updateApplication('Identification', 'ApplicantBirthPlace', values)
}

export function updateIdentificationBirthDate(values) {
  return updateApplication('Identification', 'ApplicantBirthDate', values)
}

export function updateIdentificationSSN(values) {
  return updateApplication('Identification', 'ApplicantSSN', values)
}
