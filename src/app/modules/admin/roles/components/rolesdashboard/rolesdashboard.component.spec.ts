import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesdashboardComponent } from './rolesdashboard.component';

describe('RolesdashboardComponent', () => {
  let component: RolesdashboardComponent;
  let fixture: ComponentFixture<RolesdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
