import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlapolicyComponent } from './slapolicy.component';

describe('SlapolicyComponent', () => {
  let component: SlapolicyComponent;
  let fixture: ComponentFixture<SlapolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlapolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlapolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
