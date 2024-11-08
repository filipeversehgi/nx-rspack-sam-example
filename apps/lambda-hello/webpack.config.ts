import { withManifest, withNodeFederation, withSam } from '@nx-lambda/shared';
import { composePlugins, withNx } from '@nx/webpack';

export default composePlugins(
  withNx(),
  withSam(),
  withManifest(),
  withNodeFederation({
    remotes: [],
    name: 'lambda_hello',
    remoteType: 'script',
    dts: false,
    useRuntimePlugin: true,
    isServer: true,
  }),
  // withZephyr(),
  (config) => {
    console.log(config.output);
    if (config.output) {
      config.output.library = { type: 'commonjs-module' };
    }

    config.target = 'async-node';
    return config;
  },
  (config) => {
    return config;
  }
  // (config) => {
  //   if (config.output) {
  //     config.output.libraryTarget = 'commonjs2';
  //     config.output.iife = false;
  //   }

  //   return config;
  // },
  // (config) => {
  //   const mfPlugin = config.plugins?.find((plugin) => {
  //     if (plugin) return plugin.name === 'ModuleFederationPlugin';
  //     return false;
  //   });

  //   if (!mfPlugin) return config;

  //   const remotes = (mfPlugin as any)._options.remotes;

  //   console.log(remotes);
  //   return config;
  // }
);
