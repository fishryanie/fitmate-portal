import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });
  // app.enableCors();
  await app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
bootstrap();
