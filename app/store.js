/* @flow */

import { compose, createStore } from 'redux'
import { autoRehydrate } from 'redux-persist'

import rootReducer from './reducers'

function getInitialState () {
  if (typeof document === 'undefined') {
    return undefined
  }
  const initialState = document.getElementById('initial-state')
  if (!initialState) {
    return undefined
  }
  return JSON.parse(initialState.innerHTML)
}

const initialState = getInitialState()

// http://extension.remotedev.io
const _compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, initialState, _compose(autoRehydrate()))
