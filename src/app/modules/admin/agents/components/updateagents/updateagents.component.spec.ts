import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateagentsComponent } from './updateagents.component';

describe('UpdateagentsComponent', () => {
  let component: UpdateagentsComponent;
  let fixture: ComponentFixture<UpdateagentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateagentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
