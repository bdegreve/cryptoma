import React from 'react'

import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import AppBar from 'components/navbar'
import NavLink from 'components/nav-link'

import style from './style.less'

export default ({children}) => (
  <div>
    <AppBar brand='Static-React-Bootstrap'>
      <Nav>
        <NavLink to='/crypto'>Crypto</NavLink>
        <NavItem eventKey={2}>Action</NavItem>
        <NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1}>Action Right</NavItem>
        <NavLink to='/about'>About</NavLink>
      </Nav>
    </AppBar>
    <div className={style.main}>
      {children}
    </div>
  </div>
)
