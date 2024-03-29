const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  // resolve: {
  //   fallback: {
  //     "path": require.resolve("path-browserify"),
  //     "zlib": require.resolve("browserify-zlib"),
  //     "stream": require.resolve("stream-browserify"),
  //     "https": require.resolve("https-browserify"),
  //     "crypto": require.resolve("crypto-browserify"),
  //     "http": require.resolve("stream-http"),
  //     "vm": require.resolve("vm-browserify"),
  //     "constants": require.resolve("constants-browserify"),
  //   },
  // },
  // plugins: [
  //   new NodePolyfillPlugin()
  // ],
  // externalsPresets: { node: true },
  // externals: [nodeExternals()],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
};