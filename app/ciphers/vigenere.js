import React from 'react'
import TextBox from 'components/text-box'

import Checkbox from 'react-bootstrap/lib/Checkbox'

import textFilter from 'lib/text-filter'
import { ALPHABET } from 'lib/alphabets'

export default {
  name: 'Vigenère',

  key: {
    key: 'VIGENERE',
    runningKey: false,
    alphabet: ALPHABET
  },

  encrypt: (plaintext, {key, runningKey, alphabet}) => {
    plaintext = textFilter(plaintext, alphabet)
    key = textFilter(key, alphabet)
    if (runningKey) {
      key = key + plaintext
    }

    const values = {}
    Array.from(alphabet).forEach((a, i) => {
      values[a] = i
    })

    const ciphertext = Array.from(plaintext).map((plain, index) => {
      const p = values[plain]
      const k = values[key[index % key.length]]
      const c = (p + k) % alphabet.length
      return alphabet[c]
    })

    return groups(ciphertext.join(''), 5).join(' ')
  },

  decrypt: (ciphertext, {key, runningKey, alphabet}) => {
    ciphertext = textFilter(ciphertext, alphabet)
    key = textFilter(key, alphabet)

    const values = {}
    Array.from(alphabet).forEach((a, i) => {
      values[a] = i
    })

    const plaintext = Array.from(ciphertext).map((ciph, index) => {
      const c = values[ciph]
      const k = values[key[index % key.length]]
      const p = (c - k + alphabet.length) % alphabet.length
      if (runningKey) {
        key += alphabet[p]
      }
      return alphabet[p]
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
