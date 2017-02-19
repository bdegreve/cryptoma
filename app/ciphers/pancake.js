import React from 'react'

import TextBox from 'components/text-box'

import reverse from 'lib/reverse'
import withoutWhitespace from 'lib/without-whitespace'
import shuffle from 'lib/shuffle'

export default {
  name: 'Pancake',

  decrypt: (ciphertext, key) => sort(ciphertext, asNumbers(key)),

  encrypt: (plaintext, key) => {
    const numbers = [...asNumbers(key)].reverse()
    return sort(plaintext, numbers)
  },

  Settings: ({value, onChange, plaintext}) =>
    <div>
      <TextBox
        label='Key numbers'
        placeholder='Enter numbers here, seperated with commas'
        value={value}
        onChange={(v) => { onChange(v.replace(/[^0-9]+/g, ',')) }}
        controlId='pancake-key'
      />
      <button type='button' onClick={() => {
        const n = withoutWhitespace(plaintext).length
        const numbers = [n]
        for (let k = 0; k < n; ++k) {
          const x = Math.ceil(Math.pow(Math.random(), 1.5) * (n - 1)) + 1
          numbers.push(x)
        }
        onChange(shuffle(numbers).join(','))
      }}
      >
        Random
      </button>
    </div>
}

const sort = (text, numbers) =>
  numbers.reduce(
    (s, n) => {
      const head = s.substr(0, n)
      const tail = s.substr(n)
      return `${reverse(head)}${tail}`
    },
    withoutWhitespace(text).toLocaleUpperCase()
  )

const asNumbers = (str) => str ? str.match(/\d+/g) : []
