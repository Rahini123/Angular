import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaincidentComponent } from './slaincident.component';

describe('SlaincidentComponent', () => {
  let component: SlaincidentComponent;
  let fixture: ComponentFixture<SlaincidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaincidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaincidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
