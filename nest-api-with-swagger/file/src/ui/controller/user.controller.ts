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
} from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UserModel } from '../../business/model/user.model';
import { UserService } from '../../business/service/user.service';
import { UserDTOMapper } from '../mapper/user.dto.mapper';

@Controller('users')
export class UserController {
  constructor(
    private readonly _service: UserService,
    private readonly _mapper: UserDTOMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() user: UserDTO): Promise<UserDTO> {
    const model: UserModel = this._mapper.deserialize(user);
    const result: UserModel = await this._service.create(model);
    return this._mapper.serialize(result);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAllUsers(): Promise<UserDTO[]> {
    const result: UserModel[] = await this._service.find();
    return result.map((user) => this._mapper.serialize(user));
  }

  @Get('/:user_id')
  @HttpCode(HttpStatus.OK)
  public async getUserById(@Param('user_id') id: number): Promise<UserDTO> {
    const result: UserModel = await this._service.findById(id);
    return this._mapper.serialize(result);
  }

  @Put('/:user_id')
  @HttpCode(HttpStatus.OK)
  public async updateUser(@Param('user_id') id: number, @Body() user: UserDTO) {
    const model: UserModel = this._mapper.deserialize(user);
    const result: UserModel = await this._service.update(id, model);
    return this._mapper.serialize(result);
  }

  @Delete('/:user_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('user_id') id: number): Promise<void> {
    await this._service.delete(id);
  }
}
