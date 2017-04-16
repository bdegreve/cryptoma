import React from 'react'
import { Link } from 'react-router-dom'

import Grid from 'react-bootstrap/lib/Grid'

export default () => (
  <Grid componentClass='main'>
    <header>
      <h1>About Cryptoma</h1>
    </header>
    <p>This tool was created for the purpose of enciphering parts of the route
      description of <a href='http://www.joepie27.be/'>Joepie 27</a>, tocht C.</p>
    <p>Full source code is available on <a href='https://github.com/bdegreve/cryptoma'>Github</a>.</p>
    <footer>
      <Link to='/'>Home</Link>
    </footer>
  </Grid>
)
