import { withNodeFederation } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'RandomName',
    isServer: true,
    dts: false,
    remoteType: 'script',
    library: { type: 'commonjs-module' },
    useRuntimePlugin: true,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lib/random-name',
    },
  }),
  withZephyr(),
  (config) => {
    if (config.output) {
      config.output.publicPath = 'auto';
      config.output.library = { type: 'commonjs-module' };
    }

    config.target = false;

    return config;
  },
  (config) => config
);
