/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { defineMessages, injectIntl } from 'react-intl'

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

const messages = defineMessages({
  instructions: {
    id: 'crypto:instructions',
    defaultMessage: 'Type in your plaintext or ciphertext ...'
  },
  plaintext: {
    id: 'crypto:plaintext',
    defaultMessage: 'Plaintext'
  },
  enterPlaintext: {
    id: 'crypto:enter-plaintext',
    defaultMessage: 'Enter plaintext here'
  },
  ciphertext: {
    id: 'crypto:ciphertext',
    defaultMessage: 'Ciphertext'
  },
  enterCiphertext: {
    id: 'crypto:enter-ciphertext',
    defaultMessage: 'Enter ciphertext here'
  }
})

const Crypto = injectIntl(({
  input,
  mode,
  cipherId,
  cipher,
  cipherKey,
  onEncrypt,
  onDecrypt,
  onKey,
  intl
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
        <p>{intl.formatMessage(messages.instructions)}</p>
      </header>
      <form>
        <TextBox
          className={style.cipher}
          label={intl.formatMessage(messages.plaintext)}
          placeholder={intl.formatMessage(messages.enterPlaintext)}
          value={plaintext}
          onChange={onEncrypt}
          controlId='crypto-plaintext'
        />
        <TextBox
          className={style.cipher}
          label={intl.formatMessage(messages.ciphertext)}
          placeholder={intl.formatMessage(messages.enterCiphertext)}
          value={ciphertext}
          onChange={value => {
            if (cipher.decrypt) {
              onDecrypt(value)
            }
          }}
          controlId='crypto-ciphertext'
          readOnly={!cipher.decrypt}
        />
        {Settings
          ? <div>
            <h2>Settings</h2>
            <Settings
              value={cipherKey}
              onChange={onKey}
              plaintext={plaintext}
              />
          </div>
          : null}
      </form>
    </Grid>
  )
})

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
