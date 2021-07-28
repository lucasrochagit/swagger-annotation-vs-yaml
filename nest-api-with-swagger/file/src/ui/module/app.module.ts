import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.database/e-gate-db.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
