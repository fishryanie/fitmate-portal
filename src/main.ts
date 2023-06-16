import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { description, name, version } from '../package.json';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const configSwagger = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .setContact('Phan Hồng Quân', '0979955925', 'qphanquan1998@gmail.com')
    .addTag('common')
    .addTag('user')
    .build();

  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
    logger: ['error', 'warn'],
  });

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('', app, document);
  // app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
