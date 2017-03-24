import { createStore } from 'redux'

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
const enhancer = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined

export default createStore(
  rootReducer,
  initialState,
  enhancer
)
