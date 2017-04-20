/* eslint-env jest */

const { encrypt, decrypt } = require('ciphers/doppelkastenschlussel').default
const { LATIN_I, YS_VRIJ } = require('lib/alphabets')

describe('Doppelkastenschlüssel', () => {
  test('MY HOVERCRAFT IS FULL OF EELS', () => {
    const settings = {
      alphabet: LATIN_I.name,
      key1: 'HAMBURG',
      key2: 'NEWYORK',
      blockSize: 7,
      deinterlace: false,
      double: true,
      spiral: true
    }
    expect(encrypt('MY HOVERCRAFT IS FULL OF EELS', settings)).toBe(
      'MPSRH RMXNW AKBWM YWEBI CWSP'
    )
    expect(decrypt('MPSRH RMXNW AKBWM YWEBI CWSP', settings)).toBe(
      'MYHOVER\nCRAFTIS\nFULLOFE\nELS'
    )
  })

  test('Iq weiss niqt was soll es bedeuten dass iq so traurig bin', () => {
    const settings = {
      alphabet: LATIN_I.name,
      key1: 'KXNZYEMOBPLQFVIRAWGUHSCDT',
      key2: 'GSAORVFHZWBNYCQUIEMXKLDPT',
      blockSize: 21,
      deinterlace: true,
      double: true,
      spiral: false
    }
    expect(
      encrypt(
        'Iq weiss niqt was soll es bedeuten dass iq so traurig bin',
        settings
      )
    ).toBe('GGYQQ DCMAR NERQW MBGQT BUZYZ SZIQI WIYQR UFSTZ UNXBP O')
    expect(
      decrypt(
        'GGYQQ DCMAR NERQW MBGQT BUZYZ SZIQI WIYQR UFSTZ UNXBP O',
        settings
      )
    ).toBe('IQWEISSNIQTWASSOLLESB\nEDEUTENDASSIQSOTRAURI\nGBIN')
  })

  test('dit is een iets langere geheime boodschap', () => {
    const settings = {
      alphabet: YS_VRIJ.name,
      key1: 'KSA',
      key2: 'KLEUR',
      blockSize: 7,
      deinterlace: false,
      double: false,
      spiral: false
    }
    expect(encrypt('dit is een iets langere geheime boodschap', settings)).toBe(
      'AOHNP CGURP BSFDG MCBCJ SMCSA FBPOI FHEPU Z'
    )
    expect(
      decrypt('AO HN PC GU RP BS FD GM CB CJ SM CS AF BP OI FH EP UZ', settings)
    ).toBe('DITISEE\nNIETSLA\nNGEREGE\nHEIMEBO\nODSCHAP\nX')
  })

  test('dit is een iets langere geheime boodschap', () => {
    const settings = {
      alphabet: YS_VRIJ.name,
      key1: 'ROBIN',
      key2: 'JOKER',
      blockSize: 7,
      deinterlace: false,
      double: false,
      spiral: false
    }
    expect(
      encrypt(
        'Voorbij huisnummer zeventien ga je rechtdoor het wandelpad in via het hekje.',
        settings
      )
    ).toBe(
      'VHJVK HEMJQ JXLHT TFSKG XNASU HFDLD BIJNF IBHLO SSUDC FKLAQ BXHKN CLOCI NNLO'
    )
    expect(
      decrypt(
        'VHJVKHEMJQJXLHTTFSKGXNASUHFDLDBIJNFIBHLOSSUDCFKLAQBXHKNCLOCINNLO',
        settings
      )
    ).toBe(
      'VOORBIJ\nHUISNUM\nMERZEVE\nNTIENGA\nJERECHT\nDOORHET\nWANDELP\nADINVIA\nHETHEKJ\nE'
    )
  })
})
