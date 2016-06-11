import React from 'react'

import Grid from 'react-bootstrap/lib/Grid'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

import esrever from 'esrever'

const [ENCRYPT, DECRYPT] = ['encrypt', 'decrypt']

function reverse (str) {
  const lines = str.split('\n')
  return lines.map(esrever.reverse).join('\n')
}

export default React.createClass({
  getInitialState () {
    return {
      text: 'The quick brown fox jumps over the lazy dog',
      mode: ENCRYPT
    }
  },

  _onChange (text, mode) {
    this.setState({
      text,
      mode
    })
  },
  _encrypt (text) {
    return reverse(text)
  },
  _decrypt (text) {
    return reverse(text)
  },

  render () {
    const {text, mode} = this.state

    return <View
      plaintext={mode === ENCRYPT ? text : this._decrypt(text)}
      ciphertext={mode === DECRYPT ? text : this._encrypt(text)}
      onPlaintext={(value) => { this._onChange(value, ENCRYPT) }}
      onCiphertext={(value) => { this._onChange(value, DECRYPT) }}
    />
  }
})

const View = ({plaintext, ciphertext, onPlaintext, onCiphertext}) => (
  <Grid componentClass='main'>
    <header>
      <h1>Crypto</h1>
      <p>Type in your plaintext or ciphertext ...</p>
    </header>
    <form>
      <TextBox
        label='Plaintext'
        placeholder='Enter plaintext here'
        value={plaintext}
        onChange={(e) => { onPlaintext(e.target.value) }}
        controlId='crypto-plaintext'
      />
      <CipherSettings />
      <TextBox
        label='Ciphertext'
        placeholder='Enter ciphertext here'
        value={ciphertext}
        onChange={(e) => { onCiphertext(e.target.value) }}
        controlId='crypto-ciphertext'
      />
    </form>
  </Grid>
)

const TextBox = ({value, label, placeholder, onChange, controlId}) => (
  <FormGroup controlId={controlId}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass='textarea'
      value={value}
      placeholder={placeholder || label}
      onChange={onChange}
    />
  </FormGroup>
)

const CipherSettings = () => null
