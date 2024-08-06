import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ClientModule } from 'src/client/client.module';
import { ConfigService } from 'src/config/config.service';
import { UserModule } from 'src/user/user.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigService,
    }),

    AuthModule,
    UserModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
