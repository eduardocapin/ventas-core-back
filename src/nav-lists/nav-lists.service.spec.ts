import { Test, TestingModule } from '@nestjs/testing';
import { NavListsService } from './nav-lists.service';

describe('NavListsService', () => {
  let service: NavListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NavListsService],
    }).compile();

    service = module.get<NavListsService>(NavListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
