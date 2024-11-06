import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';
import { join } from 'path';
import * as webpack from 'webpack';
import { WebpackConfiguration } from 'webpack-cli';

module.exports = {
  output: {
    path: join(__dirname, '../../dist/libs/random-name'),
    module: true,
    library: { type: 'module' },
    chunkFormat: 'module',
    chunkLoading: 'import',
    uniqueName: `random-name`,
    publicPath: 'auto',
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  mode: 'production',
  target: 'node20',
  externals: [],
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
    new webpack.container.ModuleFederationPlugin({
      name: 'random-name',
      library: { type: 'module' },
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/index',
      },
    }),
  ],
} as WebpackConfiguration;
