/* @flow */

export type Mode = 'encrypt' | 'decrypt'

export type Key = {
  [string]: any
}

export type Action =
  { type: 'CRYPTO_INPUT', input: string, mode: Mode } |
  { type: 'CRYPTO_SETTINGS', cipher: string, key: Key }

export const ENCRYPT: Mode = 'encrypt'
export const DECRYPT: Mode = 'decrypt'

export const _CRYPTO_INPUT = 'CRYPTO_INPUT'
export const _CRYPTO_KEY = 'CRYPTO_SETTINGS'

export const setEncrypt = (plaintext: string) => ({
  type: _CRYPTO_INPUT,
  mode: ENCRYPT,
  input: plaintext
})

export const setDecrypt = (ciphertext: string) => ({
  type: _CRYPTO_INPUT,
  mode: DECRYPT,
  input: ciphertext
})

export const setKey = (cipher: string, key: Key) => ({
  type: _CRYPTO_KEY,
  cipher,
  key
})
