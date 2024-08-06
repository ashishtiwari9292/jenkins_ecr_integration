import {
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<K> extends Repository<K> {
  saveData(payload) {
    return this.save(payload);
  }

  findOneData(cond: FindOptionsWhere<K>): Promise<K> {
    return this.findOne({ where: cond });
  }

  findAllData(
    cond: FindOptionsWhere<K>,
    pagination?: FindManyOptions<K> | null,
  ): Promise<[K[], number]> {
    return this.findAndCount({
      where: cond,
      ...pagination,
    });
  }

  updateData(
    cond: FindOptionsWhere<K>,
    payload: QueryDeepPartialEntity<K>,
  ): Promise<UpdateResult> {
    return this.update(cond, payload);
  }

  softDeleteModule(cond: FindOptionsWhere<K>): Promise<UpdateResult> {
    return this.softDelete(cond);
  }

  hardDelete(cond: FindOptionsWhere<K>): Promise<DeleteResult> {
    return this.delete(cond);
  }
}
