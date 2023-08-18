import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyCustomLoggingService } from './logger.service';
import { appendFile } from 'node:fs/promises';
import * as path from 'node:path';
import createRequestLog from './utils/createRequestLog';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyCustomLoggingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const log = createRequestLog(req);

    const loggerFilePath = path.join(__dirname, '..', '..', 'logs.txt');

    await appendFile(loggerFilePath, log);

    this.logger.log(log);

    res.on('finish', async () => {
      const resLog = `Response: status code - ${res.statusCode}\n`;
      this.logger.log(resLog);
      await appendFile(loggerFilePath, resLog);
    });

    next();
  }
}
