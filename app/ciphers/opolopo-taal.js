export default {
  name: 'opolopo-taal',

  encrypt: (plaintext) =>
    plaintext.replace(/([aoeiuy]+)/gi, (_, w) => `${w}p${w}l${w}p${w}`)
}

export const replacements = {
  a: 'apalapa',
  o: 'opolopo',
  e: 'epelepe',
  i: 'ipilipi',
  u: 'upulupu',
  aa: 'apalapaa',
  oo: 'opolopoo',
  ee: 'epelepee',
  uu: 'upulupuu',
  ei: 'eipeileipei',
  ij: 'ijpijlijpij',
  ou: 'oupouloupou',
  au: 'aupaulaupau',
  eu: 'eupeuleupeu',
  oe: 'oepoeloepoe'
}
