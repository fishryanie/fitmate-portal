import { Test, TestingModule } from '@nestjs/testing';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CommonController],
      providers: [CommonService],
    }).compile();
  });

  // describe('getHello', () => {
  //   it('should return "Hello World!"', () => {
  //     const commonController = app.get(CommonController);
  //     expect(commonController.getHello()).toBe('Hello World!');
  //   });
  // });

  describe('getProvince', () => {
    it('should return "List Province!"', () => {
      const appController = app.get(CommonController);
    });
  });
});
