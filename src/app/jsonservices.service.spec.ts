import { TestBed } from '@angular/core/testing';

import { JsonservicesService } from './jsonservices.service';

describe('JsonservicesService', () => {
  let service: JsonservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
