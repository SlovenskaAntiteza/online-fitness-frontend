import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFitnessProgramComponent } from './new-fitness-program.component';

describe('NewFitnessProgramComponent', () => {
  let component: NewFitnessProgramComponent;
  let fixture: ComponentFixture<NewFitnessProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFitnessProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFitnessProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
