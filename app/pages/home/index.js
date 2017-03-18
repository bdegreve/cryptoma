import React from 'react'
import { Link } from 'react-router-dom'

import Grid from 'react-bootstrap/lib/Grid'

export default () => (
  <main>
    <header className='jumbotron'>
      <div className='container'>
        <h1>Hello world!</h1>
        <p>A starter kit for staticly generated websites, using React and
        Bootstrap</p>
      </div>
    </header>
    <footer>
      <Grid>
        <Link to='/about'>about</Link>
      </Grid>
    </footer>
  </main>
)
