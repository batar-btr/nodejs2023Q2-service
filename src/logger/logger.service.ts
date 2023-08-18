import { ConsoleLogger, LoggerService, Injectable } from '@nestjs/common';
import * as path from 'node:path';

@Injectable()
export class MyCustomLoggingService implements LoggerService {
  private readonly logger = new ConsoleLogger('Custom-Logger');
  private readonly logPath: string;
  constructor() {
    this.logPath = path.join(__dirname, '..', '..', 'logs.txt');
  }

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
