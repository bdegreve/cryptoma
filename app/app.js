import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Layout from 'pages/layout'
import Home from 'pages/home'
import About from 'pages/about'
import Crypto from 'pages/crypto'

import store from './store'

persistStore(store)

const App = () =>
  <Layout>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/:cipher' component={Crypto} />
    </Switch>
  </Layout>

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('content')
)
