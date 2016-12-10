var path = require('path')
var util = require('util')

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')

var DEBUG = process.env.NODE_ENV !== 'production'
var HASH = !DEBUG ? '-[hash]' : ''
var CHUNKHASH = !DEBUG ? '-[chunkhash]' : ''

var plugins = [
  new ExtractTextPlugin('[name]-[hash].css'),
  new StaticSiteGeneratorPlugin('main', ['/', '/about', '/crypto'])
]
if (!DEBUG) {
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }))
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false // too many warnings are worse than none.
    }
  }))
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
}

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './app/app.less',
      './app/app.js' // must be last for static-site-generator-webpack-plugin
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: util.format('[name]%s.js', CHUNKHASH),
    libraryTarget: 'umd',
    pathinfo: !!DEBUG
  },
  devtool: DEBUG ? '#eval-source-map' : '#source-map',
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?localIdentName=[local]-[hash:base64:5]!postcss')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?localIdentName=[local]-[hash:base64:5]!postcss!less')
      },
      {
        test: /\.(png|jpg|jpeg|eot|woff|woff2|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: util.format('file?name=[name]%s.[ext]', HASH)
      }
    ]
  },
  plugins: plugins,
  resolve: {
    root: path.resolve('./app'),
    extensions: ['', '.js'],
    modulesDirectories: [
      'node_modules',
      'web_modules' // because https://github.com/webpack/webpack-dev-server/issues/60
    ]
  },
  postcss: [
    autoprefixer({
      browsers: [
        'last 3 versions',
        '> 1%'
      ]
    })
  ]
}
