import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FawryService } from './fawry.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FawryCallbackEvent } from './events/fawryCallback.event';

@Controller('fawry')
export class FawryController {
  constructor(
    private readonly fawryService: FawryService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  findAll() {
    return this.fawryService.getDummyPaymentLink({
      price: 20,
      merchantRefNumber: `${Math.floor(1000 + Math.random() * 9000)}`,
    });
  }
  @Get('/callback')
  callBack(@Query() query) {
    return query;
  }
  @Post('/callback')
  handleCallBack(@Body() body) {
    this.eventEmitter.emit('fawry.callback', new FawryCallbackEvent(body));
  }
}
