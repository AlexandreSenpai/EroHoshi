import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';

async function bootstrap() {
  // initialize server

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // initialize firebase

  admin.initializeApp();
}
bootstrap();
