import React from 'react'
import {Link} from 'react-router'

import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import AppBar from 'components/navbar'

import style from './style.less'

export default ({children}) => (
  <div>
    <AppBar brand='Static-React-Bootstrap'>
      <li><Link to='crypto'>Crypto</Link></li>
      <NavItem eventKey={2}>Action</NavItem>
      <NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
      <NavItem pullRight eventKey={1}>Action Right</NavItem>
      <li pullRight><Link to='about'>About</Link></li>
    </AppBar>
    <div className={style.main}>
      {children}
    </div>
  </div>
)
