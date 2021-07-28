# Annotation vs Arquivo: o que devo usar para documentar minha API com o Swagger?

## @beforeAll

Antes de tudo, quero reiterar que esse é um documento **opinativo**, baseado nas minhas experiências com documentação de
APIs com Swagger utilizando bibliotecas que funcionam com anotações vs bibliotecas que leem um arquivo do tipo
YAML/JSON. É possível que, após a escrita desse documento, o meu ponto de vista sobre essa ferramenta mude e evolua.
Também não me considero um mestre do uso das ferramentas aqui apresentadas, e talvez a minha pouca experiência gere
algumas opiniões sejam equivocadas. Portanto, conto com o seu *feedback* construtivo para que eu possa continuar a
evoluir profissionalmente com o uso dessas ferramentas.

## 1. Introdução

O Swagger é uma ferramenta *open source* utilizada para documentar APIs REST. É possível descrever com clareza e
detalhes os endpoints da API, quais são os dados de entrada (*request bodies, headers, auth params, path params, query
params, etc*), quais são os dados de saída, bem como os *HTTP Status* que cada requisição pode gerar. Além disso, o
Swagger permite a interação com a aplicação, ou seja, é possível fazer requisições à aplicação através da documentação
Swagger, e verificar o comportamento da mesma (como se fosse a requisição do cliente).

A documentação Swagger segue a **Open API Specification (OAS)** que “que permite que humanos e computadores descubram e
entendam os recursos de um serviço sem exigir acesso ao código-fonte, documentação adicional ou inspeção do tráfego de
rede.” (*OAI — The Open API Specification*). Uma documentação bem escrita permite que o cliente compreenda com clareza
como interagir com o sistema, e o que esperar dele em todas as situações possíveis de interação com a aplicação.

