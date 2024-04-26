import { TestBed } from '@angular/core/testing';

import { MyProgramsService } from './my-programs.service';

describe('MyProgramsService', () => {
  let service: MyProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
