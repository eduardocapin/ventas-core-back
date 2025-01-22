import { Test, TestingModule } from '@nestjs/testing';
import { ReasonsRejectionController } from './reasons-rejection.controller';
import { ReasonsRejectionService } from './reasons-rejection.service';

describe('ReasonsRejectionController', () => {
  let controller: ReasonsRejectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReasonsRejectionController],
      providers: [ReasonsRejectionService],
    }).compile();

    controller = module.get<ReasonsRejectionController>(ReasonsRejectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
