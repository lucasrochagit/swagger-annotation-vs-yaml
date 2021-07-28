import { IUserDTOMapper } from './interface/user.dto.mapper.interface';
import { UserDTO } from '../dto/user.dto';
import { UserModel } from '../../business/model/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDTOMapper implements IUserDTOMapper {
  deserialize(item: UserDTO): UserModel {
    const result: UserModel = new UserModel();
    if (item.name) result.name = item.name;
    if (item.age) result.age = item.age;
    if (item.job) result.job = item.job;
    return result;
  }

  serialize(item: UserModel): UserDTO {
    const result: UserDTO = new UserDTO();
    if (item.id) result.id = item.id;
    if (item.name) result.name = item.name;
    if (item.age) result.age = item.age;
    if (item.job) result.job = item.job;
    return result;
  }
}
