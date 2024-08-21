import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { description, name, version } from '../package.json';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from 'http-exception.filter';
import { ValidationError } from 'class-validator';

const WHITE_LIST_TAGS = ['Upload File', 'Authentication', 'user', 'equipment', 'muscle', 'exercise', 'exercise-goal', 'exercise-categories'];

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
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'accessToken')
    .build();
  const document = SwaggerModule.createDocument(app, configsSwagger);
  document.paths = filterPathsByTags(document.paths, WHITE_LIST_TAGS);

  SwaggerModule.setup('', app, document, { swaggerOptions: { defaultModelsExpandDepth: -1 } });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({ credentials: true, allowedHeaders: '*', origin: '*' });
  app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
  });
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

const customExceptionFactory = (errors: ValidationError[]) => {
  const messages = errors.flatMap(error => {
    const constraints = error.constraints ? Object.values(error.constraints) : [];
    return constraints;
  });
  return new BadRequestException(messages);
};
