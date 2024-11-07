import { APIGatewayProxyResult } from 'aws-lambda';

const handler = async (): Promise<APIGatewayProxyResult> => {
  console.log('Hello from Lambda!');
  const { randomName } = await import('random-name');

  // try {
  //   const { randomName } = await import('random-name');
  //   console.log('Random name!', randomName());

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ hello: randomName() }),
  //   };
  // } catch (err) {
  //   console.log(err);

  //   return {
  //     statusCode: 500,
  //     body: 'Error!',
  //   };
  // }

  return {
    statusCode: 200,
    body: randomName(),
  };
};

export { handler };
