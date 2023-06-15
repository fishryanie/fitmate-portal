import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { join } from 'path';
import { description, name, version } from '../package.json';
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('FitMate API')
    .setDescription('The cats API description')
    .setVersion('0.0.1')
    .setContact('Phan Hồng Quân', '0979955925', 'qphanquan1998@gmail.com')
    .addTag('User', 'description')
    .build();

  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
    logger: ['error', 'warn'],
  });

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
  });
  SwaggerModule.setup('', app, document);
  // app.enableCors();

  const secondOptions = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .addTag('Swagger Documentation')
    .build();

  const dogDocument = SwaggerModule.createDocument(app, secondOptions);
  SwaggerModule.setup('', app, dogDocument);
  await app.listen(process.env.PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
