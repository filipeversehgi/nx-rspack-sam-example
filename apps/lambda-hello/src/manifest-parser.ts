import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { ManifestItem } from './types';

export const parseManifest = () => {
  /**
   * Parses Manifest on Boot and generates a hashmap
   */
  const manifestText = readFileSync(
    join(dirname(__filename), 'manifest.yml'),
    'utf8'
  );

  const manifestList: { hosts: ManifestItem[] } = parse(manifestText);

  const manifestHashmap = manifestList.hosts.reduce(
    (acc: Record<string, ManifestItem>, cur) => {
      acc[cur.path] = cur;
      return acc;
    },
    {}
  );

  const getModuleForRequest = async (hostHash: string) => {
    return manifestHashmap[hostHash];
  };

  return { manifestHashmap, getModuleForRequest };
};
