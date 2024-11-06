const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const config = {
  output: {
    path: join(__dirname, '../../dist/apps/lambda-hello'),
    module: true,
    library: { type: 'module' },
    chunkFormat: 'module',
    chunkLoading: 'import',
    filename: '[name].mjs',
    uniqueName: 'lambda-hello',
  },
  experiments: {
    outputModule: true,
  },
  // externalsType: 'module',
  mode: 'production',
  target: 'node20',
  externals: [],
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
    new webpack.container.ModuleFederationPlugin({
      name: 'lambda_hello',
      library: { type: 'module' },
      remotes: {
        'random-name':
          'https://9098-177-86-21-225.ngrok-free.app/remoteEntry.js',
      },
    }),
  ],
};

module.exports = config;
