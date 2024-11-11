import { withNodeFederation } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'random-name',
    isServer: true,
    dts: false,
    library: { type: 'commonjs-module' },
    useRuntimePlugin: true,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lib/random-name',
    },
  }),
  withZephyr(),
  (config) => config
);
