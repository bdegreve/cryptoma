/* @flow */

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

type Settings = {
  flips: string
}

type SettingsProps = {
  value: Settings,
  onChange: Function,
  plaintext: string
}

export default {
  name: 'Pancake',

  key: {
    flips: ''
  },

  decrypt: (ciphertext: string, {flips}: Settings) => sort(ciphertext, asNumbers(flips)),

  encrypt: (plaintext: string, {flips}: Settings) => sort(plaintext, [...asNumbers(flips)].reverse()),

  Settings: ({value, onChange, plaintext}: SettingsProps) =>
    <div>
      <TextBox
        label={messages.key}
        placeholder={messages.keyPlaceholder}
        value={value.flips}
        onChange={v => onChange({
          flips: v.replace(/[^0-9]+/g, ' ')
        })}
        controlId='pancake-key'
      />
      <Button
        bsStyle='primary'
        onClick={() => onChange({
          flips: randomKeyNumbers(plaintext).join(' ')
        })}
      >
        <FormattedMessage {...messages.generate} />
      </Button>
    </div>
}

function randomKeyNumbers (plaintext: string) {
  const n = withoutWhitespace(plaintext).length

  // generate n integers in range [2, n]
  let numbers = []
  const rng = randomFloats()
  while (numbers.length < n) {
    const x = rng.next().value
    if (x === undefined) {
      break
    }
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

const sort = (text: string, numbers: Array<number>) =>
  numbers.reduce(
    (s, n) => {
      const head = s.substr(0, n)
      const tail = s.substr(n)
      return `${reverse(head)}${tail}`
    },
    withoutWhitespace(text).toLocaleUpperCase()
  )

const asNumbers = (text?: string) => {
  const xs = text && text.match(/\d+/g)
  return xs ? xs.map(x => parseInt(x)) : []
}
