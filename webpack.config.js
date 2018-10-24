'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    // './src/js/index.js',
    './src/sass/style.scss'
  ],

  output: {
    // filename: './js/bundle.js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   include: path.resolve(__dirname, 'src/js'),
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         ['env', {
      //           'targets': {
      //             'browsers': [
      //               '>0.2%',
      //               'not dead',
      //               'last 2 versions'
      //             ]
      //           }
      //         }]
      //       ]
      //     }
      //   }
      // },

      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              url: false
              // sourceMap: true,
              // modules: true,
              // localIdentName: "[local]___[hash:base64:5]"
            }
          },

          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                // require('cssnano')({
                //   preset: 'default'
                // })
              ],
              // sourceMap: true
            }
          },

          {
            loader: 'sass-loader',
            options: {
              // sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/fonts',
        to: './fonts'
      },
      {
        from: './src/img',
        to: './img'
      }
    ])
  ]
}
