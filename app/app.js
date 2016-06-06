import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Body from 'components/body'

import './app.less'

export default (locals, callback) => {
  // locals.assets only contain javascript assets. we want all of them!
  const stats = locals.webpackStats.toJson()
  const assets = stats.assetsByChunkName['main'] // same main as in webpack.config.js' entry
  const scripts = assets.filter((asset) => /\.jsx?$/.test(asset))
  const stylesheets = assets.filter((asset) => /\.css$/.test(asset))

  const html = ReactDOMServer.renderToString(
    <Body title='static bootsrap website bootstrap'
      scripts={scripts} stylesheets={stylesheets} >
      <h1>Hello world!</h1>
    </Body>
  )

  callback(null, '<!DOCTYPE html>' + html)
}
