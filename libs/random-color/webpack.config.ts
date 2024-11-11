import { withNodeFederation } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'random-color',
    isServer: true,
    dts: false,
    library: { type: 'commonjs-module' },
    useRuntimePlugin: true,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lib/random-color',
    },
  }),
  withZephyr(),
  (config) => config
);
