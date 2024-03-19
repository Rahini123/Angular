import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrequesterComponent } from './newrequester.component';

describe('NewrequesterComponent', () => {
  let component: NewrequesterComponent;
  let fixture: ComponentFixture<NewrequesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewrequesterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
