import { IRepository } from './repository.interface';
import { UserEntity } from '../../entity/user.entity';

export type IUserRepository = IRepository<UserEntity, number>;
