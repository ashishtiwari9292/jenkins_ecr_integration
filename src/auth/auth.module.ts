import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmExModule } from 'src/core/database/typeorm-ex.module';
import { UserRepository } from 'src/user/repositories/user.repositories';

import { SesService } from 'src/aws/ses.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/bcrypt.service';

const repositories = [UserRepository];

@Module({
  imports: [TypeOrmExModule.forCustomRepository([...repositories])],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JwtService, SesService],
})
export class AuthModule {}
