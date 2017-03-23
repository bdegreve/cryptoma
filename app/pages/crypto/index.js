import React from 'react'

import Grid from 'react-bootstrap/lib/Grid'

import TextBox from 'components/text-box'

import CIPHERS from 'ciphers'

import style from './style.less'

const [ENCRYPT, DECRYPT] = ['encrypt', 'decrypt']

export default React.createClass({
  getInitialState () {
    const key = {}
    Object.keys(CIPHERS).forEach(cipher => {
      key[cipher] = CIPHERS[cipher].key || null
    })
    return {
      text: 'The quick brown fox jumps over the lazy dog',
      key,
      mode: ENCRYPT
    }
  },

  _onEncrypt (text) {
    this.setState({
      text,
      mode: ENCRYPT
    })
  },

  _onDecrypt (text) {
    const { cipher } = this.props.match.params
    if (!CIPHERS[cipher].decrypt) {
      return
    }
    this.setState({
      text,
      mode: DECRYPT
    })
  },

  _onKey (value) {
    this.setState(({key}, {match}) => {
      const { cipher } = match.params
      if (!cipher) {
        return
      }
      return {
        ...key,
        [cipher]: value
      }
    })
  },

  _encrypt (text) {
    const { cipher } = this.props.match.params
    const { key } = this.state
    return CIPHERS[cipher]
      ? CIPHERS[cipher].encrypt(text, key[cipher])
      : ''
  },

  _decrypt (text) {
    const { cipher } = this.props.match.params
    const { key } = this.state
    return CIPHERS[cipher]
      ? CIPHERS[cipher].decrypt(text, key[cipher])
      : ''
  },

  render () {
    const { cipher } = this.props.match.params
    if (!CIPHERS[cipher]) {
      return <p>{cipher} not found</p>
    }

    const {text, mode, key} = this.state
    const { name, Settings } = CIPHERS[cipher]
    const plaintext = mode === ENCRYPT ? text : this._decrypt(text)
    const ciphertext = mode === DECRYPT ? text : this._encrypt(text)

    return (
      <Grid componentClass='main'>
        <header>
          <h1>{name || cipher}</h1>
          <p>Type in your plaintext or ciphertext ...</p>
        </header>
        <form>
          <TextBox
            className={style.cipher}
            label='Plaintext'
            placeholder='Enter plaintext here'
            value={plaintext}
            onChange={this._onEncrypt}
            controlId='crypto-plaintext'
          />
          { Settings
            ? <Settings value={key[cipher]} onChange={this._onKey} plaintext={plaintext} />
            : null
          }
          <TextBox
            className={style.cipher}
            label='Ciphertext'
            placeholder='Enter ciphertext here'
            value={ciphertext}
            onChange={this._onDecrypt}
            controlId='crypto-ciphertext'
          />
        </form>
      </Grid>
    )
  }
})
