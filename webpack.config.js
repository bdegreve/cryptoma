const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'
const HASH = !DEBUG ? '-[hash]' : ''
const CHUNKHASH = !DEBUG ? '-[chunkhash]' : ''

const plugins = [
  new webpack.LoaderOptionsPlugin({
    debug: !!DEBUG,
    minimize: !DEBUG
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new ExtractTextPlugin(`[name]${CHUNKHASH}.css`),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html')
  })
]
if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false // too many warnings are worse than none.
      }
    })
  )
}

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      // don't localize names by default, otherwise bootstrap get
      // localized too. Instead explicitly :local(...) what needs to be.
      // ?importLoaders=1 seems not required for now.
      // https://css-tricks.com/css-modules-part-3-react/
      // https://github.com/css-modules/css-modules
      modules: false,
      localIdentName: '[local]_[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        autoprefixer({
          browsers: ['last 3 versions', '> 1%']
        })
      ]
    }
  }
]

module.exports = {
  context: __dirname,
  entry: {
    main: [
      'babel-polyfill',
      './app/app.less',
      './app/app.js' // must be last for static-site-generator-webpack-plugin
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: `[name]${CHUNKHASH}.js`,
    libraryTarget: 'umd',
    pathinfo: !!DEBUG
  },
  devtool: DEBUG ? 'cheap-eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
        use: 'standard-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader' // see .babelrc
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            ...cssLoaders,
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|eot|woff|woff2|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[name]${HASH}.[ext]`
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  resolve: {
    modules: [
      path.resolve(__dirname, './app'),
      __dirname,
      'node_modules',
      'web_modules' // because https://github.com/webpack/webpack-dev-server/issues/60
    ]
  }
}
