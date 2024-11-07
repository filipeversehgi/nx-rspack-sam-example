import { APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  console.log('Hello from Lambda!');
  const { randomName } = await import('random-name');

  return {
    statusCode: 200,
    body: JSON.stringify({ hello: randomName() }),
  };
};

handler().then(console.log);
