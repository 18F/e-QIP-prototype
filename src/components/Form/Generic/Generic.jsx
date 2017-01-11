import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Generic extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      type: props.type,
      disabled: props.disabled,
      minlength: props.minlength || 0,
      maxlength: props.maxlength || 256,
      pattern: props.pattern,
      readonly: props.readonly,
      required: props.required,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      errorCode: null,
      valid: props.valid || false
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Execute validation checks on the value.
   *
   * Possible return values:
   *  1. null: In a neutral state
   *  2. false: Does not meet criterion and is deemed invalid
   *  3. true: Meets all specified criterion
   */
  handleValidation (event, status) {
    let errorCode = null
    let name = this.props.name || ''

    event.persist()
    if (!event || !event.target) {
      super.handleValidation(event, status)
      return
    }

    let hits = 0
    status = true

    if (this.state.value) {
      if (this.state.value && this.state.value.length > 0) {
        status = status && (this.state.value.length >= parseInt(this.state.minlength) && this.state.value.length <= parseInt(this.state.maxlength))
        if (!status) {
          errorCode = 'length'
        }
        hits++
      }

      if (this.state.pattern && this.state.pattern.length > 0) {
        try {
          let re = new RegExp(this.state.pattern)
          status = status && re.test(this.state.value)
          if (!status) {
            errorCode = 'pattern'
          }
          hits++
        } catch (e) {
          // Not a valid regular expression
        }
      }
    }

    // If nothing was tested then go back to neutral
    if (hits === 0) {
      status = null
    }

    // Set the internal state
    this.setState({error: status === false, valid: status === true, errorCode: errorCode}, () => {
      let prop = this.state.name || 'input'
      let e = { [prop]: errorCode }
      super.handleValidation(event, status, super.flattenObject(e))
    })
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
    event.persist()
    super.handleKeyDown(event)
  }

  /**
   * Generated name for the error message.
   */
  errorName () {
    return '' + this.state.name + '-error'
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = (this.props.className || '')

    if (this.state.error) {
      klass += ' usa-input-error'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-label'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the span element.
   */
  spanClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-message'
    } else {
      klass += ' hidden'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass () {
    let klass = ''

    if (this.state.focus) {
      klass += ' usa-input-focus'
    }

    if (this.state.valid) {
      klass += ' usa-input-success'
    }

    return klass.trim()
  }

  /**
   * Return a boolean value used for attributes which stutter.
   */
  redundant (flag, attribute) {
    return flag || false
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.state.name}
               ref="label"
               >
          {this.state.label}
        </label>
        <span className={this.spanClass()}
              id={this.errorName()}
              role="alert"
              ref="error"
              >
          {this.state.help}
        </span>
        <input className={this.inputClass()}
               id={this.state.name}
               name={this.state.name}
               type={this.state.type}
               placeholder={this.state.placeholder}
               aria-describedby={this.errorName()}
               disabled={this.redundant(this.state.disabled, 'disabled')}
               maxLength={this.state.maxlength}
               pattern={this.state.pattern}
               readOnly={this.redundant(this.state.readonly, 'readonly')}
               required={this.redundant(this.state.required, 'required')}
               value={this.state.value}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               onKeyDown={this.handleKeyDown}
               ref="input"
               />
      </div>
    )
  }
}
