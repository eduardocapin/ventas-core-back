import { Test, TestingModule } from '@nestjs/testing';
import { ReasonsRejectionService } from './reasons-rejection.service';

describe('ReasonsRejectionService', () => {
  let service: ReasonsRejectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReasonsRejectionService],
    }).compile();

    service = module.get<ReasonsRejectionService>(ReasonsRejectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
