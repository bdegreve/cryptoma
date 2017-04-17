import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'

import Button from 'react-bootstrap/lib/Button'

import TextBox from 'components/text-box'

import reverse from 'lib/reverse'
import withoutWhitespace from 'lib/without-whitespace'
import { randomFloats } from 'lib/random'

const messages = defineMessages({
  key: {
    id: 'pancake:key',
    defaultMessage: 'Key numbers'
  },
  keyPlaceholder: {
    id: 'pancake:keyPlaceholder',
    defaultMessage: 'Enter numbers here, seperated with commas'
  },
  generate: {
    id: 'pancake:generate',
    defaultMessage: 'Generate random key numbers'
  }
})

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
        label={messages.key}
        placeholder={messages.keyPlaceholder}
        value={value || ''}
        onChange={(v) => { onChange(v.replace(/[^0-9]+/g, ',')) }}
        controlId='pancake-key'
      />
      <Button bsStyle='primary' onClick={() => {
        const numbers = randomKeyNumbers(plaintext)
        onChange(numbers.join(','))
      }}
      >
        <FormattedMessage {...messages.generate} />
      </Button>
    </div>
}

function randomKeyNumbers (plaintext) {
  const n = withoutWhitespace(plaintext).length

  // generate n integers in range [2, n]
  let numbers = []
  const rng = randomFloats()
  while (numbers.length < n) {
    const x = rng.next().value
    const k = 2 + Math.floor(Math.pow(x, 2) * (n - 1))
    if (numbers.length > 0 && numbers[numbers.length - 1] === k) {
      continue // avoid duplicates
    }
    numbers.push(k)
  }

  // insert at least one <n> somewhere in the middle
  while (true) {
    const i = Math.floor((rng.next().value + 0.5) * (n / 2))
    if (numbers[i] === n || numbers[i + 1] === n) {
      continue // avoid duplicates
    }
    numbers.splice(i, 0, n)
    break
  }

  return numbers
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
