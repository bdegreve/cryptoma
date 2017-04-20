/* @flow */

import React from 'react'
import TextBox from 'components/text-box'

import Button from 'react-bootstrap/lib/Button'
import Checkbox from 'react-bootstrap/lib/Checkbox'

import textFilter from 'lib/text-filter'
import { ALPHABET } from 'lib/alphabets'

const alphabet = ALPHABET

type Settings = {
  otp: Array<number>,
  modulo: boolean
}

type SettingsProps = {
  value: Settings,
  onChange: Function,
  plaintext: string
}

export default {
  name: 'One-Time Pad',

  key: {
    otp: [0],
    modulo: true
  },

  encrypt: (plaintext: string, { otp, modulo }: Settings) => {
    plaintext = textFilter(plaintext, alphabet)

    const { letters } = alphabet
    const values = {}
    Array.from(letters).forEach((a, i) => {
      values[a] = i
    })

    const ciphertext = Array.from(plaintext).map((plain, index) => {
      const p = values[plain]
      const k = otp[index % otp.length]
      const c = p + k
      return modulo ? c % 32 : c
    })

    return ciphertext.join(' ')
  },

  Settings: ({ value, onChange, plaintext }: SettingsProps) => (
    <div>
      <TextBox
        label='One time pad'
        placeholder='Random numbers, lots of them ...'
        value={value.otp.join(' ') + ' '}
        onChange={v =>
          onChange({
            ...value,
            otp: numbers(v)
          })}
        controlId='number-station-otp'
      />
      <Button
        bsStyle='primary'
        onClick={() => {
          const n = plaintext.length
          const m = alphabet.letters.length
          const otp = []
          for (let k = 0; k < n; ++k) {
            const x = Math.ceil(Math.random() * (m - 1)) + 1
            otp.push(x)
          }
          onChange({
            ...value,
            otp
          })
        }}
      >
        Generate OTP
      </Button>
      <Checkbox
        checked={value.modulo}
        onChange={e =>
          onChange({
            modulo: e.target.checked
          })}
      >
        Modulo
      </Checkbox>
    </div>
  )
}

const numbers = (text: string) => {
  const xs = text.match(/\d+/g)
  return xs ? xs.map(x => parseInt(x)) : [0]
}
