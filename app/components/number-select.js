import React from 'react'

import DropDown from 'components/drop-down'

export default ({min = 1, max, onChange, ...rest}) =>
  <DropDown
    options={numbers(min, max)}
    onChange={value => onChange(parseInt(value))}
    {...rest}
  />

const numbers = (min, max) => {
  console.assert(typeof min !== 'undefined')
  console.assert(typeof max !== 'undefined')
  const result = []
  for (let k = min; k <= max; ++k) {
    result.push(k)
  }
  return result
}
