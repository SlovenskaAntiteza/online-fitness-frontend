import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessNewsComponent } from './fitness-news.component';

describe('FitnessNewsComponent', () => {
  let component: FitnessNewsComponent;
  let fixture: ComponentFixture<FitnessNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FitnessNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FitnessNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
