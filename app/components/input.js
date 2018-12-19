/* @flow */

import React from 'react'
import { injectIntl } from 'react-intl'

import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

type Props = {
  value: any,
  onChange: any => void,
  type?: string,
  label?: string,
  placeholder?: string,
  controlId?: string,
  intl: any
}

export default injectIntl(
  ({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    controlId,
    intl,
    ...rest
  }: Props) => {
    return (
      <FormGroup controlId={controlId}>
        <ControlLabel>{_format(label, intl)}</ControlLabel>
        <FormControl
          value={value}
          placeholder={_format(placeholder || label, intl)}
          onChange={e => onChange(e.target.value)}
          {...rest}
        />
      </FormGroup>
    )
  }
)

const _format = (message, intl) =>
  typeof message === 'object' && message.id
    ? intl.formatMessage(message)
    : message
