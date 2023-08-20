import { Test, TestingModule } from '@nestjs/testing';
import { FawryController } from './fawry.controller';
import { FawryService } from './fawry.service';

describe('FawryController', () => {
  let controller: FawryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FawryController],
      providers: [FawryService],
    }).compile();

    controller = module.get<FawryController>(FawryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
