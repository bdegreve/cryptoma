import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout from 'pages/layout'
import Home from 'pages/home'
import About from 'pages/about'
import Crypto from 'pages/crypto'

// not a function this time.
export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
    <Route path='crypto' component={Crypto} />
  </Route>
)
