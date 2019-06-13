const Path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    inline: true,
    hot: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        exclude: [/node_modules/, /src\/lib/],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          rules: {
            semi: 0
          }
        }
      },
      {
        test: /\.(riot)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: true
            }
          }
        ]
      },
      {
        test: /\.js$|\.riot$/,
        exclude: [/node_modules/, /src\/lib/],
        include: Path.resolve(__dirname, '../src'),
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
      }
    ]
  }
})
