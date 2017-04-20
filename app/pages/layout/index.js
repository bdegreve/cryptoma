/* @flow */

import React from 'react'
import { FormattedMessage } from 'react-intl'

import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'

import AppBar from 'components/navbar'
import NavLink from 'components/nav-link'
import MenuLink from 'components/menu-link'

import CIPHERS from 'ciphers'

import style from './style.less'

import type { Children } from 'react'

type Props = {
  children?: Children
}

export default ({ children }: Props) => (
  <div>
    <AppBar brand='Cryptoma'>
      <Nav>
        <NavDropdown eventKey={3} title='Ciphers' id='basic-nav-dropdown'>
          {Object.keys(CIPHERS).map(cipher => (
            <MenuLink key={cipher} to={`/${cipher}`}>
              {CIPHERS[cipher].name || cipher}
            </MenuLink>
          ))}
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavLink to='/about'>
          <FormattedMessage id='layout:about' defaultMessage='About Cryptoma' />
        </NavLink>
      </Nav>
    </AppBar>
    <div className={style.main}>
      {children}
    </div>
  </div>
)
