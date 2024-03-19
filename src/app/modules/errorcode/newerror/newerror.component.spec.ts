import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewErrorCodeComponend } from './newerror.component';

describe('NewerrorComponent', () => {
  let component: NewErrorCodeComponend;
  let fixture: ComponentFixture<NewErrorCodeComponend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewErrorCodeComponend ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewErrorCodeComponend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
