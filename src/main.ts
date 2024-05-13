import session from 'express-session';
import passport from 'passport';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { description, name, version } from '../package.json';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('App');
  const configSwagger = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .setContact('Phan Hồng Quân', '0979955925', 'qphanquan1998@gmail.com')
    .addTag('Common')
    .addTag('user')
    .build();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn'],
  });

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('', app, document);
  app.enableCors({
    allowedHeaders: ['Access-Control-Allow-Origin'],
    origin: ['http://localhost:3000', 'https://soulmate-executive.web.app'],
  });
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
    logger.log('Application started on port 3000');
  });
}
bootstrap();
