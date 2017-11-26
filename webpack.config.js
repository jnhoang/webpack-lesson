const path                = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const webpack             = require('webpack');

const HtmlWebpackConfig  = new HtmlWebpackPlugin({ template: 'app/index.html'}); 

const config = {
  entry: './app/index.js'
, resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
, module: {
    rules: [
      {
        test    : /\.jsx?$/,
        exclude : /node_modules/,
        loader  : 'babel-loader',
        query   : {
          presets : ['es2015', 'react']
        }
      },
      { 
        test    : /\.css$/,
        use     : [ 'style-loader', 'css-loader' ] 
      }
    ]
  }
, output: {
    path: path.resolve(__dirname, 'dist')
  , filename: 'index_bundle.js'
  }
, plugins: [ 
    HtmlWebpackConfig
  ,  
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  , new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;