/* @flow */

const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const AZ09 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

type Alphabet = {
  name: string,
  description: string,
  letters: string,
  mapping: { [string]: string },
  square: boolean,
  filter: string => string
}

type CreateAlphabetOptions = {
  name: string,
  description: string,
  baseletters: string,
  substitutes?: { [string]: string }
}

function createAlphabet ({
  name,
  description,
  baseletters,
  substitutes = {}
}: CreateAlphabetOptions): Alphabet {
  const letters = Object.keys(substitutes).reduce(
    (res, sub) => res.replace(sub, ''),
    baseletters
  )

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

function filter (text: string) {
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
  substitutes: { J: 'I' }
})

export const LATIN_V = createAlphabet({
  name: 'Latin V',
  description: '25 letters, U->V',
  baseletters: AZ,
  substitutes: { U: 'V' }
})

export const TABULA_RECTA = createAlphabet({
  name: 'Tabula Recta',
  description: '24 letters, J->I, V->U',
  baseletters: 'ABCDEFGHIKLMNOPQRSTUXYZW',
  substitutes: { J: 'I', V: 'U' }
})

export const YS_VRIJ = createAlphabet({
  name: 'Ys-vrij',
  description: '25 letters, Y->IJ',
  baseletters: AZ,
  substitutes: { Y: 'IJ' }
})

export const ALPHABETS: Alphabet[] = [
  ALPHABET,
  ALPHANUM,
  LATIN_I,
  LATIN_V,
  TABULA_RECTA,
  YS_VRIJ
]

export const alphabet = (name: string) => {
  const res = ALPHABETS.find(x => x.name === name)
  if (!res) {
    throw new Error(`Unknown alphabet '${name}'`)
  }
  return res
}

type AlphabetsOptions = {
  size?: number,
  square?: boolean
}

export const alphabets = ({
  size = 0,
  square = false
}: AlphabetsOptions): Alphabet[] =>
  ALPHABETS.filter(alphabet => {
    if (size && alphabet.letters.length !== size) {
      return false
    }
    if (square && !alphabet.square) {
      return false
    }
    return true
  })
