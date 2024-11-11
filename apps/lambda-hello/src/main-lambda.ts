import { APIGatewayProxyResult, Context } from 'aws-lambda';

import {
  bootstrappedModulesByPath,
  clearOldInstances,
  getCacheKey,
  getClearAtByFlag,
} from './lambda-cache.util';
import { parseManifest } from './manifest-parser';
import { ModuleFederationUtil } from './module-federation.util';

const { manifestHashmap, getModuleForRequest } = parseManifest();

/**
 * Initializes MF Runtime
 */
ModuleFederationUtil.init();

/**
 * Monitor and clears not used instances
 * base on it's clearAt value
 */
clearOldInstances();

const handler = async (
  event: any,
  context?: Context,
  callback?: any
): Promise<APIGatewayProxyResult> => {
  /**
   * Gets the subdomain, that represents the "host-module-id" in the manifest
   */
  const hostHash = event.requestContext.domainName.split('.')[0];
  const flag = event.headers['x-actor'];

  const cacheKey = getCacheKey(hostHash, flag);
  const clearAt = getClearAtByFlag(flag);

  const remoteModule = await getModuleForRequest(hostHash);

  if (!remoteModule)
    return {
      statusCode: 500,
      headers: {
        contentType: 'application/json',
      },
      body: JSON.stringify({
        message: 'Module not found',
        availableModules: manifestHashmap,
      }),
    };

  /**
   * Downloads, Boots and Caches the Remote Module
   */
  if (!bootstrappedModulesByPath[cacheKey]) {
    ModuleFederationUtil.registerRemotes([remoteModule]);

    const bootstrapRemoteModuleFn = await ModuleFederationUtil.loadAndExtract(
      hostHash,
      'bootstrap'
    );

    if (!bootstrapRemoteModuleFn) {
      return {
        statusCode: 500,
        headers: {
          contentType: 'application/json',
        },
        body: JSON.stringify({
          message: 'Could not load module',
        }),
      };
    }

    const serverInstance = await bootstrapRemoteModuleFn();

    /**
     * Returns without caching the instance if clearAt is null
     */
    if (!clearAt) {
      return serverInstance(event, context, callback);
    }

    bootstrappedModulesByPath[cacheKey] = {
      clearAt,
      manifestData: remoteModule,
      requestCount: 0,
      module: serverInstance,
    };
  }

  /**
   * Updates the clearAt timestamp if endpoint is active
   */
  bootstrappedModulesByPath[cacheKey].clearAt = clearAt;
  bootstrappedModulesByPath[cacheKey].requestCount =
    bootstrappedModulesByPath[cacheKey].requestCount + 1;

  /**
   * Returns
   */
  return bootstrappedModulesByPath[remoteModule.path].module(
    event,
    context,
    callback
  );
};

// handler(getHandlerPayload('dev'));

export { handler };
