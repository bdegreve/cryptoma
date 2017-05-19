/* @flow */

import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'

import Checkbox from 'react-bootstrap/lib/Checkbox'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'

import Input from 'components/input'
import AlphabetSelect from 'components/alphabet-select'
import NumberSelect from 'components/number-select'

import { LATIN_I, YS_VRIJ, alphabet as getAlphabet } from 'lib/alphabets'
import groups from 'lib/groups'
import { interlace, deinterlace } from 'lib/interlace'

import styles from './doppelkastenschlussel.less'

const messages = defineMessages({
  key1: {
    id: 'doppel:key1',
    defaultMessage: 'Key 1'
  },
  key1Placeholder: {
    id: 'doppel:key1Placeholder',
    defaultMessage: 'First key, avoid duplicate letters'
  },
  key2: {
    id: 'doppel:key2',
    defaultMessage: 'Key 2'
  },
  key2Placeholder: {
    id: 'doppel:key2Placeholder',
    defaultMessage: 'Second key, avoid duplicate letters'
  },
  blockSize: {
    id: 'doppel:blockSize',
    defaultMessage: 'Block size (21 for historical correctness)'
  },
  double: {
    id: 'doppel:double',
    defaultMessage: 'Encrypt each pair twice! (for historical correctness)'
  },
  deinterlace: {
    id: 'doppel:deinterlace',
    defaultMessage: 'Deinterlace cipher text (for historical correctness)'
  },
  spiral: {
    id: 'doppel:spiral',
    defaultMessage: 'Use spiral box for key 2'
  },
  presets: {
    id: 'doppel:presets',
    defaultMessage: 'Presets'
  },
  historical: {
    id: 'doppel:historical',
    defaultMessage: 'Historical'
  }
})

type Settings = {
  alphabet: string,
  key1: string,
  key2: string,
  blockSize: number,
  deinterlace: boolean,
  double: boolean,
  spiral: boolean
}

type SettingsProps = {
  value: Settings,
  onChange: Function,
  plaintext: string
}

export default {
  name: 'Doppelkastenschlüssel',

  key: {
    alphabet: LATIN_I.name,
    key1: 'HAMBURG',
    key2: 'NEWYORK',
    blockSize: 21,
    deinterlace: true,
    double: true,
    spiral: false
  },

  encrypt: (
    plaintext: string,
    { blockSize, spiral, ...settings }: Settings
  ) => {
    const alphabet = getAlphabet(settings.alphabet)
    const key1 = keyBox(settings.key1, { alphabet, spiral: false })
    const key2 = keyBox(settings.key2, { alphabet, spiral })

    const enc = (p1, p2) => {
      let [i1, j1] = coord(p1, key1)
      let [i2, j2] = coord(p2, key2)
      if (i1 === i2) {
        j1 = (j1 + 4) % 5
        j2 = (j2 + 4) % 5
      }
      const c1 = get(key2, i1, j2)
      const c2 = get(key1, i2, j1)
      return [c1, c2]
    }

    plaintext = alphabet.filter(plaintext)
    const interlaced = interlace(plaintext, { blockSize })
    console.assert(interlaced.length % 2 === 0)

    let ciphertext = []
    for (let k = 0; k < interlaced.length; k += 2) {
      const p1 = interlaced[k]
      const p2 = interlaced[k + 1]
      let [c1, c2] = enc(p1, p2)
      if (settings.double) {
        ;[c1, c2] = enc(c1, c2)
      }
      ciphertext.push(c1, c2)
    }

    if (settings.deinterlace) {
      ciphertext = deinterlace(ciphertext, { blockSize })
    }
    return groups(ciphertext, 5).join(' ')
  },

  decrypt: (
    ciphertext: string,
    { blockSize, spiral, ...settings }: Settings
  ) => {
    const alphabet = getAlphabet(settings.alphabet)
    const key1 = keyBox(settings.key1, { alphabet, spiral: false })
    const key2 = keyBox(settings.key2, { alphabet, spiral })

    const dec = (c1, c2) => {
      let [i1, j2] = coord(c1, key2)
      let [i2, j1] = coord(c2, key1)
      if (i1 === i2) {
        j1 = (j1 + 1) % 5
        j2 = (j2 + 1) % 5
      }
      const p1 = get(key1, i1, j1)
      const p2 = get(key2, i2, j2)
      return [p1, p2]
    }

    ciphertext = alphabet.filter(ciphertext)
    if (settings.deinterlace) {
      ciphertext = interlace(ciphertext, { blockSize }).join('')
    }

    let interlaced = []
    groups(ciphertext, 2).forEach(([c1, c2]) => {
      let [p1, p2] = dec(c1, c2)
      if (settings.double) {
        ;[p1, p2] = dec(p1, p2)
      }
      interlaced.push(p1, p2)
    })

    const plaintext = deinterlace(interlaced, { blockSize })
    return groups(plaintext, blockSize).join('\n')
  },

  Settings: ({ value, onChange, plaintext }: SettingsProps) => (
    <div>
      <FormGroup>
        <ControlLabel><FormattedMessage {...messages.presets} />:</ControlLabel>
        <ButtonGroup >
          <Button bsStyle='link' onClick={() => onChange(HISTORIC_SETTINGS)}>
            <FormattedMessage {...messages.historical} />
          </Button>
          <Button bsStyle='link' onClick={() => onChange(JOEPIE_SETTINGS)}>
            Joepie 27
          </Button>
          <Button bsStyle='link' onClick={() => onChange(NOVA_SETTINGS)}>
            Nova
          </Button>
        </ButtonGroup >
      </FormGroup>
      <AlphabetSelect
        size={25}
        value={value.alphabet}
        onChange={alphabet => onChange({ alphabet })}
        controlId='doppel-alphabet'
      />
      <Input
        label={messages.key1}
        placeholder={messages.key1Placeholder}
        value={value.key1}
        onChange={key1 =>
          onChange({
            key1: getAlphabet(value.alphabet).filter(key1)
          })}
        controlId='doppel-key1'
      />
      <Input
        label={messages.key2}
        placeholder={messages.key2Placeholder}
        value={value.key2}
        onChange={key2 =>
          onChange({
            key2: getAlphabet(value.alphabet).filter(key2)
          })}
        controlId='doppel-key2'
      />
      <NumberSelect
        max={80}
        label={<FormattedMessage {...messages.blockSize} />}
        value={value.blockSize}
        onChange={blockSize => onChange({ blockSize })}
        controlId='doppel-blocksize'
      />
      <Checkbox
        checked={value.double}
        onChange={e =>
          onChange({
            double: e.target.checked
          })}
      >
        <FormattedMessage {...messages.double} />
      </Checkbox>
      <Checkbox
        checked={value.deinterlace}
        onChange={e =>
          onChange({
            deinterlace: e.target.checked
          })}
      >
        <FormattedMessage {...messages.deinterlace} />
      </Checkbox>
      <Checkbox
        checked={value.spiral}
        onChange={e =>
          onChange({
            spiral: e.target.checked
          })}
      >
        <FormattedMessage {...messages.spiral} />
      </Checkbox>
      <FormGroup className={styles.keyboxContainer}>
        <KeyBox
          box={keyBox(value.key1, { alphabet: value.alphabet, spiral: false })}
        />
        <KeyBox
          box={keyBox(value.key2, {
            alphabet: value.alphabet,
            spiral: value.spiral
          })}
        />
      </FormGroup>
    </div>
  )
}

