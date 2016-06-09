import React from 'react'
import {Link} from 'react-router'

import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'

export default ({brand, children}) => {
  const childs = React.Children.toArray(children)
  const lefts = childs.filter((child) => !child.props.pullRight)
  const rights = childs.filter((child) => child.props.pullRight)

  return (
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>{brand}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {lefts}
        </Nav>
        <Nav pullRight>
          {rights}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
