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
    return loadRemote(name);
  }

  public static async loadAndExtract(name: string, moduleName: string) {
    try {
      const module = await ModuleFederationUtil.loadRemote(name);
      if (!module) return null;

      return module[moduleName];
    } catch (error) {
      return null;
    }
  }

  public static registerRemotes(remotes: ManifestItem[]) {
    return registerRemotes(remotes.map(this.parseManifestItem), {
      force: true,
    });
  }
}
