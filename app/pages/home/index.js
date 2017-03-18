import React from 'react'
import { Link } from 'react-router-dom'

import Grid from 'react-bootstrap/lib/Grid'

import CIPHERS from 'ciphers'

export default () => (
  <main>
    <header className='jumbotron'>
      <div className='container'>
        <h1>Cryptoma</h1>
        <ul>
          {Object.keys(CIPHERS).map(cipher =>
            <li key={cipher}>
              <Link to={`/${cipher}`}>
                {CIPHERS[cipher].name || cipher}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
    <footer>
      <Grid>
        <Link to='/about'>about</Link>
      </Grid>
    </footer>
  </main>
)
