const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/my-nest-app'),
    libraryTarget: 'commonjs2',
    iife: false,
    // libraryTarget: 'module',
    // module: true,
    // library: { type: 'module' },
    // chunkFormat: 'module',
    // chunkLoading: 'import',
    // filename: '[name].mjs',
    // uniqueName: 'my-nest-app',
  },
  // externalsType: 'module',
  // mode: 'production',
  // target: 'node20',
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/lambda.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: join(__dirname, './samconfig.toml'), to: './' },
        { from: join(__dirname, './sam-template.yaml'), to: './' },
      ],
    }),
    // new webpack.container.ModuleFederationPlugin({
    //   name: 'random-name',
    //   library: { type: 'module' },
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     '.': './src/index',
    //   },
    // }),
    new ModuleFederationPlugin({
      name: 'my-nest-api',
      dts: false,
      runtimePlugins: [
        require.resolve('@module-federation/node/runtimePlugin'),
      ],
      // library: { type: 'module' },
      remotes: {
        'random-name': 'RandomName@http://localhost:3001/remoteEntry.js',
      },
    }),
    // new webpack.container.ModuleFederationPlugin({
    //   name: 'my-nest-api',
    //   // library: { type: 'commonjs2' },
    //   library: { type: 'commonjs-module' },

    //   remotes: {
    //     'random-name':
    //       'random-name@https://6f66-177-86-21-225.ngrok-free.app/remoteEntry.js',
    //   },
    // }),
  ],
};
