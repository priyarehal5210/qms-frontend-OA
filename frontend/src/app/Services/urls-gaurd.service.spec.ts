import { TestBed } from '@angular/core/testing';

import { UrlsGaurdService } from './urls-gaurd.service';

describe('UrlsGaurdService', () => {
  let service: UrlsGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlsGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
