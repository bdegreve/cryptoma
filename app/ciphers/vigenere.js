import React from 'react'
import TextBox from 'components/text-box'

import Checkbox from 'react-bootstrap/lib/Checkbox'

import textFilter from 'lib/text-filter'
import { TABULA_RECTA } from 'lib/alphabets'

const alphabet = TABULA_RECTA

export default {
  name: 'Vigenère',

  key: {
    key: 'VIGENERE',
    runningKey: false
  },

  encrypt: (plaintext, {key, runningKey}) => {
    plaintext = textFilter(plaintext, alphabet)
    key = textFilter(key, alphabet)
    if (runningKey) {
      key = key + plaintext
    }

    const { letters } = alphabet
    const values = {}
    Array.from(letters).forEach((a, i) => {
      values[a] = i
    })

    const ciphertext = Array.from(plaintext).map((plain, index) => {
      const p = values[plain]
      const k = values[key[index % key.length]]
      const c = (p + k) % letters.length
      return letters[c]
    })

    return groups(ciphertext.join(''), 5).join(' ')
  },

  decrypt: (ciphertext, {key, runningKey}) => {
    ciphertext = textFilter(ciphertext, alphabet)
    key = textFilter(key, alphabet)

    const { letters } = alphabet
    const values = {}
    Array.from(letters).forEach((a, i) => {
      values[a] = i
    })

    const plaintext = Array.from(ciphertext).map((ciph, index) => {
      const c = values[ciph]
      const k = values[key[index % key.length]]
      const p = (c - k + letters.length) % letters.length
      if (runningKey) {
        key += letters[p]
      }
      return letters[p]
    })

    return groups(plaintext.join(''), 5).join(' ')
  },

  Settings: ({value, onChange, plaintext}) =>
    <div>
      <TextBox
        label='Key'
        placeholder='Keyword'
        value={value.key}
        onChange={v => onChange(Object.assign(value, {
          key: textFilter(v, value.alphabet)
        }))}
        controlId='vigenere-key'
      />
      <Checkbox
        checked={value.runningKey}
        onChange={e => onChange(Object.assign(value, {
          runningKey: e.target.checked
        }))}
      >
        Autokey (extends key with plaintext)
      </Checkbox>
    </div>
}

const groups = (text, size = 5) => {
  const res = []
  text = textFilter(text)
  while (text.length > 0) {
    res.push(text.substr(0, size))
    text = text.substr(size)
  }
  return res
}
