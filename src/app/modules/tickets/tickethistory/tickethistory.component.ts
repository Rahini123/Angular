import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { ViewportScroller } from "@angular/common";
import { TicketService } from '../components/ticket/ticketservice';
@Component({
  selector: 'app-tickethistory',
  templateUrl: './tickethistory.component.html',
  styleUrls: ['./tickethistory.component.scss'],
  providers: [MessageService, TicketService],
})
export class TickethistoryComponent implements OnInit {
  items: MenuItem[];

  home: MenuItem;
  showdivgeneral:boolean=true;
  htmlString = '';
  showdivuser:boolean=false;

  @ViewChild('calendar', { static: false })
  public isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  replyitems: any;
  moreitems: any;
  display: any;
  dueDates: any;
  priority: any;
  requester: any;
  bccdiv: boolean = false;
  ccdiv: boolean = false;
  replydiv: boolean = false;
  forwarddiv: boolean = false;
  pseudoReplyDiv: boolean = true;
  editTicketSidebar: boolean = false;
  calendardiv: boolean = false;
  calendarDropdowndiv: boolean = true;
  private calendar: Calendar | any;
  emailHistoryTickets:any;
  mailbody:'';
  arr:any[];

  departments: any;
  ticketedit:any;
  emailTickets : any;
  angular:any;
  breadcrumb: any;
  errorMessage:any;
  htmlData: any;
  temp:any;
  public loading = false;
  mailBody:any;
  sendreply : FormGroup;
  projectNames:any;
  constructor(
    private router: Router,
     private messageService: MessageService,
    private activatedRoute : ActivatedRoute,
    private ticketService : TicketService,
    private sanitizer : DomSanitizer,
    private fb : FormBuilder,
    private scroller: ViewportScroller,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
this.getHistoryApi();
    this.items = [
    
       
      {
        label: 'Errorcode',
        routerLink: '/dashboard/errorcode'
            },
      {
        label: 'Ticket Details',
     
      },
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.projectNames=environment.outbound_project_name;
    const res = this.activatedRoute.snapshot.params['id'];
    this.ticketService.getEmailDetailById(res)
    .subscribe((result) => {
      console.log('values are ', result.mailBody);
      this.htmlString=result.mailBody;
      console.log(this.htmlString);
      this.emailTickets = result;
    //  this.mailbody= this.emailTickets.mailBody;
    //  console.log(this.mailbody);

  
    }

    )
  }
  getHistoryApi()
  {  
    const res2 = this.activatedRoute.snapshot.params['id'];
    console.log("gethistory",res2);
    console.log("first")
    localStorage.setItem('historyValue',res2)
    console.log(localStorage.getItem("historyValue"))
    this.ticketService.getHistoryDetailById(res2)
    .subscribe((result) => {  
  
      this.emailHistoryTickets = result;
      this.emailHistoryTickets.filter((val: any) => {
   
        this.temp = this.datepipe.transform( val.createdAt, 'dd-MMM-yyyy hh:mm:ss a');
        val.createdAt = this.temp;
        console.log("value of",val.createdAt);
                      });
    
  
    }
    )
  }
}
