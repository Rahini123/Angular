import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarditemComponent } from './dashboarditem.component';

describe('DashboarditemComponent', () => {
  let component: DashboarditemComponent;
  let fixture: ComponentFixture<DashboarditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboarditemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboarditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
