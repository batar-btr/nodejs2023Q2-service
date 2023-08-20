import 'dotenv/config';
import { ConsoleLogger, LoggerService, Injectable } from '@nestjs/common';
// import { appendFile, stat, rename, writeFile, access } from 'fs/promises';
import { appendFile } from 'fs/promises';
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
    // const { size } = await stat(this.logPath);

    // const maxSize = +this.configService.get<string>('MAX_LOGS_SIZE');

    // if (size >= maxSize) {
    //   const isExist = async (path: string) =>
    //     await access(path)
    //       .then(() => true)
    //       .catch(() => false);

    //   try {
    //     if (await isExist(this.logPath)) {
    //       await rename(
    //         this.logPath,
    //         path.join(
    //           __dirname,
    //           '..',
    //           '..',
    //           'custom-logs',
    //           `logs.${Date.now()}.txt`,
    //         ),
    //       );
    //       await writeFile(this.logPath, '');
    //     }
    //   } catch (error) {
    //     this.logger.error(error);
    //   }
    // }

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
