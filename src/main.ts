/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';
import * as compression from 'compression';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  app.use(compression());

  const options = new DocumentBuilder()
      .setTitle('Petshop API')
      .setDescription('API de um curso')
      .setVersion('1.0.0')
      .addTag('petshop')
      .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
