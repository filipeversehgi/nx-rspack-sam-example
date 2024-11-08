import { loadRemote } from '@module-federation/runtime';
import { APIGatewayProxyResult, Context } from 'aws-lambda';

const bootstrappedModules = {};

const exampleManifest = {
  abcdef1234: 'my-nest-api',
};

const handler = async (
  event: any,
  context?: Context,
  callback?: any
): Promise<APIGatewayProxyResult> => {
  /**
   * Gets the subdomain, that represents the "host-module-id" in the manifest
   */
  const hostHash = event.requestContext.domainName.split('.')[0];
  const moduleId = exampleManifest[hostHash];

  if (!moduleId)
    return {
      statusCode: 500,
      body: 'Federated host not found with requested subdomain hash',
    };

  /**
   * Downloads, Boots and Caches the Remote Module
   */
  if (!bootstrappedModules[moduleId]) {
    const { bootstrap } = await loadRemote<{ bootstrap: () => Promise<void> }>(
      moduleId
    );
    const serverInstance = await bootstrap();
    bootstrappedModules[moduleId] = serverInstance;
  }

  /**
   * Returns
   */
  return bootstrappedModules[moduleId](event, context, callback);
};

handler({
  body: null,
  headers: {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en,pt-BR;q=0.9,pt;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    Connection: 'keep-alive',
    Host: 'localhost:3000',
    'Sec-Ch-Ua':
      '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
    'X-Forwarded-Port': '3000',
    'X-Forwarded-Proto': 'http',
  },
  httpMethod: 'GET',
  isBase64Encoded: false,
  multiValueHeaders: {
    Accept: [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    ],
    'Accept-Encoding': ['gzip, deflate, br, zstd'],
    'Accept-Language': ['en,pt-BR;q=0.9,pt;q=0.8,en-GB;q=0.7,en-US;q=0.6'],
    Connection: ['keep-alive'],
    Host: ['localhost:3000'],
    'Sec-Ch-Ua': [
      '"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"',
    ],
    'Sec-Ch-Ua-Mobile': ['?0'],
    'Sec-Ch-Ua-Platform': ['"Windows"'],
    'Sec-Fetch-Dest': ['document'],
    'Sec-Fetch-Mode': ['navigate'],
    'Sec-Fetch-Site': ['none'],
    'Sec-Fetch-User': ['?1'],
    'Upgrade-Insecure-Requests': ['1'],
    'User-Agent': [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
    ],
    'X-Forwarded-Port': ['3000'],
    'X-Forwarded-Proto': ['http'],
  },
  multiValueQueryStringParameters: null,
  path: '/',
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    accountId: '123456789012',
    apiId: '1234567890',
    domainName: 'abcdef1234.localhost:3000',
    extendedRequestId: null,
    httpMethod: 'GET',
    identity: {
      accountId: null,
      apiKey: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityPoolId: null,
      sourceIp: '127.0.0.1',
      user: null,
      userAgent: 'Custom User Agent String',
      userArn: null,
    },
    path: '/',
    protocol: 'HTTP/1.1',
    requestId: '669c15cb-a35f-4b80-8daa-a300bc482339',
    requestTime: '08/Nov/2024:14:00:26 +0000',
    requestTimeEpoch: 1731074426,
    resourceId: '123456',
    resourcePath: '/',
    stage: 'Prod',
  },
  resource: '/',
  stageVariables: null,
});

export { handler };
