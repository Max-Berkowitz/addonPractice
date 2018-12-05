const { resolve } = require('path');

module.exports = {
  context: resolve(__dirname, 'client'),
  entry: './index.jsx',
  output: {
    path: resolve(__dirname, 'client/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: 'file-loader', options: {} }],
      },
    ],
  },
};