import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from 'src/auth/services/bcrypt.service';
import { TypeOrmExModule } from 'src/core/database/typeorm-ex.module';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repositories';
import { UserService } from './services/user/user.service';

const repositories = [UserRepository];
@Module({
  imports: [
    PassportModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
  controllers: [UserController],
  providers: [UserService, BcryptService],
  exports: [UserService],
})
export class UserModule {}
