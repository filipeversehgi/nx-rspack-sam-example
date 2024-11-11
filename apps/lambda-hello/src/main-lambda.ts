import { APIGatewayProxyResult, Context } from 'aws-lambda';

const bootstrappedModulesByPath: Record<
  string,
  {
    lastAccessTime: number;
    module: any;
  }
> = {};

import { parseManifest } from './manifest-parser';
import { ModuleFederationUtil } from './module-federation.util';

const { manifestHashmap, getModuleForRequest } = parseManifest();

ModuleFederationUtil.init();

const handler = async (
  event: any,
  context?: Context,
  callback?: any
): Promise<APIGatewayProxyResult> => {
  /**
   * Gets the subdomain, that represents the "host-module-id" in the manifest
   */
  const hostHash = event.requestContext.domainName.split('.')[0];
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
  if (!bootstrappedModulesByPath[remoteModule.path]) {
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
    bootstrappedModulesByPath[remoteModule.path] = {
      lastAccessTime: +new Date(),
      module: serverInstance,
    };
  }

  bootstrappedModulesByPath[remoteModule.path].lastAccessTime = +new Date();

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
