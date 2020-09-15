import { Injectable } from '@nestjs/common';
import { Timestamp } from '@skyview/shared';
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to app2!' };
  }
  getTimestamp(): Timestamp {
    return { timestamp: new Date().getTime() };
  }
}
