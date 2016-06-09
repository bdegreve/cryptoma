import React from 'react'
import {Link} from 'react-router'

import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import AppBar from 'components/navbar'

const style = {
  position: 'fixed',
  top: '51px',
  bottom: '0px',
  left: '0px',
  right: '0px'
}

export default ({children}) => (
  <div>
    <AppBar brand='Static-React-Bootstrap'>
      <NavItem eventKey={1}>Action</NavItem>
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
    <div style={style}>
      {children}
    </div>
  </div>
)
