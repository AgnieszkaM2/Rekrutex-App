import { TestBed } from '@angular/core/testing';

import { PytaniaTestService } from './pytania-test.service';

describe('PytaniaTestService', () => {
  let service: PytaniaTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PytaniaTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
