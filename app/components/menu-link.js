import React from 'react'
import { Route } from 'react-router-dom'
import MenuItem from 'react-bootstrap/lib/MenuItem'

export default ({to, exact, strict, active, ...rest}) =>
  <Route
    path={to}
    exact={exact}
    strict={strict}
  >
    {({match, history}) =>
      <MenuItem
        href={to}
        active={!!match}
        onClick={ev => {
          ev.preventDefault()
          history.push(to)
        }}
        {...rest}
      />
    }
  </Route>
