/* @flow */

import React from 'react'
import { Route } from 'react-router-dom'
import NavItem from 'react-bootstrap/lib/NavItem'

type Props = {
  to: string,
  exact?: boolean,
  strict?: boolean,
  active?: boolean
}

export default ({ to, exact, strict, active, ...rest }: Props) => (
  <Route path={to} exact={exact} strict={strict}>
    {({ match, history }) => (
      <NavItem
        href={to}
        active={!!match}
        onClick={ev => {
          ev.preventDefault()
          history.push(to)
        }}
        {...rest}
      />
    )}
  </Route>
)
