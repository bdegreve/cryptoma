/* @flow */

import React from 'react'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

type Props = {
  value: string,
  onChange: string => void,
  options: Array<string>,
  label?: string,
  controlId?: string
}

export default ({ value, onChange, options, label, controlId }: Props) => (
  <FormGroup controlId={controlId}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass='select'
      placeholder='select'
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </FormControl>
  </FormGroup>
)
