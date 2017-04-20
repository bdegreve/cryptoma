/* eslint-env jest */

const { encrypt, decrypt } = require('ciphers/pancake').default

describe('Pancake', () => {
  test('no flips', () => {
    const settings = {
      flips: ''
    }
    expect(encrypt('Dit is een boodschap', settings)).toBe('DITISEENBOODSCHAP')
    expect(decrypt('Dit is een boodschap', settings)).toBe('DITISEENBOODSCHAP')
  })

  test('very big flip', () => {
    const settings = {
      flips: '1000'
    }
    expect(encrypt('Dit is een boodschap', settings)).toBe('PAHCSDOOBNEESITID')
    expect(decrypt('PAHCSDOOBNEESITID', settings)).toBe('DITISEENBOODSCHAP')
  })

  test('normal flips', () => {
    const settings = {
      flips: '4 8 3 9 10 17 13 14 17 10 3 7 8 4 14 3 17 7 15 7 13 11 5 7'
    }
    expect(encrypt('Dit is een boodschap', settings)).toBe('DSICTIHDOSOEPAEBN')
    expect(decrypt('DSICTIHDOSOEPAEBN', settings)).toBe('DITISEENBOODSCHAP')
  })

  test('comma flips', () => {
    const settings = {
      flips: '4, 8, 3, 9, 10, 17, 13, 14, 17, 10, 3, 7, 8, 4, 14, 3, 17, 7, 15, 7, 13, 11, 5, 7'
    }
    expect(encrypt('Dit is een boodschap', settings)).toBe('DSICTIHDOSOEPAEBN')
    expect(decrypt('DSICTIHDOSOEPAEBN', settings)).toBe('DITISEENBOODSCHAP')
  })
})
