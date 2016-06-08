import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import './app.less'

const App = () => (
  <h1>Hello world!</h1>
)

if (typeof document !== 'undefined') {
  ReactDOM.render(<App />, document.getElementById('content'))
}

export default (locals, callback) => {
  // locals.assets only contain javascript assets. we want all of them!
  const assets = getAssetPaths(locals.webpackStats, 'main') // same main as in webpack.config.js' entry
  const scripts = assets.filter((asset) => /\.jsx?$/.test(asset))
  const stylesheets = assets.filter((asset) => /\.css$/.test(asset))

  // don't render everything with renderToString.
  // see http://jeffhandley.github.io/QuickReactions/20-final-cleanup
  // (via http://stackoverflow.com/a/37621838)

  const title = 'static bootsrap website bootstrap'
  const content = ReactDOMServer.renderToString(<App />)

  const html = ReactDOMServer.renderToStaticMarkup(
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{title}</title>
        {React.Children.map(stylesheets, (asset) => (
          <link rel='stylesheet' type='text/css' href={asset} />
        ))}
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={{__html: content}} />
        {React.Children.map(scripts, (asset) => (
          <script type='text/javascript' src={asset} />
        ))}
      </body>
    </html>
  )

  callback(null, '<!DOCTYPE html>\n' + html)
}

function getAssetPaths (webpackStats, chunckName) {
  const stats = webpackStats.toJson()
  const assets = stats.assetsByChunkName[chunckName]
  let publicPath = stats.publicPath
  if (publicPath.length && !publicPath.endsWith('/')) {
    publicPath += '/'
  }
  return assets.map((asset) => publicPath + asset)
}
