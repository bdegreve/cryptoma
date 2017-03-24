import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { Route, Switch, BrowserRouter, StaticRouter } from 'react-router-dom'

import Layout from 'pages/layout'
import Home from 'pages/home'
import About from 'pages/about'
import Crypto from 'pages/crypto'

import store from './store'

const App = () =>
  <Layout>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/:cipher' component={Crypto} />
    </Switch>
  </Layout>

if (typeof document !== 'undefined') {
  persistStore(store)
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('content')
  )
}

export default (locals, callback) => {
  // locals.assets only contain javascript assets. we want all of them!
  const assets = getAssetPaths(locals.webpackStats, 'main') // same main as in webpack.config.js' entry
  const scripts = assets.filter((asset) => /\.jsx?$/.test(asset))
  const stylesheets = assets.filter((asset) => /\.css$/.test(asset))

  const context = {}
  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={locals.path} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const title = 'static bootsrap website bootstrap'
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

  return callback(null, '<!DOCTYPE html>\n' + html)
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
