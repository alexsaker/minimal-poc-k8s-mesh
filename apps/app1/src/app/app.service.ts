import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Timestamp } from '@skyview/shared';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getData(): { message: string } {
    return { message: 'Welcome to app1!' };
  }
  getTimestamp(): Observable<Timestamp | Error> {
    const url = `http://${
      process.env.CONTAINERIZED_ENV ? 'app2' : 'localhost'
    }:${process.env.PORT_APP2}/api/app2/timestamp`;
    return this.httpService.get(url).pipe(
      map((res) => res.data),
      catchError((err) => of(err))
    );
  }
}
