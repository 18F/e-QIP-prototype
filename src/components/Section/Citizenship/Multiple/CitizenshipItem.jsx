import React from 'react'

import { i18n } from 'config'

import {
  ValidationElement,
  Field,
  Branch,
  Show,
  Country,
  DateRange,
  Textarea,
} from 'components/Form'

import { extractDate } from 'components/Section/History/dateranges'

export default class CitizenshipItem extends ValidationElement {
  update = (queue) => {
    this.props.onUpdate({
      Country: this.props.Country,
      Dates: this.props.Dates,
      How: this.props.How,
      Renounced: this.props.Renounced,
      RenouncedExplanation: this.props.RenouncedExplanation,
      Current: this.props.Current,
      CurrentExplanation: this.props.CurrentExplanation,
      ...queue,
    })
  }

  updateCountry = (values) => {
    this.update({
      Country: values,
    })
  }

  updateDates = (values) => {
    this.update({
      Dates: values,
    })
  }

  updateHow = (values) => {
    this.update({
      How: values,
    })
  }

  updateRenounced = (values) => {
    this.update({
      Renounced: values,
    })
  }

  updateRenouncedExplanation = (values) => {
    this.update({
      RenouncedExplanation: values,
    })
  }

  updateCurrent = (values) => {
    this.update({
      Current: values,
    })
  }

  updateCurrentExplanation = (values) => {
    this.update({
      CurrentExplanation: values,
    })
  }

  render() {
    const { requireMultipleCitizenshipRenounced } = this.props

    const d = this.props.Dates || {}
    const to = extractDate(d.to)
    const from = extractDate(d.from)
    const showCurrentQuestion = to && from && !d.present

    const country = this.props.Country.value || []
    const showNonUSQuestions = !country.includes('United States')

    return (
      <div className="citizenship-item">
        <Field
          title={i18n.t('citizenship.multiple.heading.citizenship.country')}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Country
            name="Country"
            {...this.props.Country}
            className="citizenship-country"
            onUpdate={this.updateCountry}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Field
          title={i18n.t('citizenship.multiple.heading.citizenship.period')}
          help="citizenship.multiple.help.citizenship.dates"
          titleSize="h4"
          optional
          className="period no-margin-bottom"
        />

        <Field
          title={i18n.t('citizenship.multiple.heading.citizenship.dates')}
          titleSize="label"
          adjustFor="daterange"
          scrollIntoView={this.props.scrollIntoView}
        >
          <DateRange
            name="Dates"
            {...this.props.Dates}
            className="citizenship-dates"
            minDateEqualTo
            onUpdate={this.updateDates}
            onError={this.props.onError}
            required={this.props.required}
          />
        </Field>

        <Show when={showNonUSQuestions}>
          <Field
            title={i18n.t('citizenship.multiple.heading.citizenship.how')}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Textarea
              name="How"
              {...this.props.How}
              className="citizenship-how"
              onUpdate={this.updateHow}
              onError={this.props.onError}
              required={this.props.required}
            />
          </Field>

          <Show when={requireMultipleCitizenshipRenounced}>
            <Branch
              name="Renounced"
              label={i18n.t('citizenship.multiple.heading.citizenship.renounced')}
              labelSize="h4"
              className="citizenship-renounced no-margin-bottom"
              {...this.props.Renounced}
              onUpdate={this.updateRenounced}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Field
              title={i18n.t(
                'citizenship.multiple.heading.citizenship.renouncedexplanation'
              )}
              titleSize="label"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Textarea
                name="RenouncedExplanation"
                {...this.props.RenouncedExplanation}
                className="citizenship-renounced-explanation"
                onUpdate={this.updateRenouncedExplanation}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
          </Show>
        </Show>

        <Show when={showCurrentQuestion}>
          <div>
            <Branch
              name="Current"
              label={i18n.t('citizenship.multiple.heading.citizenship.current')}
              labelSize="h4"
              className="citizenship-current no-margin-bottom"
              {...this.props.Current}
              onUpdate={this.updateCurrent}
              onError={this.props.onError}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Field
              title={i18n.t(
                'citizenship.multiple.heading.citizenship.currentexplanation'
              )}
              titleSize="label"
              scrollIntoView={this.props.scrollIntoView}
            >
              <Textarea
                name="CurrentExplanation"
                {...this.props.CurrentExplanation}
                className="citizenship-current-explanation"
                onUpdate={this.updateCurrentExplanation}
                onError={this.props.onError}
                required={this.props.required}
              />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

CitizenshipItem.defaultProps = {
  requireMultipleCitizenshipRenounced: true,
  Country: {},
  Dates: {},
  How: {},
  Renounced: {},
  RenouncedExplanation: {},
  Current: {},
  CurrentExplanation: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
}
