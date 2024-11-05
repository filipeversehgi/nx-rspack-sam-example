import { UniversalFederationPlugin } from '@module-federation/node';
import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';
import { join } from 'path';
import { WebpackConfiguration } from 'webpack-cli';

module.exports = {
  target: 'async-node',
  output: {
    path: join(__dirname, '../../dist/libs/random-name'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts',
      tsConfig: './tsconfig.lib.json',
      assets: [],
      optimization: false,
      outputHashing: 'none',
    }),
    new UniversalFederationPlugin({
      name: 'RandomName',
      isServer: true,
      dts: false,
      library: { type: 'commonjs-module', name: 'RandomName' },
      filename: 'remoteEntry.js',
      useRuntimePlugin: true,
      exposes: {
        '.': './src/index',
      },
    }),
  ],
} as WebpackConfiguration;
