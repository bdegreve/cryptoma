/* eslint-env jest */

const { encrypt, decrypt } = require('ciphers/vigenere').default
const { ALPHABET, TABULA_RECTA } = require('lib/alphabets')

describe('Vigenère & Autokey', () => {
  test('Vigenère', () => {
    const settings = {
      key: 'SLEUTEL',
      autoKey: false,
      alphabet: ALPHABET.name
    }
    expect(encrypt('Dit is een boodschap', settings)).toBe(
      'VTXCL IPFMS IWWNZ LT'
    )
    expect(decrypt('VTXCLIPFMSIWWNZLT', settings)).toBe('DITIS EENBO ODSCH AP')
  })

  test('Autokey', () => {
    const settings = {
      key: 'SLEUTEL',
      autoKey: true,
      alphabet: ALPHABET.name
    }
    expect(encrypt('Dit is een boodschap', settings)).toBe(
      'VTXCL IPQJH WVWGU BD'
    )
    expect(decrypt('VTXCLIPQJHWVWGUBD', settings)).toBe('DITIS EENBO ODSCH AP')
  })

  test('Tabula Recta', () => {
    const settings = {
      key: 'MAFDONK',
      autoKey: true,
      alphabet: TABULA_RECTA.name
    }
    expect(
      encrypt(
        'Op de asfaltweg ga je naar rechts en onmiddellyk op de Y-sprong naar links.',
        settings
      )
    ).toBe(
      'APIHO FPOAY DEWMA TZMEG ZRNGU TSXES PTCXH RWZIS RSHPH PWFDQ LKSPI WXTYS'
    )
    expect(
      decrypt(
        'APIHOFPOAYDEWMATZMEGZRNGUTSXESPTCXHRWZISRSHPHPWFDQLKSPIWXTYS',
        settings
      )
    ).toBe(
      'OPDEA SFALT WEGGA IENAA RRECH TSENO NMIDD ELLYK OPDEY SPRON GNAAR LINKS'
    )
  })
})
