import { UniversalFederationPlugin } from '@module-federation/node';
import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';
import { join } from 'path';
import { WebpackConfiguration } from 'webpack-cli';

module.exports = {
  target: 'async-node',
  output: {
    path: join(__dirname, '../../dist/libs/random-name'),
    // module: true,
    // library: { type: 'module' },
    // chunkFormat: 'module',
    // chunkLoading: 'import',
    // uniqueName: `random-name`,
    publicPath: 'auto',
  },
  // experiments: {
  //   outputModule: true,
  // },
  // externalsType: 'module',
  // mode: 'production',
  // target: 'node20',
  // externals: [],
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
    // new webpack.container.ModuleFederationPlugin({
    //   name: 'random-name',
    //   library: { type: 'commonjs-module' },
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     '.': './src/index',
    //   },
    // }),
    new UniversalFederationPlugin({
      name: 'RandomName',
      isServer: true,
      dts: false,
      library: { type: 'commonjs-module', name: 'RandomName' },
      useRuntimePlugin: false,
      filename: 'remoteEntry.js',
      exposes: {
        '.': './src/lib/random-name.ts',
      },
    }),
  ],
} as WebpackConfiguration;
