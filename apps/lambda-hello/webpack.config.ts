import { withNodeFederation } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';

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
  (config) => {
    if (config.output) {
      config.output.libraryTarget = 'commonjs2';
      config.output.iife = false;
    }

    return config;
  }
);
