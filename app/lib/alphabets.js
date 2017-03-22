export const ALPHABET = {
  name: 'Alphabet',
  description: '26 letters',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  square: false,
  filter
}

export const ALPHANUM = {
  name: 'Alphanum',
  description: '26 letters + 10 digits',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  square: true,
  filter
}

export const LATIN_I = {
  name: 'Latin I',
  description: '25 letters, IJ->Y, J->I',
  alphabet: 'ABCDEFGHIKLMNOPQRSTUVWXYZ',
  substitutes: {'J': 'I'},
  square: true,
  filter
}

export const LATIN_V = {
  name: 'Latin V',
  description: '25 letters, U->V',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTVWXYZ',
  substitutes: {'U': 'V'},
  square: true,
  filter
}

export const YS_VRIJ = {
  name: 'Ys-vrij',
  description: '25 letters, Y->IJ',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXZ',
  substitutes: {'Y': 'IJ'},
  square: true,
  filter
}

function filter(text) {
  text = text.normalize('NFKD').toUpperCase()
  
}
