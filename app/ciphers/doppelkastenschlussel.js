import React from 'react'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import FormGroup from 'react-bootstrap/lib/FormGroup'

import TextBox from 'components/text-box'
import AlphabetSelect from 'components/alphabet-select'
import NumberSelect from 'components/number-select'

import { LATIN_I, alphabet as getAlphabet } from 'lib/alphabets'
import groups from 'lib/groups'

import styles from './doppelkastenschlussel.less'

export default {
  name: 'Doppelkastenschlüssel',

  key: {
    alphabet: LATIN_I.name,
    key1: 'HAMBURG',
    key2: 'NEWYORK',
    blockSize: 21,
    double: true,
    spiral: false
  },

  encrypt: (plaintext, {alphabet, key1, key2, blockSize, double, spiral}) => {
    alphabet = getAlphabet(alphabet)
    plaintext = alphabet.filter(plaintext)
    key1 = keyBox(key1, {alphabet})
    key2 = keyBox(key2, {alphabet, spiral})

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

    let ciphertext = []
    pairedGroups(plaintext, blockSize).forEach(([plain1, plain2]) => {
      for (let k = 0; k < plain1.length; ++k) {
        const p1 = plain1[k]
        const p2 = plain2[k]
        let [c1, c2] = enc(p1, p2)
        if (double) {
          [c1, c2] = enc(c1, c2)
        }
        ciphertext.push(c1, c2)
      }
    })

    return groups(ciphertext, 5).join(' ')
  },

  decrypt: (ciphertext, {key1, key2, alphabet, blockSize, double, spiral}) => {
    alphabet = getAlphabet(alphabet)
    key1 = keyBox(key1, alphabet)
    key2 = keyBox(key2, alphabet)
    if (spiral) {
      key2 = spiralBox(key2)
    }

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

    let plaintext = []
    let plain1 = []
    let plain2 = []
    groups(ciphertext, 2).forEach(pair => {
      const c1 = pair[0]
      const c2 = pair[1]
      let [p1, p2] = dec(c1, c2)
      if (double) {
        [p1, p2] = dec(p1, p2)
      }
      plain1.push(p1)
      plain2.push(p2)
      if (plain1.length === blockSize) {
        plaintext.push(plain1.join(''), plain2.join(''))
        plain1 = []
        plain2 = []
      }
    })
    plaintext.push(plain1.join(''), plain2.join(''))

    return groups(plaintext.join(''), 80).join('\n')
  },

  Settings: ({value, onChange, plaintext}) =>
    <div>
      <AlphabetSelect size={25}
        value={value.alphabet}
        onChange={alphabet => onChange({alphabet})}
        controlId='doppel-alphabet'
      />
      <TextBox
        label='Key 1'
        placeholder='First keyword'
        value={value.key1}
        onChange={key1 => onChange({
          key1: getAlphabet(value.alphabet).filter(key1)
        })}
        controlId='doppel-key1'
      />
      <TextBox
        label='Key 2'
        placeholder='Second keyword'
        value={value.key2}
        onChange={key2 => onChange({
          key2: getAlphabet(value.alphabet).filter(key2)
        })}
        controlId='doppel-key2'
      />
      <NumberSelect
        max={80}
        label='Block size'
        value={value.blockSize}
        onChange={blockSize => onChange({blockSize})}
        controlId='doppel-blocksize'
      />
      <Checkbox
        checked={value.double}
        onChange={e => onChange({
          double: e.target.checked
        })}
      >
        Double: encrypt each pair twice! (historical correct)
      </Checkbox>
      <Checkbox
        checked={value.spiral}
        onChange={e => onChange({
          spiral: e.target.checked
        })}
      >
        Spiral: use a spiral box for second key
      </Checkbox>
      <FormGroup className={styles.keyboxContainer}>
        <KeyBox box={keyBox(value.key1, {alphabet: value.alphabet})} />
        <KeyBox box={keyBox(value.key2, {alphabet: value.alphabet, spiral: value.spiral})} />
      </FormGroup>
    </div>
}

const keyBox = (key, {alphabet, spiral}) => {
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

const KeyBox = ({box}) =>
  <table className={styles.keybox}>
    <tbody>
      {[0, 5, 10, 15, 20].map(i =>
        <tr key={i}>
          {[0, 1, 2, 3, 4].map(j => <td key={`${i}-${j}`}>{box[i + j]}</td>)}
        </tr>
      )}
    </tbody>
  </table>

const spiralBox = (array) => {
  console.assert(array.length === _SPIRAL.length)
  return _SPIRAL.map(i => array[i])
}

const _SPIRAL = [
  0, 15, 14, 13, 12,
  1, 16, 23, 22, 11,
  2, 17, 24, 21, 10,
  3, 18, 19, 20, 9,
  4, 5, 6, 7, 8
]

const pairedGroups = (text, size = 5) => {
  const res = []
  while (text.length > 2 * size) {
    res.push([text.substr(0, size), text.substr(size, size)])
    text = text.substr(2 * size)
  }
  if (text.length % 2 === 1) {
    text = `${text}X`
  }
  size = text.length / 2
  res.push([text.substr(0, size), text.substr(size, size)])
  return res
}

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
