import { composePlugins, withNx } from '@nx/webpack';
import { withNodeFederation } from '@nx-lambda/shared';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'my-nest-api',
    dts: false,
    isServer: true,
    library: { type: 'commonjs-module' },
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/main'
    },
    // remotes: ['random-name'],
    remotes: {
      'RandomName': 'RandomName@http://localhost:3001/remoteEntry.js'
    }
  }),
  config => config,
)
