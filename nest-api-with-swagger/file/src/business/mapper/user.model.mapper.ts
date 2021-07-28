import { UserModel } from '../model/user.model';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../infrastructure/entity/user.entity';
import { IUserModelMapper } from './interface/user.model.mapper.interface';

@Injectable()
export class UserModelMapper implements IUserModelMapper {
  deserialize(item: UserModel): UserEntity {
    const result: UserEntity = new UserEntity();
    if (item.name) result.name = item.name;
    if (item.age) result.age = item.age;
    if (item.job) result.job = item.job;
    return result;
  }

  serialize(item: UserEntity): UserModel {
    const result: UserModel = new UserModel();
    if (item.id) result.id = item.id;
    if (item.name) result.name = item.name;
    if (item.age) result.age = item.age;
    if (item.job) result.job = item.job;
    return result;
  }
}
