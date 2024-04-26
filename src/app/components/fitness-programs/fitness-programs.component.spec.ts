import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramsComponent } from './fitness-programs.component';

describe('FitnessProgramsComponent', () => {
  let component: FitnessProgramsComponent;
  let fixture: ComponentFixture<FitnessProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FitnessProgramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
