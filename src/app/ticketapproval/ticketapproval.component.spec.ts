import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketapprovalComponent } from './ticketapproval.component';

describe('TicketapprovalComponent', () => {
  let component: TicketapprovalComponent;
  let fixture: ComponentFixture<TicketapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
