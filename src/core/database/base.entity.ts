import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
    name: 'updated_at',
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
  })
  public deletedAt: Date | null;
}
