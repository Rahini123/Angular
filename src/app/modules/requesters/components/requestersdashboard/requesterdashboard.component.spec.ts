import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterdashboardComponent } from './requesterdashboard.component';

describe('RequesterdashboardComponent', () => {
  let component: RequesterdashboardComponent;
  let fixture: ComponentFixture<RequesterdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequesterdashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
