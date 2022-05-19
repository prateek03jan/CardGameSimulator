import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    dataService = new DataService(httpClient);
    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should test HttpClient.post', () => {
    const body: string[] = ['4T', '10S', '2C', '4H'];
    const testData: string[] = ['4T', '10S', '2C', '4H'];
    dataService
      .simulateCardGame(body, '')
      .subscribe(
        (data) => expect(data).toEqual(testData, 'should return sorted array'),
        fail
      );

    const req = httpTestingController.expectOne(dataService.SIMULATE_CARD_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'Ok',
      body: testData,
    });
    req.event(expectedResponse);
  });
});
