import {
  withManifest,
  withNodeFederation,
  withSam,
} from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';

export default composePlugins(
  withNx(),
  withSam(),
  withManifest(),
  withNodeFederation({
    name: 'lambda_hello',
    remoteType: 'commonjs',
    dts: false,
    useRuntimePlugin: true,
    isServer: true,
    // remotes: ['my-nest-app'],
    remotes: {
      'my-nest-app': 'my-nest-app@http://localhost:3002/remoteEntry.js',
    },
  }),
  (config) => config
);
