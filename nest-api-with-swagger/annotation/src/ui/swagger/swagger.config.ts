import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  public static api(): DocumentBuilder {
    return new DocumentBuilder()
      .setTitle('NestJS API Swagger')
      .setDescription(
        'A simple NestJS API with Swagger documentation.',
      )
      .setVersion('v1')
      .addServer('htp://localhost:3000', 'Local Http Instance')
      .setTermsOfService(
        'https://github.com/lucasrochagit/nest-base-api/blob/main/LICENSE',
      )
      .setContact(
        'Lucas Cosmo Rocha',
        'https://github.com/lucasrochagit',
        'lucascosmorocha@gmail.com',
      )
      .setLicense(
        'Apache 2.0',
        'https://github.com/lucasrochagit/spring-base-api/blob/main/LICENSE',
      );
  }
}
