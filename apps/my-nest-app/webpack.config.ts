import { withNodeFederation, withZephyrNode } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

export default composePlugins(
  withNx({
    publicPath: 'auto',
  }),
  withNodeFederation({
    name: 'my-nest-app',
    dts: false,
    isServer: true,
    library: { type: 'commonjs-module' },
    useRuntimePlugin: true,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lambda',
    },
    // remotes: ['random-name'],
    remotes: {
      'random-color': 'random-color@http://localhost:3001/remoteEntry.js',
    },
  }),
  withZephyr(),
  withZephyrNode(),
  (config) => config
);
