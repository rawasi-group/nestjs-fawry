import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FawryModule } from './fawry/fawry.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    FawryModule.register({
      merchantCode: process.env.FAWRY_MERCHANT_CODE, //such as 'false'
      fawryV2CheckoutPreview: process.env.FAWRY_V2_CHECKOUT_RETURN_URL,
      productId: process.env.FAWRY_PRODUCT_ID,
      secureHashKey: process.env.FAWRY_SECURITY_KEY,
      hostURL: process.env.FAWRY_BASE_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
