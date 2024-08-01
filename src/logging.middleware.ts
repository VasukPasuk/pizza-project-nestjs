import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Queries:', req?.query);
    console.log('Request Params:', req?.params);
    console.log('Request Body:', req?.body);
    next();
  }
}