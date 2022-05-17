import { NestFactory } from '@nestjs/core';

import { env } from './env'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: env.client.url, credentials: true })
  await app.listen(env.server.listenPort)
}
bootstrap()
