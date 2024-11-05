const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const config = {
  output: {
    path: join(__dirname, '../../dist/apps/lambda-hello'),
    module: true,
    library: { type: 'module' },
    chunkFormat: 'module',
    chunkLoading: 'import',
    filename: '[name].mjs',
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  mode: 'production',
  target: 'node',
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'samconfig.toml', to: './' },
        { from: 'sam-template.yaml', to: './' },
      ],
    }),
  ],
};

module.exports = config;
