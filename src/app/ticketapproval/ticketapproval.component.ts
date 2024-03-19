import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticketapproval',
  templateUrl: './ticketapproval.component.html',
  styleUrls: ['./ticketapproval.component.scss']
})
export class TicketapprovalComponent implements OnInit {
  openticketlist: any;
  isloading: boolean = true;
  isLoading: boolean = true;
  _selectedColumns: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
