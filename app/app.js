/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { IntlProvider } from 'react-intl'

import Layout from 'pages/layout'
import Home from 'pages/home'
import About from 'pages/about'
import Crypto from 'pages/crypto'

import { messages, parseLocale } from './locales'

import store from './store'

const persistor = persistStore(store)

const App = () => (
  <Layout>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/:cipher' component={Crypto} />
    </Switch>
  </Layout>
)

const locale = parseLocale(window.navigator.language)

const content = document.getElementById('content')
if (content) {
  ReactDOM.render(
    <IntlProvider
      locale={locale}
      defaultLocale='en'
      messages={messages[locale]}
    >
      <Provider store={store}>
        <PersistGate loader={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PersistGate>
      </Provider>
    </IntlProvider>,
    content
  )
}
