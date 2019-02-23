const { resolve } = require('path');

module.exports = {
  context: resolve(__dirname, 'client'),
  entry: './index.jsx',
  output: {
    path: resolve(__dirname, 'client/dist/bundle'),
    filename: 'bundle.js',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
};
