import { TestBed } from '@angular/core/testing';

import { FitnessProgramsService } from './fitness-programs.service';

describe('FitnessProgramsService', () => {
  let service: FitnessProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
