import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyCustomLoggingService } from './logger.service';
import createRequestLog from './utils/createRequestLog';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyCustomLoggingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const log = createRequestLog(req);

    this.logger.log(log);

    res.on('finish', async () => {
      const resLog = `Response: status code - ${res.statusCode}\n`;
      this.logger.log(resLog);
    });

    next();
  }
}
