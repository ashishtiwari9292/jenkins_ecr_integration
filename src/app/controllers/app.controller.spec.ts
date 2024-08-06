import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../services/app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Server is up and running!"', () => {
      expect(appController.getHello()).toBe('Server is up and running!');
    });
  });
});
