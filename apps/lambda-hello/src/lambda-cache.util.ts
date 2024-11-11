import { ModuleCache } from './types';

export const getClearAtByFlag = (flag: string) => {
  switch (flag) {
    case 'qa':
      return null;
    default:
      return getClearAtDate(60);
  }
};

export const getClearAtDate = (minsFromNow: number) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minsFromNow);
  return now.getTime();
};

export const shouldClear = (clearAt: number) => {
  const now = +new Date();
  return now > clearAt;
};

export const getCacheKey = (subdomain: string, flag: string) => {
  return [subdomain, flag].filter(Boolean).join('-');
};

export const bootstrappedModulesByPath: Record<string, ModuleCache> = {};

export const clearOldInstances = () => {
  setInterval(() => {
    Object.keys(bootstrappedModulesByPath).forEach((key) => {
      const { clearAt } = bootstrappedModulesByPath[key];
      if (shouldClear(clearAt)) {
        delete bootstrappedModulesByPath[key];
      }
    });
  }, 1000);
};
