import { Configuration } from 'webpack';
import { isModuleFederationPlugin } from 'zephyr-webpack-plugin/dist/lib/utils/is-mf-plugin';

interface MfPlugin {
  _options: {
    remotes: Record<string, string>;
  };
}

export function withZephyrNode() {
  return async (config: Configuration) => {
    const mfPlugin = config.plugins?.find(
      isModuleFederationPlugin
    ) as unknown as MfPlugin;
    if (mfPlugin) {
      Object.keys(mfPlugin._options.remotes).forEach(
        (key) =>
          (mfPlugin._options.remotes[key] = parseMeta(
            mfPlugin._options.remotes[key]
          )!)
      );
    }

    return config;
  };
}

function parseMeta(remoteFunction: string) {
  const remoteUrlRegex = /const remote_entry_url\s*=\s*'([^']+)'/;

  const result = remoteFunction.match(remoteUrlRegex)?.[1];

  console.log('remote:', result);

  return result || remoteFunction;
}
