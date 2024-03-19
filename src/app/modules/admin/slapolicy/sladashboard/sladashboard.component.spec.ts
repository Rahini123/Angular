import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SladashboardComponent } from './sladashboard.component';

describe('SladashboardComponent', () => {
  let component: SladashboardComponent;
  let fixture: ComponentFixture<SladashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SladashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SladashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
