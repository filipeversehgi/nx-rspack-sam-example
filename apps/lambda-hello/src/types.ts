export type ManifestItem = { path: string; name: string; url: string };

export type ModuleCache = {
  clearAt: number;
  requestCount: number;
  manifestData: ManifestItem;
  module: any;
};
