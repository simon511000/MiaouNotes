const path = require('path');
const srcDir = path.join(__dirname, "..", "src");
const distDir = path.join(__dirname, "..", "dist");

module.exports = {
  entry: path.join(srcDir, 'index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: path.join('js', 'bundle.js'),
    path: distDir,
  },
};