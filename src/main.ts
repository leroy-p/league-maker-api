import { NestFactory } from '@nestjs/core';

import { env } from './env'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: "http://0.0.0.0:3001", credentials: true })
  await app.listen(env.server.listenPort)
}
bootstrap()
