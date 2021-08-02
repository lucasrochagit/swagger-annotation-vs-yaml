import { BaseRepository } from './base/base.repository';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/user.repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity, number>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    readonly _repository: Repository<UserEntity>,
  ) {
    super(_repository);
  }
}
