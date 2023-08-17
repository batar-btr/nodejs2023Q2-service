import { Module } from '@nestjs/common';
import { MyCustomLoggingService } from './logger.service';

@Module({
  providers: [MyCustomLoggingService],
  exports: [MyCustomLoggingService],
})
export class LoggerModule {}
