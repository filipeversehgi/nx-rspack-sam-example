// lambda.ts
import serverlessExpress from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

import { AppModule } from './app/app.module';

export async function bootstrap() {
  const expressApp = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp)
  );

  nestApp.enableCors();
  await nestApp.init();

  return serverlessExpress({ app: expressApp });
}
