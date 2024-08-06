import { BaseRepository } from 'src/core/database/base.repository';
import { CustomRepository } from 'src/core/database/typeorm-ex.decorator';
import { Client } from '../entities/client.entity';

@CustomRepository(Client)
export class ClientRepository extends BaseRepository<Client> {}
