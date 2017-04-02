import React from 'react'
import { Route } from 'react-router-dom'
import NavItem from 'react-bootstrap/lib/NavItem'

export default ({to, exact, strict, active, ...rest}) =>
  <Route
    path={to}
    exact={exact}
    strict={strict}
  >
    {({match, history}) =>
      <NavItem
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