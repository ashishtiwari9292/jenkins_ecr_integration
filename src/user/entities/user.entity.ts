import { UserRoleEnum } from 'src/common/enum/user_role.enum';
import { BaseEntity } from 'src/core/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'email', length: 200, nullable: false, unique: true })
  email: string;

  @Column({ name: 'name', length: 500, nullable: false })
  name: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'role', nullable: false, default: UserRoleEnum.ADMIN })
  role: string;

  @Column({ name: 'otp', nullable: true })
  otp: number;
}
