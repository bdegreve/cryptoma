const path = require('path')
const childProcess = require('child_process')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.GIT_REVISION': JSON.stringify(revision())
  }),
  new MiniCssExtractPlugin({
    filename: `[name]${CHUNKHASH}.css`,
    chunkFilename: `[id]${CHUNKHASH}.css`
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html')
  })
]

const cssLoaders = [
  DEBUG ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      // don't localize names by default, otherwise bootstrap get
      // localized too. Instead explicitly :local(...) what needs to be.
      // ?importLoaders=1 seems not required for now.
      // https://css-tricks.com/css-modules-part-3-react/
      // https://github.com/css-modules/css-modules
      modules: {
        mode: 'global',
        localIdentName: '[local]_[hash:base64:5]'
      }
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [autoprefixer()]
    }
  }
]

module.exports = {
  mode: DEBUG ? 'development' : 'production',
  context: __dirname,
  entry: {
    main: [
      '@babel/polyfill',
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
        use: cssLoaders
      },
      {
        test: /\.less$/,
        use: [
          ...cssLoaders,
          {
            loader: 'less-loader',
            options: {
              // hack for less-loader 4.0 that now uses webpack's loaders
              // by default, and thus can't cope with @import url(https://...)
              // Specifying paths option forces it back to less' original
              // loaders
              paths: [
                path.resolve(__dirname, './app'),
                path.resolve(__dirname, 'node_modules')
              ]
            }
          }
        ]
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

function revision () {
  return childProcess.execFileSync(
    'git',
    ['rev-parse', '--short=10', '--verify', 'HEAD'],
    {
      encoding: 'utf8'
    }
  )
}
