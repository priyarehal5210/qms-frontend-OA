import { TestBed } from '@angular/core/testing';

import { AfterAuthGaurdService } from './after-auth-gaurd.service';

describe('AfterAuthGaurdService', () => {
  let service: AfterAuthGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterAuthGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
