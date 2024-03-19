import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterdetailComponent } from './requesterdetail.component';

describe('RequesterdetailComponent', () => {
  let component: RequesterdetailComponent;
  let fixture: ComponentFixture<RequesterdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequesterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
