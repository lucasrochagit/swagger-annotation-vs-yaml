import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect('/', HttpStatus.FOUND)
  getHello() {
    const { PORT } = process.env;
    return { url: `http://localhost:${PORT}` };
  }
}
