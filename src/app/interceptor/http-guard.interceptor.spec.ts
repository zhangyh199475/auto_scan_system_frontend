import { TestBed } from '@angular/core/testing';

import { HttpGuardInterceptor } from './http-guard.interceptor';

describe('HttpGuardInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpGuardInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpGuardInterceptor = TestBed.inject(HttpGuardInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
