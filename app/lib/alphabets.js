export const ALPHABET = {
  name: 'Alphabet',
  description: '26 letters',
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  square: false,
  filter
}

export const ALPHANUM = {
  name: 'Alphanum',
  description: '26 letters + 10 digits',
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  square: true,
  filter
}

export const LATIN_I = {
  name: 'Latin I',
  description: '25 letters, J->I',
  letters: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
  substitutes: {'J': 'I'},
  square: true,
  filter
}

export const LATIN_V = {
  name: 'Latin V',
  description: '25 letters, U->V',
  letters: 'ABCDEFGHIJKLMNOPQRSTVWXYZ',
  substitutes: {'U': 'V'},
  square: true,
  filter
}

export const TABULA_RECTA = {
  name: 'Tabula Recta',
  description: '24 letters,, J->I U->V',
  letters: 'ABCDEFGHIKLMNOPQRSTUXYZW',
  substitutes: {'J': 'I', 'U': 'V'},
  square: true,
  filter
}

export const YS_VRIJ = {
  name: 'Ys-vrij',
  description: '25 letters, Y->IJ',
  letters: 'ABCDEFGHIJKLMNOPQRSTUVWXZ',
  substitutes: {'Y': 'IJ'},
  square: true,
  filter
}

export const ALPHABETS = [
  ALPHABET,
  ALPHANUM,
  LATIN_I,
  LATIN_V,
  YS_VRIJ
]

function filter (text) {
  text = text.normalize('NFKD').toUpperCase()
  return Array.from(text)
    .map(c => this.substitutes[c] || c)
    .filter()
}
