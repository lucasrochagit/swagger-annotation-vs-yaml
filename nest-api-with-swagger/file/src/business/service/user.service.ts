import { Injectable, NotFoundException } from '@nestjs/common'
import { UserEntity } from '../../infrastructure/entity/user.entity'
import { UserRepository } from '../../infrastructure/repository/user.repository'
import { UserModelMapper } from '../mapper/user.model.mapper'
import { UserModel } from '../model/user.model'
import { IUserService } from './interface/user.service.interface'

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly _repository: UserRepository,
    private readonly _mapper: UserModelMapper,
  ) {}

  async create(item: UserModel): Promise<UserModel> {
    const entity: UserEntity = this._mapper.deserialize(item);
    const result: UserEntity = await this._repository.create(entity);
    return this._mapper.serialize(result);
  }

  async find(): Promise<UserModel[]> {
    const result: UserEntity[] = await this._repository.find();
    return result.map((item: UserEntity) => this._mapper.serialize(item));
  }

  async findById(id: number): Promise<UserModel> {
    const exists = await this._repository.checkExists({ id });
    if (!exists) {
      throw new NotFoundException('User not found or already removed.');
    }
    const result: UserEntity = await this._repository.findById(id);
    return this._mapper.serialize(result);
  }

  async update(id: number, item: UserModel): Promise<UserModel> {
    const exists = await this._repository.checkExists({ id });
    if (!exists) {
      throw new NotFoundException('User not found or already removed.');
    }
    const entity: UserEntity = this._mapper.deserialize(item);
    const result: UserEntity = await this._repository.update(id, entity);
    return this._mapper.serialize(result);
  }

  async delete(id: number): Promise<void> {
    return this._repository.delete(id);
  }
}