Nesse documento irei abordar duas formas de documentar uma API com o Swagger: utilizando anotações e utilizando um
arquivo no formato YAML/JSON. Para isso, irei desenvolver uma simples API em *NodeJS* utilizando o *framework*
[NestJS](https://nestjs.com/) (que, a meu ver, é um dos melhores frameworks para o desenvolvimento de APIs em *NodeJS*)
com um CRUD simples de uma entidade `Usuário`. O foco não vai ser em como construir uma API em NodeJS utilizando o
NestJS, ou discutir sobre arquitetura de API, mas apenas mostrar as duas formas de documentar as APIs e qual é o meu
ponto de vista em relação a elas (prós e contras).

## 2. Construindo a API

### 2.1 O que irei utilizar

Para o desenvolvimento da API, irei utilizar:

1. IDE Webstorm
2. NodeJS + NestJS para desenvolvimento da API
3. SQLite como banco de dados

### 2.2 Iniciando a API

Para criar o projeto, basta utilizar o comando `nest new nest-api-with-swagger`. Será criado um projeto com a seguinte
estrutura:

```html
src/
    app.controller.spec.ts
    app.controller.ts
    app.module.ts
    app.service.ts
    main.ts
test/
    app.e2e-spec.ts
    jest-e2e.json
```

Após isso, irei atualizar as dependências da aplicação para as versões mais recentes.
Clique [aqui](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version) para mais informações
sobre esse procedimento.

#### 2.2.1 Estrutura do projeto

Após criar o projeto, irei remover os arquivos de teste (diretório `test` e `app.controller.spec.ts`) e remover o
diretório `.git` que é gerado automaticamente pelo `nest`. Além disso, irei adicionar os arquivos gerados
pelo `webstorm` no `gitignore` da API. Com isso, o próximo passo é reestruturar os diretórios do projeto da seguinte
forma:

```html
src/
    business/
        service/
            app.service.ts
    infrastructure/
    ui/
        controller/
            app.controller.ts
        module/
            app.module.ts
    main.ts
```

Onde:

1. `business` contém todos os arquivos relacionados à camada de `negócio` da aplicação
2. `infrastructure` contém todos os arquivos relacionados à camada de `infrastrutura` da aplicação
3. `ui` contém todos os arquivos relacionados à camada de `interface` com o cliente da aplicação

Feito isso, irei começar pela camada de `ui` da aplicação. Essa camada será estruturada da seguinte forma:

```html
src/
    ...
    ui/
        controller/
        dto/
        mapper/
        module/
```

Onde:

- controller: Diretório que contém os `controllers` da aplicação;
- dto: Diretório que contém os `data transfer objects` (ou `dto`) da camada de `interface`;
- mapper: Diretório que contém os `mappers` que irão transformar os `data transfer objects`
  em `models` da camada de `interface`,
- module: Diretório que contém todos os `modules` da camada de `interface`,

Após isso, irei implementar a camada de `business`. Essa camada será estruturada da seguinte forma:

```html
src/
    business/
        mapper/
        model/
        service/
...
```

Onde:

- mapper: Diretório que contém os `mappers` que irão transformar os `models` da camada de `negócio`
  em `entities`
- model: Diretório que contém os `models` da camada de `negócio`
- service: Diretório que contém os `services` da camada de `negócio`

Por fim, irei implementar a camada de `infrastructure`. Essa camada será estruturada da seguinte forma:

```html
src/
    ...
    infrastructure/
        entity/
        repository/
...
```

Onde:

- entity: Diretório que contém as `entities` da camada de `infraestrutura`
- repository: Diretório que contém os `repositories` da camada de `infraestrutura`

## 3. Adicionando o Swagger

Antes de adicionar o swagger, irei replicar o projeto em duas pastas distintas. Um diretório para especificar a
documentação Swagger da API por `annotations` e outro diretório para especificar a documentação Swagger da API
por `arquivo`, utilizando um arquivo de extensão `yaml`. Logo, as APIs estão estruturadas da seguinte forma:

```html
swagger-annotation-vs-yaml/
    annotation/
        src/
            ...
    file/
        src/
            ...
```

### 3.1 Adicionando o Swagger via Annotation

Para adicionar o swagger via `annotation` na API, é necessário instalar as dependências `@nestjs/swagger`
e `swagger-ui-express`. Após isso, irei iniciar as configurações do Swagger. Para isso, irei criar um arquivo
`swagger.config.ts` em `src/ui/swagger`. O arquivo terá a seguinte configuração:

```ts
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
```

Essa configuração inicial serve para indicar os parâmetros de cabeçalho da documentação, como título, descrição, termos
de serviço, entre outras informações. Após isso, no arquivo `main.ts`, irei adicionar o Swagger na aplicação da seguinte
forma:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './ui/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './ui/swagger/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe()); // validate submitted data
    const config = SwaggerConfig.api().build(); // get swagger config and build doc
    const document = SwaggerModule.createDocument(app, config); // create swagger doc with swagger module
    SwaggerModule.setup('', app, document); // setup swagger doc to run in root path
    await app.listen(3000);
}

bootstrap();
```

Em seguida, irei configurar a classe `AppController` para se comportar da seguinte forma:

```ts
import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    @Redirect('/', HttpStatus.FOUND)
    getHello() {
        const { PORT } = process.env;
        return { url: `http://localhost:${PORT}` };
    }
}
```

Ao subir a aplicação e acessar o endereço 'http://localhost:3000' resultado da documentação até então é:

![header_swagger_api_doc_with_annotation](images/header_swagger_api_doc_with_annotation.png)

Onde a rota `GET /` refere-se ao endpoint root, onde está sendo apresentado o swagger.

Feita essa configuração, irei adicionar as anotações do `UserDTO` que indicam no contexto da documentação os `schemas`.
Logo, a classe `UserDTO` irá conter a seguinte configuração:

```ts
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    Matches,
} from 'class-validator';
import {
    ApiProperty,
    ApiPropertyOptional,
    ApiResponseProperty,
} from '@nestjs/swagger';

