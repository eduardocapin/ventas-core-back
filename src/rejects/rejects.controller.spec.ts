import { Test, TestingModule } from '@nestjs/testing';
import { RejectsController } from './rejects.controller';
import { RejectsService } from './rejects.service';

describe('RejectsController', () => {
  let controller: RejectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectsController],
      providers: [RejectsService],
    }).compile();

    controller = module.get<RejectsController>(RejectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
