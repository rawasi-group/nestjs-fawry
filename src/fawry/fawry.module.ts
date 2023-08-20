import { Module } from '@nestjs/common';
import { FawryService } from './fawry.service';
import { FawryController } from './fawry.controller';
import { Config } from './interfaces/config';

@Module({})
export class FawryModule {
  public static register(options: Config) {
    return {
      controllers: [FawryController],
      providers: [
        { provide: FawryService, useValue: new FawryService(options) },
      ],
      module: FawryModule,
      exports: [FawryService],
    };
  }
}
