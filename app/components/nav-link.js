import React from 'react'
import {Route, Link} from 'react-router-dom'

import joinNames from 'lib/join-names'

export default ({to, exact, strict, className, ...rest}) =>
  <Route
    path={typeof to === 'object' ? to.pathname : to}
    exact={exact}
    strict={strict}
  >
    {({match}) =>
      <li className={joinNames(match && 'active', className)}>
        <Link to={to} {...rest} />
      </li>
    }
  </Route>
