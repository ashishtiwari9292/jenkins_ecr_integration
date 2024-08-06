import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(
    ['/api-docs', '/api-docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Admin Portal Apis')
    .setDescription('Admin Portal API swagger docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
