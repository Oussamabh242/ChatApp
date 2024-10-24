import { Test, TestingModule } from '@nestjs/testing';
import { FrinedshipController } from './frinedship.controller';
import { FrinedshipService } from './frinedship.service';

describe('FrinedshipController', () => {
  let controller: FrinedshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrinedshipController],
      providers: [FrinedshipService],
    }).compile();

    controller = module.get<FrinedshipController>(FrinedshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
