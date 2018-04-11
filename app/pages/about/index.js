/* @flow */

import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'

export default () => (
  <Grid componentClass='main'>
    <header>
      <h1>
        <FormattedMessage id='about:title' defaultMessage='About Cryptoma' />
      </h1>
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
          Full source code is available on {github}, revision {revision}
        `}
        values={{
          github: <a href='https://github.com/bdegreve/cryptoma'>Github</a>,
          revision: process.env.GIT_REVISION
        }}
      />
    </p>
    <Panel>
      <p>ISC License</p>
      <p>Copyright (c) 2017, Bram de Greve</p>
      <p>
        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted, provided that the above
        copyright notice and this permission notice appear in all copies.
      </p>
      <p>
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
        WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
        MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
        ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
        WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
        ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
        OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
      </p>
    </Panel>
    <footer>
      <Link to='/'>
        <FormattedMessage id='about:home' defaultMessage='Home' />
      </Link>
    </footer>
  </Grid>
)
