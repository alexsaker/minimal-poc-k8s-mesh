import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { HttpService, HttpModule } from '@nestjs/common';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 1000,
          maxRedirects: 5,
        }),
      ],
      providers: [
        HttpService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: 'token',
        },
        AppService,
      ],
    }).compile();
    const result: AxiosResponse = {
      data: {},
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    };
    const httpService = app.get(HttpService);
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to app1!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to app1!' });
    });
  });
});
