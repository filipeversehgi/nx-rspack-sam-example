import { withNodeFederation } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'my-nest-api',
    dts: false,
    isServer: true,
    remoteType: 'script',
    library: { type: 'commonjs-module' },
    useRuntimePlugin: true,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lambda',
    },
    // remotes: ['@nx-lambda/random-name'],
    remotes: {
      '@nx-lambda/random-name':
        '@nx-lambda/random-name@http://localhost:3001/remoteEntry.js',
    },
  }),

  withZephyr(),
  (config) => {
    if (config.output) {
      config.output.publicPath = 'auto';
      config.output.library = { type: 'commonjs-module' };
    }

    config.target = 'async-node';

    return config;
  }
);
