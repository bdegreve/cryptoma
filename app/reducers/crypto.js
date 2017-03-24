import { _CRYPTO_INPUT, _CRYPTO_KEY, ENCRYPT, DECRYPT } from 'actions/crypto'

import CIPHERS from 'ciphers'

const initialState = {
  input: 'The quick brown fox jumps over the lazy dog',
  mode: ENCRYPT,
  keys: Object.keys(CIPHERS).reduce((keys, cipher) => ({
    ...keys,
    [cipher]: CIPHERS[cipher].key
  }), {})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case _CRYPTO_INPUT:
      return {
        ...state,
        input: action.input,
        mode: action.mode
      }

    case _CRYPTO_KEY: {
      const { keys } = state
      const { cipher, key } = action
      return {
        ...state,
        keys: {
          ...keys,
          [cipher]: setKey(keys[cipher], key)
        }
      }
    }

    default:
      return state
  }
}

const setKey = (state, key) => {
  if (typeof state === 'object') {
    return {
      ...state,
      ...key
    }
  }
  return key
}
