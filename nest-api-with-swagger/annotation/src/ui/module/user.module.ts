import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../../business/service/user.service';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UserModelMapper } from '../../business/mapper/user.model.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/entity/user.entity';
import { UserDTOMapper } from '../mapper/user.dto.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserDTOMapper, UserService, UserModelMapper, UserRepository],
})
export class UserModule {}
