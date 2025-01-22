import { Test, TestingModule } from '@nestjs/testing';
import { NavListsController } from './nav-lists.controller';
import { NavListsService } from './nav-lists.service';

describe('NavListsController', () => {
  let controller: NavListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavListsController],
      providers: [NavListsService],
    }).compile();

    controller = module.get<NavListsController>(NavListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
