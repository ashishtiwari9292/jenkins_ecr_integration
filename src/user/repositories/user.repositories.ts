import { BaseRepository } from 'src/core/database/base.repository';
import { CustomRepository } from 'src/core/database/typeorm-ex.decorator';
import { User } from '../entities/user.entity';

@CustomRepository(User)
export class UserRepository extends BaseRepository<User> {}
