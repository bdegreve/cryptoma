const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const historyApiFallback = require('connect-history-api-fallback')

const config = require('./webpack.config')

const app = express()
app.set('port', (process.env.PORT || 8080))

const compiler = webpack(config)

app.use(historyApiFallback())

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: false,
  stats: {
    colors: true
  }
}))


app.listen(app.get('port'), '0.0.0.0', function () {
  console.log('Listening at http://0.0.0.0:' + app.get('port'))
})
