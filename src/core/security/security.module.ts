import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/repositories/user.repositories';
import { UserModule } from 'src/user/user.module';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { JwtAuthGuard } from './guards/jwt-guard';
const repositories = [UserRepository];
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([...repositories]),
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtAuthGuard, ConfigService],
})
export class SecurityModule {}
