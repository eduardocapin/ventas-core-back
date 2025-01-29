import { Injectable, NestMiddleware } from '@nestjs/common';
import * as compression from 'compression';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
  private readonly compression = compression({
    level: 6, 
    threshold: 1024, 
  });

  use(req: any, res: any, next: any) {
    this.compression(req, res, next);
  }
}
