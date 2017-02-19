import React from 'react'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

export default ({value, label, placeholder, onChange, controlId, className}) => (
  <FormGroup controlId={controlId}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass='textarea'
      value={value}
      placeholder={placeholder || label}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  </FormGroup>
)
