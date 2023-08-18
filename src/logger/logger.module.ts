import { Module } from '@nestjs/common';
import { MyCustomLoggingService } from './logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MyCustomLoggingService],
  exports: [MyCustomLoggingService],
})
export class LoggerModule {}
