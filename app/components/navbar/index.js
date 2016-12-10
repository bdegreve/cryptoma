import React from 'react'
import {Link} from 'react-router'

import Navbar from 'react-bootstrap/lib/Navbar'

export default ({brand, children}) => {
  return (
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>{brand}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {children}
      </Navbar.Collapse>
    </Navbar>
  )
}
