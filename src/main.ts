import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { description, name, version } from '../package.json';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from 'http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });
  const logger = new Logger('App');
  const configsSwagger = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .setContact('Phan Hồng Quân', '0979955925', 'qphanquan1998@gmail.com')
    .build();
  const WHITE_LIST_TAGS = ['equipment', 'exercise', 'exercise-goal', 'exercise-categories'];
  const document = SwaggerModule.createDocument(app, configsSwagger);
  document.paths = filterPathsByTags(document.paths, WHITE_LIST_TAGS);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
    logger.log('Application started on port 3000');
  });
}
bootstrap();

function filterPathsByTags(paths: Record<string, any>, whitelist: string[]): Record<string, any> {
  return Object.keys(paths).reduce((filteredPaths, path) => {
    const methods = paths[path];
    const filteredMethods = Object.keys(methods).reduce((methodAcc, method) => {
      const operation = methods[method];
      const tags = operation.tags || [];
      if (tags.some(tag => whitelist.includes(tag))) {
        methodAcc[method] = operation;
      }
      return methodAcc;
    }, {} as Record<string, any>);
    if (Object.keys(filteredMethods).length > 0) {
      filteredPaths[path] = filteredMethods;
    }
    return filteredPaths;
  }, {} as Record<string, any>);
}
