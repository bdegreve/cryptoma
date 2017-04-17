import React from 'react'
import { FormattedMessage } from 'react-intl'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

import { alphabets } from 'lib/alphabets'

export default ({size, square, value, onChange, controlId}) =>
  <FormGroup controlId={controlId}>
    <ControlLabel>
      <FormattedMessage id='alphabet:label' defaultMessage='Alphabet' />
    </ControlLabel>
    <FormControl
      componentClass='select'
      placeholder='Select alphabet'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {alphabets({size, square}).map(({name, letters, description}) =>
        <option value={name} key={name}>{`${name}: ${description} - ${letters}`}</option>
      )}
    </FormControl>
  </FormGroup>
