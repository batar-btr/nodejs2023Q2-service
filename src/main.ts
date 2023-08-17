import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const logger = new Logger('BOOT-STRAAAAP');

  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = load(
    readFileSync(join(__dirname, '..', 'doc/api.yaml'), 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, config);

  await app.listen(PORT);
  logger.log('App listen on port 4000');
}
bootstrap();
