import { composePlugins, withNx } from '@nx/webpack';
import { withNodeFederation } from '@nx-lambda/shared';

export default composePlugins(
  withNx(),
  withNodeFederation({
    name: 'RandomName',
    isServer: true,
    dts: false,
    library: { type: 'commonjs-module' },
    useRuntimePlugin: false,
    filename: 'remoteEntry.js',
    exposes: {
      '.': './src/lib/random-name',
    },
  }),
  (config) => config
);
