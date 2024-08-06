import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  private readonly envConfig: { [key: string]: string };
  private readonly logger = new Logger('Config');
  constructor() {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    } catch (e) {
      this.envConfig = process.env;
    }
    process.env = Object.assign(process.env, this.envConfig);
  }
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.envConfig.POSTGRES_HOST,
      port: parseInt(this.envConfig.POSTGRES_PORT, 10),
      username: this.envConfig.POSTGRES_USER,
      password: this.envConfig.POSTGRES_PASS,
      database: this.envConfig.POSTGRES_DB,
      synchronize: false,
      keepConnectionAlive: true,
      logging: false,
      entities: [__dirname + '/../*/entities/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
