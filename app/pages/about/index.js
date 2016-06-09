import React from 'react'
import { Link } from 'react-router'

import Grid from 'react-bootstrap/lib/Grid'

export default () => (
  <Grid componentClass='main'>
    <header>
      <h1>About</h1>
    </header>
    <p>things</p>
    <footer>
      <Link to='/'>Home</Link>
    </footer>
  </Grid>
)
