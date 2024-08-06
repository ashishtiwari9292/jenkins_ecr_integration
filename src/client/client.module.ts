import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/core/database/typeorm-ex.module';
import { UserRepository } from 'src/user/repositories/user.repositories';
import { ClientController } from './controllers/client.controller';
import { ClientRepository } from './repositories/client.repository';
import { ClientService } from './services/client.service';

const repositories = [UserRepository, ClientRepository];
@Module({
  imports: [TypeOrmExModule.forCustomRepository(repositories)],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