export class UserDTO {
    @ApiPropertyOptional()
    @ApiResponseProperty()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z\s]*$/, {
        message: 'name must contain only letters and space',
    })
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @IsPositive({ message: 'age should be bigger than zero' })
    age: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z\s]*$/, {
        message: 'job must contain only letters and space',
    })
    job: string;
}
```

Por fim, irei adicionar as anotações nos endpoints do `UserController`, que indicam as *tags*, os tipos de dados
suportados pela aplicação, bem como as possíveis respostas de cada endpoint. Logo, a classe `UserController` irá conter
a seguinte configuração:

```ts
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UserModel } from '../../business/model/user.model';
import { UserService } from '../../business/service/user.service';
import { UserDTOMapper } from '../mapper/user.dto.mapper';
import {
    ApiConsumes,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiProduces,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly _service: UserService,
        private readonly _mapper: UserDTOMapper,
    ) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiCreatedResponse({ description: 'Ok', type: UserDTO })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    public async createUser(@Body() user: UserDTO): Promise<UserDTO> {
        const model: UserModel = this._mapper.deserialize(user);
        const result: UserModel = await this._service.create(model);
        return this._mapper.serialize(result);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiProduces('application/json')
    @ApiOkResponse({ description: 'Ok', type: [UserDTO] })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    public async getAllUsers(): Promise<UserDTO[]> {
        const result: UserModel[] = await this._service.find();
        return result.map((user) => this._mapper.serialize(user));
    }

    @Get('/:user_id')
    @HttpCode(HttpStatus.OK)
    @ApiProduces('application/json')
    @ApiOkResponse({ description: 'Ok', type: UserDTO, isArray: true })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    public async getUserById(@Param('user_id') id: number): Promise<UserDTO> {
        const result: UserModel = await this._service.findById(id);
        return this._mapper.serialize(result);
    }

    @Put('/:user_id')
    @HttpCode(HttpStatus.OK)
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiOkResponse({ description: 'Ok', type: UserDTO })
    @ApiNotFoundResponse({ description: 'Not Found' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    public async updateUser(@Param('user_id') id: number, @Body() user: UserDTO) {
        const model: UserModel = this._mapper.deserialize(user);
        const result: UserModel = await this._service.update(id, model);
        return this._mapper.serialize(result);
    }

    @Delete('/:user_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'No Content' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    public async deleteUser(@Param('user_id') id: number): Promise<void> {
        await this._service.delete(id);
    }
}
```

Adicione também a anotação `@ApiExcludeController` no `AppController`, para que a tag `default` com o endpoint da raiz
do projeto não apareça na documentação final do Swagger.

Ao subir novamente a aplicação e acessar o endereço `http://localhost:3000`, o resultado da documentação é:

![header_swagger_api_doc_with_annotation](images/full_swagger_api_doc_with_annotation.png)

### 3.2 Adicionando o Swagger via YAML

Para adicionar o swagger via `arquivo` na API, é necessário instalar as dependências `@nestjs/swagger`
, `swagger-ui-express` e `yamljs`. Após isso, irei iniciar as configurações do Swagger. Para escrever a documentação
Swagger em um arquivo .yaml, irei utilizar a ferramenta [Swagger Editor](https://editor.swagger.io/) para escrever a
documentação (semelhante à documentação gerada com anotação) e, em seguida, irei exportar a documentação no formato
`yaml` e adicionar no diretório `src/ui/swagger` com o nome `swagger.yaml`.

Em seguida, no arquivo `main.ts`, irei adicionar o Swagger na aplicação da seguinte forma:

```ts
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
```

Ao subir novamente a aplicação e acessar o endereço `http://localhost:3000`, o resultado da documentação é:

![header_swagger_api_doc_with_annotation](images/full_swagger_api_doc_with_file.png)


###  4. Afinal, qual é o melhor alternativa?

Do meu ponto de vista, existem alguns fatores que devem ser levados em consideração antes de escolher uma alternativa.
São eles:

1. Custo para implementação. 
2. Verbosidade.
3. Legibilidade.
4. Impacto no desempenho da aplicação.
5. Manutenibilidade.

## Referências

API - THe Open API Specification. Disponível em: https://github.com/OAI/OpenAPI-Specification.
