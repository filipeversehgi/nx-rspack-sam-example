const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

const config = {
  output: {
    path: join(__dirname, '../../dist/apps/lambda-hello'),
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
    new ModuleFederationPlugin({
      name: 'lambda_hello',
      dts: false,
      remotes: {
        'random-name':
          'RandomName@https://896d-177-86-21-225.ngrok-free.app/remoteEntry.js',
      },
    }),
  ],
};

module.exports = config;
