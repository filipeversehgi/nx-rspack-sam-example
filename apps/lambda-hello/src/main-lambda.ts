import { APIGatewayProxyResult, Context } from 'aws-lambda';

const bootstrappedModulesByPath: Record<
  string,
  {
    lastAccessTime: number;
    module: any;
  }
> = {};

import { getHandlerPayload } from './handler-payload';
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

  console.log('Remote Module:', remoteModule);

  if (!remoteModule)
    return {
      statusCode: 500,
      body: 'Federated host not found with requested subdomain hash',
    };

  /**
   * Downloads, Boots and Caches the Remote Module
   */
  if (!bootstrappedModulesByPath[remoteModule.path]) {
    ModuleFederationUtil.registerRemotes([remoteModule]);
    console.log('- Load and Extract');

    const bootstrapRemoteModuleFn = await ModuleFederationUtil.loadAndExtract(
      hostHash,
      'bootstrap'
    );

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

handler(getHandlerPayload('dev'));

export { handler };
