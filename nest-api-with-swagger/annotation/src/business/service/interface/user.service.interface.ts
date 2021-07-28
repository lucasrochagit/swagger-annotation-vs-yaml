import { UserModel } from '../../model/user.model';
import { IService } from './service.interface';

export type IUserService = IService<UserModel>;
