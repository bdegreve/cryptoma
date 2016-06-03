var path = require('path')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  devtool: '#source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {} // see .babelrc
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url?limit=10000'
      }
    ]
  },
  plugins: [
    new StaticSiteGeneratorPlugin('main', ['/'])
  ],
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js'],
    modulesDirectories: [
      'node_modules',
      'web_modules' // because https://github.com/webpack/webpack-dev-server/issues/60
    ]
  }
}
