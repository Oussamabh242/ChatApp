import { Test, TestingModule } from '@nestjs/testing';
import { FrinedshipService } from './frinedship.service';

describe('FrinedshipService', () => {
  let service: FrinedshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrinedshipService],
    }).compile();

    service = module.get<FrinedshipService>(FrinedshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
