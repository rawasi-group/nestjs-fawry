import { Test, TestingModule } from '@nestjs/testing';
import { FawryService } from './fawry.service';

describe('FawryService', () => {
  let service: FawryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FawryService],
    }).compile();

    service = module.get<FawryService>(FawryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
