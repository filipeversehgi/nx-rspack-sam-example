const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

const config = {
  output: {
    path: join(__dirname, '../../dist/apps/lambda-hello'),
    libraryTarget: 'commonjs2',
    iife: false,
  },
  target: 'node',
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
    new ModuleFederationPlugin({
      name: 'lambda_hello',
      dts: false,
      runtimePlugins: [
        require.resolve('@module-federation/node/runtimePlugin'),
      ],
      remotes: {
        'random-name': 'RandomName@http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
};

module.exports = config;
