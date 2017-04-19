/* @flow */

import React from 'react'

import DropDown from 'components/drop-down'

type Props = {
  value: number,
  onChange: (number) => void,
  max: number,
  min?: number
}

export default ({value, onChange, max, min = 1, ...rest}: Props) =>
  <DropDown
    value={value.toString()}
    onChange={value => onChange(parseInt(value))}
    options={range(min, max)}
    {...rest}
  />

const range = (min: number, max: number) => {
  const result = []
  for (let k = min; k <= max; ++k) {
    result.push(k.toString())
  }
  return result
}
