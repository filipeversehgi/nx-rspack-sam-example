import { withNodeFederation } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'my-nest-api',
    dts: false,
    isServer: true,
    library: { type: 'commonjs-module' },
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lambda',
    },
    // remotes: ['random-name'],
    remotes: {
      RandomName: 'RandomName@http://localhost:3001/remoteEntry.js',
    },
  }),
  (config) => config
);
