import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterolesComponent } from './updateroles.component';

describe('UpdaterolesComponent', () => {
  let component: UpdaterolesComponent;
  let fixture: ComponentFixture<UpdaterolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdaterolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdaterolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
