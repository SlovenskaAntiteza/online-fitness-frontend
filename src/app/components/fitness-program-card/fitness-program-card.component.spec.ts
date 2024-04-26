import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramCardComponent } from './fitness-program-card.component';

describe('FitnessProgramCardComponent', () => {
  let component: FitnessProgramCardComponent;
  let fixture: ComponentFixture<FitnessProgramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FitnessProgramCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessProgramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
