import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Body from 'components/body'

export default (locals, callback) => {
  const html = ReactDOMServer.renderToString(
    <Body title='static bootsrap website bootstrap'>
      <h1>Hello world!</h1>
    </Body>
  )
  callback(null, '<!DOCTYPE html>' + html)
}
