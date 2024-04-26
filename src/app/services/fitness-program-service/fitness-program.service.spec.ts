import { TestBed } from '@angular/core/testing';

import { FitnessProgramService } from './fitness-program.service';

describe('FitnessProgramService', () => {
  let service: FitnessProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
