import { IDTOMapper } from './dto.mapper.interface';
import { UserDTO } from '../../dto/user.dto';
import { UserModel } from '../../../business/model/user.model';

export type IUserDTOMapper = IDTOMapper<UserDTO, UserModel>;
