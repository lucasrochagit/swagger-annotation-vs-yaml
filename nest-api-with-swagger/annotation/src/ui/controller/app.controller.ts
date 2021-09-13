import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect()
  getHello() {
    return { url: process.env.SWAGGER_PATH };
  }
}
