/* @flow */

import React from 'react'
import { FormattedMessage } from 'react-intl'

import Checkbox from 'react-bootstrap/lib/Checkbox'

import AlphabetSelect from 'components/alphabet-select'
import Input from 'components/text-box'

import textFilter from 'lib/text-filter'
import { ALPHABET, alphabet as getAlphabet } from 'lib/alphabets'
import groups from 'lib/groups'

type Settings = {
  alphabet: string,
  key: string,
  autoKey: boolean
}

type SettingsProps = {
  value: Settings,
  onChange: Function,
  plaintext: string
}

export default {
  name: 'Vigenère & Autokey',

  key: {
    key: 'VIGENERE',
    autoKey: false,
    alphabet: ALPHABET.name
  },

  encrypt: (plaintext: string, { key, alphabet, autoKey }: Settings) => {
    const alpha = getAlphabet(alphabet)
    const values = {}
    Array.from(alpha.letters).forEach((a, i) => {
      values[a] = i
    })

    plaintext = alpha.filter(plaintext)
    key = alpha.filter(key)
    if (autoKey) {
      key = key + plaintext
    }

    const ciphertext = Array.from(plaintext).map((plain, index) => {
      const p = values[plain]
      const k = values[key[index % key.length]]
      const c = (p + k) % alpha.letters.length
      return alpha.letters[c]
    })

    return groups(ciphertext, 5).join(' ')
  },

  decrypt: (ciphertext: string, { key, alphabet, autoKey }: Settings) => {
    const alpha = getAlphabet(alphabet)
    const values = {}
    Array.from(alpha.letters).forEach((a, i) => {
      values[a] = i
    })

    ciphertext = alpha.filter(ciphertext)
    key = alpha.filter(key)

    const plaintext = Array.from(ciphertext).map((ciph, index) => {
      const c = values[ciph]
      const k = values[key[index % key.length]]
      const p = (c - k + alpha.letters.length) % alpha.letters.length
      if (autoKey) {
        key += alpha.letters[p]
      }
      return alpha.letters[p]
    })

    return groups(plaintext, 5).join(' ')
  },

  Settings: ({ value, onChange, plaintext }: SettingsProps) => (
    <div>
      <AlphabetSelect
        value={value.alphabet}
        onChange={alphabet => onChange({ alphabet })}
      />
      <Input
        label={<FormattedMessage id='vigenere:key' defaultMessage='Key' />}
        placeholder='Keyword'
        value={value.key}
        onChange={v =>
          onChange({
            key: textFilter(v, value.alphabet)
          })}
        controlId='vigenere-key'
      />
      <Checkbox
        checked={value.autoKey}
        onChange={e =>
          onChange({
            autoKey: e.target.checked
          })}
      >
        <FormattedMessage
          id='vigenere:autokey'
          defaultMessage='Autokey (extends key with plaintext)'
        />
      </Checkbox>
    </div>
  )
}
