import { init, loadRemote, registerRemotes } from '@module-federation/runtime';
import { Remote } from '@module-federation/runtime/dist/src/type';
import { ManifestItem } from './types';

export class ModuleFederationUtil {
  public static init(hashmap: Record<string, ManifestItem> = {}) {
    const remotes: Remote[] = Object.entries(hashmap).map(([name, item]) =>
      this.parseManifestItem(item)
    );

    init({
      name: 'lambda_hello',
      remotes,
    });
  }

  private static parseManifestItem(item: ManifestItem): Remote {
    return {
      name: item.name,
      entry: item.url,
      alias: item.path,
    };
  }

  public static loadRemote(name: string) {
    console.log('- Trying to load remote', name);
    return loadRemote(name);
  }

  public static loadAndExtract(name: string, moduleName: string) {
    return ModuleFederationUtil.loadRemote(name).then((m) => m![moduleName]);
  }

  public static registerRemotes(remotes: ManifestItem[]) {
    return registerRemotes(remotes.map(this.parseManifestItem));
  }
}
