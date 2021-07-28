import { NestFactory } from '@nestjs/core';
import { AppModule } from './ui/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './ui/swagger/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validate submitted data
  const config = SwaggerConfig.api().build(); // get swagger config and build doc
  const document = SwaggerModule.createDocument(app, config); // create swagger doc with swagger module
  SwaggerModule.setup('', app, document); // setup swagger doc to run in root path
  await app.listen(PORT);
}

bootstrap();
