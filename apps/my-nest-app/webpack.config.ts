import { withNodeFederation, withZephyrNode } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

export default composePlugins(
  withNx({
    target: 'async-node',
    publicPath: 'auto'
  }),
  withNodeFederation({
    name: 'my-nest-app',
    dts: false,
    isServer: true,
    library: { type: 'commonjs-module' },
    useRuntimePlugin: true,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/main',
    },
    // remotes: ['random-name'],
    remotes: {
      'random-name': 'random-name@http://localhost:3001/remoteEntry.js',
    },
  }),
  withZephyr(),
  withZephyrNode(),
  (config) => config,
);
