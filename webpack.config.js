/* global APP_CONFIG */
const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const loadenv = require('node-env-file');

loadenv("./.env")
 
module.exports = {
  context: __dirname + '/src',
  entry: {
    app: path.join(__dirname, 'src/js/app.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: 'dist',
    port: 4000,
    inline: true
  },
  module: {
    rules: [
      {
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
        test: /\.js[x]?$/,
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        })
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_CONFIG: ( () => {
        return JSON.stringify({
          APP_ENV: process.env.APP_ENV,
          API_BASE: process.env.API_BASE,
          WS_URL: process.env.WS_URL,
        })
      })()
    }),
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss:[
          require('postcss-import'),
          require('autoprefixer'),
          require('postcss-nested'),
        ]
      }
    }),
  ],
};
