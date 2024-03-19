import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestergeneralComponent } from './requestergeneral.component';

describe('RequestergeneralComponent', () => {
  let component: RequestergeneralComponent;
  let fixture: ComponentFixture<RequestergeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestergeneralComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestergeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
