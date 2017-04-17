import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import Grid from 'react-bootstrap/lib/Grid'

export default () => (
  <Grid componentClass='main'>
    <header>
      <h1><FormattedMessage id='about:title' defaultMessage='About Cryptoma' /></h1>
    </header>
    <p>
      <FormattedMessage
        id='about:text'
        defaultMessage={`
          This tool was created for the purpose of enciphering parts of the
          route description of {joepie}, tocht C.
        `}
        values={{
          joepie: <a href='http://www.joepie27.be/'>Joepie 27</a>
        }}
      />
    </p>
    <p>
      <FormattedMessage
        id='about:github'
        defaultMessage={`
          Full source code is available on {github}.
        `}
        values={{
          github: <a href='https://github.com/bdegreve/cryptoma'>Github</a>
        }}
      />
    </p>
    <footer>
      <Link to='/'><FormattedMessage id='about:home' defaultMessage='Home' /></Link>
    </footer>
  </Grid>
)
