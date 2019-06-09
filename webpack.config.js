const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
module.exports = {
   entry: './src/client/index.tsx',
   resolve: {
     extensions: ['.ts', '.tsx', '.js']
   },
   module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader'
      }
    ]
  },
   output: {
     path: path.join(__dirname, '/public'),
     filename: 'app.js'
  },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/client/index.html'
      })
    ],
  devServer: {
    contentBase: './src/client',
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
}