import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'

export default class HairColor extends ValidationElement {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value
    }
  }

  handleChange (event) {
    this.setState({value: event.target.value}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(this.state.value)
      }
    })
  }

  render () {
    return (
      <div>
        <h2>Hair Color</h2>
        <Dropdown name={this.props.name}
          label={this.props.label}
          help={this.props.help}
          disabled={this.props.disabled}
          onChange={this.handleChange}
          onValidation={this.props.onValidation}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          value={this.state.value}
        >
          <option value="">{this.props.placeholder}</option>
          <option value="Bald">Bald</option>
          <option value="Black">Black</option>
          <option value="Blonde or Strawberry">Blonde or Strawberry</option>
          <option value="Brown">Brown</option>
          <option value="Gray or Partially Gray">Gray or Partially Gray</option>
          <option value="Red or Auburn">Red or Auburn</option>
          <option value="Sandy">Sandy</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Orange">Orange</option>
          <option value="Pink">Pink</option>
          <option value="Purple">Purple</option>
          <option value="Unspecified or unknown">Unspecified or unknown</option>
          { this.props.children }
        </Dropdown>
      </div>
    )
  }
}
