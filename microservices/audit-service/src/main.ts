import { NestFactory } from '@nestjs/core';
import * as env from 'dotenv';

import { AppModule } from './app.module';

env.config();

async function bootstrap() {
  const PORT = process.env.PORT || 3001;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Audit service running on http://localhost:${PORT}`);
}
bootstrap();
