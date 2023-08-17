import { LoggerService } from '@nestjs/common';

export class MyCustomLoggingService implements LoggerService {
  log(message: string) {
    console.log(`[Custom Logging - Log] - ${message}`);
  }

  error(message: string) {
    console.error(`[Custom Logging - Error] - ${message}`);
  }

  warn(message: string) {
    console.warn(`[Custom Logging - Warn] - ${message}`);
  }

  debug?(message: string) {
    console.debug(`[Custom Logging - Debug] - ${message}`);
  }

  verbose?(message: string) {
    console.log(`[Custom Logging - Verbose] - ${message}`);
  }
}