export const HISTORIC_SETTINGS: Settings = {
  alphabet: LATIN_I.name,
  key1: 'KXNZYEMOBPLQFVIRAWGUHSCDT',
  key2: 'GSAORVFHZWBNYCQUIEMXKLDPT',
  blockSize: 21,
  deinterlace: true,
  double: true,
  spiral: false
}

export const JOEPIE_SETTINGS: Settings = {
  alphabet: YS_VRIJ.name,
  key1: 'ROBIN',
  key2: 'JOKER',
  blockSize: 7,
  deinterlace: false,
  double: false,
  spiral: false
}

export const NOVA_SETTINGS: Settings = {
  alphabet: LATIN_I.name,
  key1: 'HAMBURG',
  key2: 'NEWYORK',
  blockSize: 7,
  deinterlace: false,
  double: true,
  spiral: true
}

const keyBox = (key, { alphabet, spiral }) => {
  if (typeof alphabet !== 'object') {
    alphabet = getAlphabet(alphabet)
  }
  const box = []
  const seen = {}
  key = `${alphabet.filter(key)}${alphabet.letters}`
  Array.from(key).forEach(c => {
    if (seen[c]) {
      return
    }
    seen[c] = true
    box.push(c)
  })
  console.assert(box.length === 25, box)
  return spiral ? spiralBox(box) : box
}

const KeyBox = ({ box }) => (
  <table className={styles.keybox}>
    <tbody>
      {[0, 5, 10, 15, 20].map(i => (
        <tr key={i}>
          {[0, 1, 2, 3, 4].map(j => <td key={`${i}-${j}`}>{box[i + j]}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
)

const spiralBox = array => {
  console.assert(array.length === _SPIRAL.length)
  return _SPIRAL.map(i => array[i])
}

const _SPIRAL = [
  0,
  15,
  14,
  13,
  12,
  1,
  16,
  23,
  22,
  11,
  2,
  17,
  24,
  21,
  10,
  3,
  18,
  19,
  20,
  9,
  4,
  5,
  6,
  7,
  8
]

const coord = (c, key) => {
  const k = key.findIndex(o => o === c)
  console.assert(k >= 0, `-- ${c}`)
  const i = Math.floor(k / 5)
  const j = k % 5
  return [i, j]
}

const get = (key, i, j) => {
  return key[i * 5 + j]
}
