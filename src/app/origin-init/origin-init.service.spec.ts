import { TestBed } from '@angular/core/testing';

import { OriginInitService } from './origin-init.service';

describe('OriginInitService', () => {
  let service: OriginInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OriginInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
