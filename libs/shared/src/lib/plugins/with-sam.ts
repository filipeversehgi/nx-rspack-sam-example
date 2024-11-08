import * as CopyPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

export interface SamConfig {
  samConfigFile: string;
  samTemplateFile: string;
}

export function withSam(samConfig?: Partial<SamConfig>) {
  return (config: Configuration) => {
    if (config.output) {
      config.output.libraryTarget = 'commonjs2';
      config.output.iife = false;
    }

    config.plugins ??= [];

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: samConfig?.samConfigFile || 'samconfig.toml', to: './' },
          { from: samConfig?.samTemplateFile || 'sam-template.yaml', to: './' },
        ],
      })
    );

    return config;
  };
}
