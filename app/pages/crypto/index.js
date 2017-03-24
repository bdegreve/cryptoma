import React from 'react'
import { connect } from 'react-redux'

import Grid from 'react-bootstrap/lib/Grid'

import TextBox from 'components/text-box'
import {
  setEncrypt,
  setDecrypt,
  setKey,
  ENCRYPT,
  DECRYPT
} from 'actions/crypto'

import CIPHERS from 'ciphers'

import style from './style.less'

const Crypto = ({
  input,
  mode,
  cipherId,
  cipher,
  cipherKey,
  onEncrypt,
  onDecrypt,
  onKey
}) => {
  if (!cipher) {
    return <p>{cipherId} not found</p>
  }

  const { name, Settings } = cipher
  const plaintext = mode === DECRYPT ? cipher.decrypt(input, cipherKey) : input
  const ciphertext = mode === ENCRYPT ? cipher.encrypt(input, cipherKey) : input

  return (
    <Grid componentClass='main'>
      <header>
        <h1>{name || cipherId}</h1>
        <p>Type in your plaintext or ciphertext ...</p>
      </header>
      <form>
        <TextBox
          className={style.cipher}
          label='Plaintext'
          placeholder='Enter plaintext here'
          value={plaintext}
          onChange={onEncrypt}
          controlId='crypto-plaintext'
        />
        { Settings
          ? <Settings value={cipherKey} onChange={onKey} plaintext={plaintext} />
          : null
        }
        <TextBox
          className={style.cipher}
          label='Ciphertext'
          placeholder='Enter ciphertext here'
          value={ciphertext}
          onChange={value => {
            if (cipher.decrypt) {
              onDecrypt(value)
            }
          }}
          controlId='crypto-ciphertext'
        />
      </form>
    </Grid>
  )
}

const mapStateToProps = (state, props) => {
  const { mode, input, keys } = state.crypto
  const { cipher } = props.match.params
  return {
    mode,
    input,
    cipherId: cipher,
    cipher: CIPHERS[cipher],
    cipherKey: keys[cipher] || null
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onEncrypt: plaintext => dispatch(setEncrypt(plaintext)),
  onDecrypt: ciphertext => dispatch(setDecrypt(ciphertext)),
  onKey: key => dispatch(setKey(props.match.params.cipher, key))
})

export default connect(mapStateToProps, mapDispatchToProps)(Crypto)
