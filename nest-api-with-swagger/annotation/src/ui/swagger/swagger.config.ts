import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfig {
  public static api(): DocumentBuilder {
    return new DocumentBuilder()
      .setTitle('NestJS API Swagger')
      .setDescription('A simple NestJS API with Swagger documentation.')
      .setVersion('v1')
      .addServer('htp://localhost:3000', 'Local Http Instance')
      .setTermsOfService('http://www.apache.org/licenses/LICENSE-2.0.html')
      .setContact(
        'Lucas Cosmo Rocha',
        'https://github.com/lucasrochagit',
        'lucascosmorocha@gmail.com',
      )
      .setLicense(
        'Apache 2.0',
        'http://www.apache.org/licenses/LICENSE-2.0.html',
      );
  }
}
