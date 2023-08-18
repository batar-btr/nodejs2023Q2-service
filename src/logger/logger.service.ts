import 'dotenv/config';
import { ConsoleLogger, LoggerService, Injectable } from '@nestjs/common';
import { appendFile, stat, rename } from 'fs/promises';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyCustomLoggingService implements LoggerService {
  private readonly logger = new ConsoleLogger('Custom-Logger');
  private readonly logPath: string;
  private readonly errorPath: string;

  constructor(private configService: ConfigService) {
    this.logPath = path.join(__dirname, '..', '..', 'custom-logs', 'logs.txt');
    this.errorPath = path.join(
      __dirname,
      '..',
      '..',
      'custom-logs',
      'errors.txt',
    );
  }

  async log(message: string) {
    this.logger.log(`[Custom Log] - ${message}`);
    const { size } = await stat(this.logPath);

    const maxSize = this.configService.get<string>('MAX_LOGS_SIZE');

    console.log(size);
    console.log(maxSize);

    await appendFile(this.logPath, message);
  }

  async error(message: string) {
    this.logger.error(`[Custom Error] - ${message}`);
    await appendFile(this.errorPath, message);
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
