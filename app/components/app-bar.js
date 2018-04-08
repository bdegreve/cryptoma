/* @flow */

import React from 'react'
import {Link} from 'react-router-dom'

import Navbar from 'react-bootstrap/lib/Navbar'

import type { Node } from 'react'

type Props = {
  brand: string,
  children?: Node
}

export default ({brand, children}: Props) => {
  return (
    <Navbar inverse fixedTop collapseOnSelect>
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
