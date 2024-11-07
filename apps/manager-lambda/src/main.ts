// lambda.ts
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// let cachedServer: Handler;

// async function bootstrap() {
//   const remoteAppModule = await import('my-nest-api');

//   if (!cachedServer) {
//     const expressApp = express();
//     const nestApp = await NestFactory.create(
//       remoteAppModule,
//       new ExpressAdapter(expressApp)
//     );

//     nestApp.enableCors();

//     await nestApp.init();

//     cachedServer = serverlessExpress({ app: expressApp });
//   }

//   return cachedServer;
// }

// export const handler = async (event: any, context: Context, callback: any) => {
//   const server = await bootstrap();
//   return server(event, context, callback);
// };

async function bootstrap() {
  console.log('Its here');
  const remoteAppModule = await import('my-nest-api');
  console.log('Its here 2');
  const app = await NestFactory.create(remoteAppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
