import { composePlugins, withNx } from '@nx/webpack';
import { withNodeFederation } from '@nx-lambda/shared';

export default composePlugins(
  withNx(),
  withNodeFederation({
    remotes: {
      'my-nest-api': 'my-nest-api@http://localhost:3002/remoteEntry.js',
    },
    name: 'lambda_hello',
    dts: false,
    useRuntimePlugin: true,
    isServer: true,
  }),
  config => config,
)
