/* @flow */

import { createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'

const persistedReducer = persistReducer(
  { key: 'cryptoma', storage },
  rootReducer
)

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

export default createStore(
  persistedReducer,
  initialState,
  // http://extension.remotedev.io
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
