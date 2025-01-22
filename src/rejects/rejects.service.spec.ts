import { Test, TestingModule } from '@nestjs/testing';
import { RejectsService } from './rejects.service';

describe('RejectsService', () => {
  let service: RejectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectsService],
    }).compile();

    service = module.get<RejectsService>(RejectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
