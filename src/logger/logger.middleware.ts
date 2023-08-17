import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyCustomLoggingService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyCustomLoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request: ${req.originalUrl}`);
    next();
  }
}
