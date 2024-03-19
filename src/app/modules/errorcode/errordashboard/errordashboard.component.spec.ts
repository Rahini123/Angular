import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrordashboardComponent } from './errordashboard.component';

describe('ErrordashboardComponent', () => {
  let component: ErrordashboardComponent;
  let fixture: ComponentFixture<ErrordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrordashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
