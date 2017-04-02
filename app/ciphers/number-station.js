import React from 'react'
import TextBox from 'components/text-box'

import Checkbox from 'react-bootstrap/lib/Checkbox'

import textFilter from 'lib/text-filter'
import { ALPHABET } from 'lib/alphabets'

const alphabet = ALPHABET

export default {
  name: 'Number station',

  key: {
    otp: [0]
  },

  encrypt: (plaintext, {otp, modulo}) => {
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

  Settings: ({value, onChange, plaintext}) =>
    <div>
      <TextBox
        label='One time pad'
        placeholder='Random numbers, lots of them ...'
        value={value.otp.join(' ') + ' '}
        onChange={v => onChange({
          ...value,
          otp: numbers(v)
        })}
        controlId='number-station-otp'
      />
      <button type='button' onClick={() => {
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
        Random
      </button>
      <Checkbox
        checked={value.modulo}
        onChange={e => onChange({
          ...value,
          modulo: e.target.checked
        })}
      >
        Modulo
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

const numbers = text => {
  const xs = text.match(/\d+/g)
  console.log(xs)
  return xs.map(x => parseInt(x))
}
