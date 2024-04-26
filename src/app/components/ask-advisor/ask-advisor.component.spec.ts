import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAdvisorComponent } from './ask-advisor.component';

describe('AskAdvisorComponent', () => {
  let component: AskAdvisorComponent;
  let fixture: ComponentFixture<AskAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AskAdvisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AskAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
