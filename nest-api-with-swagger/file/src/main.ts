import { NestFactory } from '@nestjs/core';
import { AppModule } from './ui/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'yamljs';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validate submitted data
  const document = yaml.load('./src/ui/swagger/swagger.yaml'); // read swagger documentation from file
  SwaggerModule.setup('', app, document); // setup swagger doc to run in root path
  await app.listen(PORT);
}

bootstrap();
