const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const AZ09 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function createAlphabet ({name, description, baseletters, substitutes = {}}) {
  const letters = Object.keys(substitutes).reduce(
    (res, sub) => res.replace(sub, ''), baseletters)

  const mapping = { ...substitutes } // make a copy
  Array.from(letters).forEach(letter => {
    if (process.env.NODE_ENV !== 'production' && !!substitutes[letter]) {
      throw new Error(`letter ${letter} already in mapping (alphabet ${name})`)
    }
    mapping[letter] = letter
  })
  const square = Math.floor(Math.sqrt(letters.length)) ** 2 === letters.length

  return {
    name,
    description,
    letters,
    mapping,
    square,
    filter
  }
}

function filter (text) {
  text = text.normalize('NFKD').toUpperCase()
  return Array.from(text)
    .map(c => this.mapping[c])
    .filter(_ => _)
    .join('')
}

export const ALPHABET = createAlphabet({
  name: 'Alphabet',
  description: '26 letters',
  baseletters: AZ
})

export const ALPHANUM = createAlphabet({
  name: 'Alphanum',
  description: '26 letters + 10 digits',
  baseletters: AZ09
})

export const LATIN_I = createAlphabet({
  name: 'Latin I',
  description: '25 letters, J->I',
  baseletters: AZ,
  substitutes: {'J': 'I'}
})

export const LATIN_V = createAlphabet({
  name: 'Latin V',
  description: '25 letters, U->V',
  baseletters: AZ,
  substitutes: {'U': 'V'}
})

export const TABULA_RECTA = createAlphabet({
  name: 'Tabula Recta',
  description: '24 letters,, J->I U->V',
  baseletters: AZ,
  substitutes: {'J': 'I', 'U': 'V'}
})

export const YS_VRIJ = createAlphabet({
  name: 'Ys-vrij',
  description: '25 letters, Y->IJ',
  baseletters: AZ,
  substitutes: {'Y': 'IJ'}
})

export const ALPHABETS = [
  ALPHABET,
  ALPHANUM,
  LATIN_I,
  LATIN_V,
  TABULA_RECTA,
  YS_VRIJ
]

export const alphabet = (name) => ALPHABETS.find(x => x.name === name)

export const alphabets = ({size = null, square = false}) =>
  ALPHABETS.filter(alphabet => {
    if (size && alphabet.letters.length !== size) {
      return false
    }
    if (square && !alphabet.square) {
      return false
    }
    return true
  })
