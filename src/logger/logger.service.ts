import { ConsoleLogger, LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class MyCustomLoggingService implements LoggerService {
  private readonly logger = new ConsoleLogger('Custom-Logger');

  log(message: string) {
    this.logger.log(`[Custom Log] - ${message}`);
  }

  error(message: string) {
    this.logger.error(`[Custom Error] - ${message}`);
  }

  warn(message: string) {
    this.logger.warn(`[Custom Warn] - ${message}`);
  }

  debug?(message: string) {
    this.logger.debug(`[Custom Debug] - ${message}`);
  }

  verbose?(message: string) {
    this.logger.verbose(`[Custom Verbose] - ${message}`);
  }
}
