import React from 'react'
import { FormattedMessage } from 'react-intl'

import Checkbox from 'react-bootstrap/lib/Checkbox'

import AlphabetSelect from 'components/alphabet-select'
import Input from 'components/text-box'

import textFilter from 'lib/text-filter'
import { ALPHABET, alphabet as getAlphabet } from 'lib/alphabets'
import groups from 'lib/groups'

export default {
  name: 'Vigenère & Autokey',

  key: {
    key: 'VIGENERE',
    autoKey: false,
    alphabet: ALPHABET.name
  },

  encrypt: (plaintext, {key, alphabet, autoKey}) => {
    alphabet = getAlphabet(alphabet)
    plaintext = alphabet.filter(plaintext)
    key = alphabet.filter(key)
    console.log('been here')
    if (autoKey) {
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

    return groups(ciphertext, 5).join(' ')
  },

  decrypt: (ciphertext, {key, alphabet, autoKey}) => {
    alphabet = getAlphabet(alphabet)
    ciphertext = alphabet.filter(ciphertext)
    key = alphabet.filter(key)

    const { letters } = alphabet
    const values = {}
    Array.from(letters).forEach((a, i) => {
      values[a] = i
    })

    const plaintext = Array.from(ciphertext).map((ciph, index) => {
      const c = values[ciph]
      const k = values[key[index % key.length]]
      const p = (c - k + letters.length) % letters.length
      if (autoKey) {
        key += letters[p]
      }
      return letters[p]
    })

    return groups(plaintext, 5).join(' ')
  },

  Settings: ({value, onChange, plaintext}) =>
    <div>
      <AlphabetSelect
        value={value.alphabet}
        onChange={alphabet => onChange({alphabet})}
      />
      <Input
        label={<FormattedMessage id='vigenere:key' defaultMessage='Key' />}
        placeholder='Keyword'
        value={value.key}
        onChange={v => onChange({
          key: textFilter(v, value.alphabet)
        })}
        controlId='vigenere-key'
      />
      <Checkbox
        checked={value.autoKey}
        onChange={e => onChange({
          autoKey: e.target.checked
        })}
      >
        <FormattedMessage
          id='vigenere:autokey'
          defaultMessage='Autokey (extends key with plaintext)'
        />
      </Checkbox>
    </div>
}
