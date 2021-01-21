import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  // initialize server

  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 8080;

  app.enableCors({
    origin: 'https://eroneko.ue.r.appspot.com',
  });

  await app.listen(port);

  console.log(`Running on port ${port}`);

  // initialize firebase

  admin.initializeApp();
}
bootstrap();
