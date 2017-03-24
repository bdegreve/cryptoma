export const _CRYPTO_INPUT = 'CRYPTO_INPUT'
export const _CRYPTO_KEY = 'CRYPTO_SETTINGS'

export const ENCRYPT = 'encrypt'
export const DECRYPT = 'decrypt'

export const setEncrypt = plaintext => ({
  type: _CRYPTO_INPUT,
  mode: ENCRYPT,
  input: plaintext
})

export const setDecrypt = ciphertext => ({
  type: _CRYPTO_INPUT,
  mode: DECRYPT,
  input: ciphertext
})

export const setKey = (cipher, key) => ({
  type: _CRYPTO_KEY,
  cipher,
  key
})
