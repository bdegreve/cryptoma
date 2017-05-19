/* eslint-env jest */

const { encrypt, decrypt } = require('ciphers/doppelkastenschlussel').default
const {
  HISTORIC_SETTINGS,
  JOEPIE_SETTINGS,
  NOVA_SETTINGS
} = require('ciphers/doppelkastenschlussel')
const { YS_VRIJ } = require('lib/alphabets')

describe('Doppelkastenschlüssel', () => {
  test('MY HOVERCRAFT IS FULL OF EELS', () => {
    expect(encrypt('MY HOVERCRAFT IS FULL OF EELS', NOVA_SETTINGS)).toBe(
      'MPSRH RMXNW AKBWM YWEBI CWSP'
    )
    expect(decrypt('MPSRH RMXNW AKBWM YWEBI CWSP', NOVA_SETTINGS)).toBe(
      'MYHOVER\nCRAFTIS\nFULLOFE\nELS'
    )
  })

  test('Iq weiss niqt was soll es bedeuten dass iq so traurig bin', () => {
    expect(
      encrypt(
        'Iq weiss niqt was soll es bedeuten dass iq so traurig bin',
        HISTORIC_SETTINGS
      )
    ).toBe('GGYQQ DCMAR NERQW MBGQT BUZYZ SZIQI WIYQR UFSTZ UNXBP O')
    expect(
      decrypt(
        'GGYQQ DCMAR NERQW MBGQT BUZYZ SZIQI WIYQR UFSTZ UNXBP O',
        HISTORIC_SETTINGS
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

  test('Voorbij huisnummer zeventien', () => {
    expect(
      encrypt(
        'Voorbij huisnummer zeventien ga je rechtdoor het wandelpad in via het hekje.',
        JOEPIE_SETTINGS
      )
    ).toBe(
      'VHJVK HEMJQ JXLHT TFSKG XNASU HFDLD BIJNF IBHLO SSUDC FKLAQ BXHKN CLOCI NNLO'
    )
    expect(
      decrypt(
        'VHJVKHEMJQJXLHTTFSKGXNASUHFDLDBIJNFIBHLOSSUDCFKLAQBXHKNCLOCINNLO',
        JOEPIE_SETTINGS
      )
    ).toBe(
      'VOORBIJ\nHUISNUM\nMERZEVE\nNTIENGA\nJERECHT\nDOORHET\nWANDELP\nADINVIA\nHETHEKJ\nE'
    )
  })
})
