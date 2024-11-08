import * as CopyPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

export interface ManifestConfig {
  fileName: string;
}

export function withManifest(manifestConfig?: Partial<ManifestConfig>) {
  return (config: Configuration) => {
    config.plugins ??= [];

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: manifestConfig?.fileName || 'manifest.yml', to: './' },
        ],
      })
    );

    return config;
  };
}
