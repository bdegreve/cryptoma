import React from 'react'
import TextBox from 'components/text-box'

import Checkbox from 'react-bootstrap/lib/Checkbox'

export default {
  key: {
    key1: 'HAMBURG',
    key2: 'NEWYORK',
    blockSize: 7,
    double: true,
    spiral: true
  },

  encrypt: (plaintext, {key1, key2, blockSize, double, spiral}) => {
    key1 = keyBox(key1)
    key2 = keyBox(key2)
    if (spiral) {
      key2 = spiralBox(key2)
    }

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

    const ciphertext = []

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

    return groups(ciphertext.join(''), 5).join(' ')
  },

  decrypt: (ciphertext, {key1, key2, blockSize, double, spiral}) => {
    key1 = keyBox(key1)
    key2 = keyBox(key2)
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
      <TextBox
        label='Key 1'
        placeholder='First keyword'
        value={value.key1}
        onChange={v => onChange(Object.assign(value, {
          key1: textFilter(v)
        }))}
        controlId='doppel-key1'
      />
      <TextBox
        label='Key 2'
        placeholder='Second keyword'
        value={value.key2}
        onChange={v => onChange(Object.assign(value, {
          key2: textFilter(v)
        }))}
        controlId='doppel-key2'
      />
      <Checkbox
        checked={value.double}
        onChange={e => onChange(Object.assign(value, {
          double: e.target.checked
        }))}
      >
        Double
      </Checkbox>
      <Checkbox
        checked={value.spiral}
        onChange={e => onChange(Object.assign(value, {
          spiral: e.target.checked
        }))}
      >
        Spiral
      </Checkbox>
    </div>
}

const keyBox = key => {
  const box = []
  const seen = {}
  key = `${textFilter(key)}ABCDEFGHIKLMNOPQRSTUVWXYZ`
  Array.from(key).forEach(c => {
    if (seen[c]) {
      return
    }
    seen[c] = true
    box.push(c)
  })
  console.assert(box.length === 25, box)
  return box
}

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

const textFilter = s => s
  .toUpperCase()
  .replace(/[^A-Z]/g, '')
  .replace(/J/g, 'I')

const groups = (text, size = 5) => {
  const res = []
  text = textFilter(text)
  while (text.length > 0) {
    res.push(text.substr(0, size))
    text = text.substr(size)
  }
  return res
}

const pairedGroups = (text, size = 5) => {
  const res = []
  text = textFilter(text)
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
