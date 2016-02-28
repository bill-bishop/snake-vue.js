var path = require('path');

var autoprefixer = require('autoprefixer-core');
var cssnext = require('cssnext');
var doiuse = require('doiuse');
var colors = require('colors');
var wordwrap = require('wordwrap');
var csswring = require('csswring');
var nested = require('postcss-nested');


var postcssOptions = [
  nested,
  cssnext,
  doiuse({
    onFeatureUsage: function (info) {
      var source = info.usage.source;
      // file is whole require path, joined with !'s.. we want the last part
      var sourceFile = path.relative('.', source.input.file.split('!').pop())
      var sourceLine = sourceFile + ':' + source.start.line;
      // take out location info in message itself
      var message = info.message.split(': ').slice(1).join(': ')
      console.log('[doiuse]'.red + ' ' + sourceLine + ': ' + info.featureData.title + '\n');
      console.log(wordwrap(4, process.stdout.columns - 1)(message) + '\n');
    }
  }),
  autoprefixer,
  csswring
];

module.exports = {
  entry: {
    app: ['./src/app.js']
  },
  output: {
    path: __dirname + '/assets',
    publicPath: '/assets',
    filename: 'snake.js'
  },
  devServer: {
    port: 9999
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  vue: {
    postcss: postcssOptions
  },
  postcss: postcssOptions,
  plugins: []
};
