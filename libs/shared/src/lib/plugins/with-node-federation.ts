import { ModuleFederationPluginOptions } from '@module-federation/node/dist/src/types';
import { Configuration } from 'webpack';
import { UniversalFederationPlugin } from '@module-federation/node';

export interface NodeFederationOptions extends ModuleFederationPluginOptions {
  isServer: boolean;
  promiseBaseURI?: string;
  debug?: boolean;
  useRuntimePlugin?: boolean;
}

export function withNodeFederation(federationConfig: NodeFederationOptions): (config: Configuration) => Configuration {
  return (config: Configuration) => {
    config.plugins ??= [];

    config.plugins.push(new UniversalFederationPlugin(federationConfig));

    return config;
  }
}
