import {
  withManifest,
  withNodeFederation,
  withSam,
  withZephyrNode,
} from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';
import { withZephyr } from 'zephyr-webpack-plugin';

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
    // remotes: {
    //   'my-nest-app': 'my-nest-app@http://localhost:3002/remoteEntry.js',
    // },
  }),
  withZephyr(),
  withZephyrNode(),
  (config) => config
);
