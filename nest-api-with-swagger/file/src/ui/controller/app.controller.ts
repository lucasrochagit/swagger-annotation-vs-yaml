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
