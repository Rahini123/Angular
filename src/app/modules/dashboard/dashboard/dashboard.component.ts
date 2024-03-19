import { DashboardService } from './dashboard.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Source } from 'postcss';
import { SouceService } from '../../services/souce.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { TicketdashboardComponent } from '../../ticketdashboard/ticketdashboard.component';
import { TicketService } from '../../tickets/components/ticket/ticketservice';
import { DatePipe } from '@angular/common';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AgentgroupService } from '../../admin/groups/services/agentgroup.service';

import { errorcodeservice } from '../../errorcode/errorcodeservice';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService,
    MessageService,
    ConfirmationService,
    TicketService,
    errorcodeservice,

  ],
})
export class DashboardComponent implements OnInit {
  @ViewChild('opMenu') op: OverlayPanel | any;
  tickets: any;
  _selectedColumns: any;
  selectedTickets: any;
  items: any;
  statustxt: any;
  approvalprocess_group:any;
  opPanel: any;
  Listboxstatus: any;
  openticketsct: any;
  openticketsbyrolespro: any;
  openticketsbyrolesprogroup: any;
  emailTickets: any;
  isloading: boolean = true;
  cols: any;
  selectedvalue: any;
  url:any;
  emitValue: any;
  groupTickets: any;
  file: any;
  tkcount: any;
  tkcountopen: any;
  projectlabel:any;
  tkcountclose: any;
  tkcountassign: any;
  tkcountunassign: any;
  openallproject: any;
  openallprojectbygroup: any;
  groupwiseprojectcount: any;
  isLoading: boolean = true;
  temval: any;
  approvalprocess:any;
  showMsg: boolean = true;
  resolvedtick:any;
  display: boolean = false;
  displaychart: boolean = false;
  displayclick: boolean = false;
  displaytable: boolean = false;
  displaytableclosed: boolean = false;
  displaytableassigned: boolean = false;
  displaytableunassigned: boolean = false;
  legendlabelsgroupwise_role:boolean=false;
  tkcountopenno: any;
  legendlabels:boolean=false;
  tkcountcloseno: any;
  tkcountassignno: any;
  tkcountunassignno: any;
  data: any;
  datavalue: any;
  Listboxprojectname: any;
  status: any;
  actualtarget: any;
  openTicketscount: any;
  closeTicketscount: any;
  assignedTicketscount: any;
  unassignedTicketscount: any;
  wipTicketscount: any;
  projectLOV: any;
  TicketDialog: boolean = false;
  ticket: any;
  projectid: any;
  groupid: any;
  tkonhold: any;
  valuess: '';
  chartOptions: any;
  chartOption: any;
  serviceopenticket: any;
  errorMessage: any;
  openTickets: any;
  subscription: Subscription;
  valueupdate: any;
  temp1: any;
  arr: number[] = [];
  openticketlist: any;
  temp: any;
  statusitems: any;
  groups: any;
  approvallength:any;
  approvallength_group:any;
  open: any;
  close: any;

  cars: number[] = [];
resolvedcount:any;
tkresolved:any;
tkresolvedno:any;
tkcustomerresolved:any;
  colss: any[];
  assigned: any;
  unassigned: any;
  closed: any;
  opentickets: any;
  home: any;
  legendlabelsgroupwise:boolean=false;
  emailPlaceholderText = ' Project Name';
  groupPlaceholderText = 'Group Name';
  listCategory: any;
  basicData: any;
  errorForm: any;
  projectCategoryId: any;
  groupagentId: any;
  displayclickopen: any;
  displayclickwip: any;
  displayclickclose: any;
  displayclickunassigned: any;
  displayclickassigned: any;
  projectidtk: any;
  onholdTicketscount: any;
  customerTicketscount: any;
  onholdTick: any;
  groupname: any;
  showprojectsec: boolean = false;
  proproject: boolean = false;
  progroup: boolean = false;
  tkcountwip: any;
  tkwip: any
  showgroupsec: boolean = false;
  openTick: any;
  tkCountonhold: any;
  closeTick: any;
  assignedTick: any;
  tkCustomerwork: any;
  tkcustomer: any;
  unassignedTick: any;
  wipTick: any;
  displayclickcustomer: any;
  displaydropdown: boolean = false;
  displayproject: boolean = false;
  displaygroup: boolean = false;
  subject = new Subject<any>();
  userName: any;
  displayclickonhold: any;
  opencount: any;
  closecount: any;
  
  role: any;
  assigncount: any;
  progressbar:any;
  unassigncount: any;
  customerTick: any;
  arropen: number[] = [];
  arrclose: number[] = [];
  arrassign: number[] = [];
  arrunassign: number[] = [];
  arrdash: number[] = [];
  projectname:any;
  groupbased: any;
  constructor(
    activeRoute: ActivatedRoute,
    private roleService: errorcodeservice,
    private router: Router,
    private messageService: MessageService,
    private ticketService: TicketService,
    private datepipe: DatePipe,
    private shareservice: AuthService,
    private DashboardService: DashboardService,
    private groupService: AgentgroupService,


  ) { }
  ngAfterViewInit(): void {
    // this.ticketService.getTickets().then((data) => (this.tickets = data));
    // this.ticketService.getListOfEmails().subscribe((data)=> (this.tickets = data));
    this.getListOfEmail_select();
    this.getListOfGroup_select();
    this.getBusinessFunctionLOV();
    this.getListOfEmail();
    this.getLiistofGroup();
    this.getgroupbasedproject();

    if (this.role === 'ROLE_Group') {
      this.getLiistofGroup();
    }

  }
  ngOnInit(): void {
    this.getgroupbasedproject();

    this.progroup = false;
    this.proproject = false;
    
    this.displaydropdown = false;
    this.showprojectsec = false;
    this.displayproject = false;
    this.userName = 'userlogin';
    this.showgroupsec = false;
    this.projectidtk = this.shareservice.getprojectid();
    this.projectname=this.shareservice.getprojectName();
    console.log("ticket screen", this.projectidtk);
    this.groupname = this.shareservice.getgroupname();
    console.log(this.groupname);
    this.role = this.shareservice.getrole();
    console.log(this.role);
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.displaydropdown = true;
      this.showprojectsec = true;
      this.showgroupsec = true;
    }
    else if (this.role === 'ROLE_USER' || this.role == 'ROLE_SUPERAGENT') {
     
      //project wise bsed on login project id
      this.proproject = true;
      console.log("roleuser",this.proproject);
      this.openstatuscountbyroles();
  
      this.progroup = false;
      this.displayproject = true;
      this.displaygroup = false;
      this.displaydropdown = false;
      this.displaychart = true;

      this.dashboardStatusbyprojectwise();
      this.arr.length = 0;
      this.approvalproccess_projectbased();
    } else if (this.role === 'ROLE_AGENT' || this.role == 'ROLE_GROUP') {
      //project wise bsed on login group based project id
      this.opengroupstatuscountbyroles();
      this.proproject = false;
      this.progroup = true;
      this.displayproject = false;
      this.displaygroup = true;
      this.displaydropdown = false;
      this.displaychart = true;
      this.dashboardStatusbygroupwise();
      this.approvalproccess_group_groupbased();
      this.arrdash.length = 0;
    }


    this.displaytable = true;
    this.displayclick = true;
    this.displaytableclosed = false;
    this.displaytableassigned = false;
    this.displaytableunassigned = false;

    this.getProjectLOV();
    this.getListOfEmail_select();
    this.ticketService.getListOfGroups().subscribe((result) => {
      console.log(' values of tickets getListOfGroups', result);
      this.groupTickets = result;
      this.isloading = false;
    });
    this.colss = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
    this.statusitems = [

      { statusitems: 'Assigned' },
      { statusitems: 'WIP' },
      { statusitems: 'On hold' },
      { statusitems: 'Customer Working' },
      { statusitems: 'Closed' },
      { statusitems: 'Duplicate' },
      { statusitems: 'Resolved' },
    ];
    this.cols = [

      { field: 'tempDate', header: 'Created Date' },
      { field: 'from_Address', header: 'Requestors' },
      { field: 'subject', header: 'Issue Description' },
      { field: 'ticketNo', header: 'TicketNo' },
      { field: 'groupName', header: 'Group' },
      { field: 'clientClosedDate', header: 'Closed Date' },
      { field: 'status', header: 'Status' },
      { field: 'slaResponseStatus', header: 'First Response Status' },
      { field: 'firstResponseDate', header: 'First Response Time ' },
      { field: 'slaResolveStatus', header: 'SLAResolveStatus' },
      
    ];
    this._selectedColumns = [
      { field: 'tempDate', header: 'Created Date' },
      { field: 'from_Address', header: 'Requestors' },
      { field: 'subject', header: 'Issue Description' },
      { field: 'ticketNo', header: 'Ticket No' },
      { field: 'groupName', header: 'Group' },
      { field: 'clientClosedDate', header: 'Closed Date' },
    ];
    this.items = [

      {
        label: 'Dashboard',
       // routerLink: '/dashboard/tickets'
      },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem' };



  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) =>
      val.includes(col)
    );

  }
  onLogin(user: string) {
    this.userName = user;
  }

  menuClick(e: any) {
    console.log(e);
    // this.menuItemDisplay = true;
    this.op.show(e, this.actualtarget);
  }
  disableRefresh() {
    window.onbeforeunload = function () {
      return false;
    };
  }


//rolebasec
approvalproccess_projectbased()
{
  this.openTickets="Waiting for Approval"
  this.ticketService.getListOfAproval(this.projectname, this.openTickets).subscribe((res) => {
 
    this.isLoading = false;
    this.approvalprocess = res;
    console.log("approval legth",this.approvalprocess.length);
    console.log("this approval part", this.approvalprocess);
    this.approvallength=this.approvalprocess.length;
    console.log("this approval part", this.approvallength);


  })
}

  approvalproccess()
  {
    this.openTickets="Waiting for Approval";
    this.ticketService.getListOfAproval(this.projectlabel, this.openTickets).subscribe((res) => {
   
      this.isLoading = false;
      this.approvalprocess = res;
    
      console.log("this approval part", this.approvalprocess);
      this.approvallength=this.approvalprocess.length;
      console.log("approval legth project",this.approvalprocess.length);

    })
  }
  approvalproccess_group_groupbased()
  {
    this.openTickets="Waiting for Approval"
    this.ticketService.getTicketsForApprovalGroup(this.projectname,this.openTickets,this.groupname).subscribe((res) => {
   
      this.isLoading = false;
      this.approvalprocess_group= res;
      console.log("approval legth group",this.approvalprocess_group.length);
 
      this.approvallength_group=this.approvalprocess_group.length;
      console.log("this approval part group", this.approvallength_group);


    })
  }
  approvalproccess_group()
  {
    this.openTickets="Waiting for Approval"
    this.ticketService.getTicketsForApprovalGroup(this.projectlabel,this.openTickets,this.groupagentId).subscribe((res) => {
   
      this.isLoading = false;
      this.approvalprocess_group= res;
      console.log("approval legth group",this.approvalprocess_group.length);
      console.log("this approval part group", this.approvalprocess);
      this.approvallength_group=this.approvalprocess_group.length;


    })
  }
  onChangeliststatus(ticket: any, newValue: any) {
    this.Listboxstatus = newValue.statusitems;
    this.ticket = { ...ticket };
    console.log("values of tickets are ", this.ticket);
    console.log("onchange", this.ticket.subject);
    console.log("listbox", this.Listboxstatus);

    let changestatuspayload = {
      ticketNo: ticket.ticketNo,
      status: this.Listboxstatus
    }

    this.ticketService.activeStatus(changestatuspayload).subscribe(
      {
        next: (val: any) => {

          console.log("value outside", val);
          console.log(changestatuspayload.status);
          if (changestatuspayload.status == 'Resolved') {
            this.TicketDialog = true;
            console.log("onchange", this.ticket.subject);
            this.errorForm.setValue(
              {
                error_code: changestatuspayload.ticketNo,
                error_name: this.ticket.subject,
                error_description: ''
              })
          } else {
            this.messageService.add({ severity: 'success', summary: 'save', detail: `${ticket.ticketNo} Status changed to ${ticket.status} `, life: 3000 });
            this.ngAfterViewInit();
          }

        },

        error: (err: any) => {
          this.isLoading = false;
          this.messageService.add({ severity: 'warn', summary: 'error', detail: 'Failed to Active User', life: 3000 });
          this.ngAfterViewInit();

        }


      })
  }




  onChange(event: any,label:any) {
    // console.log('event :' + event);
    this.progroup = false;
    this.proproject = true;
    this.projectCategoryId = event.value;
    this.projectlabel=label;
    console.log("Project name", this.projectCategoryId);
    console.log("projectlabel",label);
  if(this.projectCategoryId===null)
  {
 
  this.displaychart = false;
  this.ngAfterViewInit();
  }
  else{
  
    this.displaychart = true;
    this.displayproject = true;
    this.displaygroup = false;
    this.getgroupbasedproject();
    this.dashboardStatusby();
    this.arr.length = 0;
    this.openstatuscount();
    this.approvalproccess();
  }
  }
  onChange1(event: any) {
    // console.log('event :' + event);
    this.progroup = true;
    this.proproject = false;
    this.groupagentId = event.value;
if( this.groupagentId ===null)
{

this.proproject=true;
this.progroup=false;
this.displaygroup=false;
this.displayproject=true;
this.arrdash.length=0;
this.legendlabelsgroupwise=false;
this.legendlabels=true;
this.arr.length = 0;
this.dashboardStatusby();
this.approvalproccess();

}else{
    this.legendlabelsgroupwise=true;
    this.legendlabels=false;
    this.displaychart = true;

    console.log("group name", this.groupagentId);

    this.dashboardStatusbyprojectgroupwise();
    this.arrdash.length = 0;

    this.displayclickopen = true;
    this.displayclickclose = true;
    this.displayclickunassigned = true;
    this.displayclickassigned = true;
    this.displayproject = false;
    this.displaygroup = true;
    this.opengroupstatuscount();
    this.approvalproccess();
    this.approvalproccess_group();
}
  }
  getgroupbasedproject() {
    this.ticketService.getgroupbasedproject(this.projectCategoryId).subscribe((res) => {

      this.groupbased = res;
      console.log("groupbased", this.groupbased);

    });
  }
  getListOfEmail() {
    this.ticketService.getListOfEmails(this.projectCategoryId).subscribe((res) => {

      this.tickets = res;
      console.log(this.tickets);

      const values = this.tickets.values();
    });
  }
  getLiistofGroup() {
    this.ticketService.getListOfGroup(this.projectCategoryId).subscribe((res) => {
      this.ngOnInit();
      this.isLoading = false;
      this.groups = res;
      console.log("this groups", this.groups);


    })
  }
  //groupwise
  openticket() {
    this.opentickets = 'Open';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]));
      window.open(this.url, '_blank');
    //  this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]);
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]));  
       window.open(this.url, '_blank');
     // this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]);
    }
  }

  closedticket() {
    this.opentickets = 'Closed';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]));
      window.open(this.url, '_blank');
    //  this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]);
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]));  
      window.open(this.url, '_blank');
     // this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]);
    }
  }

  assignedticket() {
    this.opentickets = 'Assigned';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]));
      window.open(this.url, '_blank');
      //this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]);
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]));  
      window.open(this.url, '_blank');
      //this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]);
    }
  }

  unassignedticket() {
    this.opentickets = 'UnAssigned';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]));
      window.open(this.url, '_blank');
     // this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets, this.groupagentId]);
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]));  
      window.open(this.url, '_blank');
     // this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets, this.groupname]);
    }
  }
  approvalredirect_group()
  {
    this.opentickets = 'Waiting for Approval';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectlabel, this.opentickets, this.groupagentId]));
      window.open(this.url, '_blank');
    //  this.router.navigate(['/dashboard/ticketdashboard', this.projectlabel,this.opentickets,this.groupagentId]);
    }else{
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectname, this.opentickets, this.groupname]));
      window.open(this.url, '_blank');
      //this.router.navigate(['/dashboard/ticketdashboard', this.projectname, this.opentickets, this.groupname]);
    }
   
  }

  //projectwise
  openticketproj() {
    this.opentickets = 'Open';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      // alert("opentickets");
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]));
   
      window.open(this.url, '_blank');
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets]));
      window.open(this.url, '_blank');
    }
  }


  closedticketproj() {
    this.opentickets = 'Closed';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]))
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]);
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets]));
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets]);
    }

  }
  assignedticketproj() {
    this.opentickets = 'Assigned';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
     // this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]);
     this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]));
   
     window.open(this.url, '_blank');
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets]));
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets]);
    }

  }

  unassignedticketproj() {
    this.opentickets = 'UnAssigned';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]));
   
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectCategoryId, this.opentickets]);
    } else {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectidtk, this.opentickets]));
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectidtk, this.opentickets]);
    }

  }

  approvalredirect()
  {
    this.opentickets = 'Waiting for Approval';
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_PMO') {
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectlabel, this.opentickets]));
   
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectlabel,this.opentickets]);
    }else{
      this.url=this.router.serializeUrl(this.router.createUrlTree(['TicketManager/dashboard/ticketdashboard', this.projectname, this.opentickets]));
      window.open(this.url, '_blank');
      // this.router.navigate(['/dashboard/ticketdashboard', this.projectname,this.opentickets]);
    }

  }
 
  saveErrors() {
    this.roleService.createErrorCode(this.errorForm.value).subscribe(
      {
        next: (value: any) => {
          if (value === null) {
            this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Suceess', detail: 'Error Code Created Successfully' });
            setTimeout(() => {

              window.location.reload();

            }, 1000);
          }
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
        }
      }
    )
  }

  getListOfGroup_select() {
    this.ticketService.getListOfGroup_select().subscribe((res) => {

      this.groups = res;

      console.log(this.groups);
      this.groups.filter((val: any) => {


        if (val.status === 'Closed') {
          this.temp = this.temp = this.datepipe.transform(this.file, 'dd-MMM-yyyy hh:mm:ss a');
          val.createdAt = this.temp;
          this.valueupdate = val.updatedAt;
          this.temp = this.datepipe.transform(this.valueupdate, 'dd-MMM-yyyy hh:mm:ss a');

          val.updatedAt = this.temp;
        }
        else {

          this.file = val.createdAt;

          this.temp = this.temp = this.datepipe.transform(this.file, 'dd-MMM-yyyy hh:mm:ss a');
          this.temval = this.temp = this.datepipe.transform(val.updatedAt, 'dd-MMM-yyyy hh:mm:ss a');
          val.createdAt = this.temp;
          val.updatedAt = this.temval;
          val.updatedAt = '---';
        }



      });
      this.isLoading = false;
    })
  }

  getProjectLOV() {
    this.groupService.getAllGroups().subscribe((res: any) => {
      this.projectLOV = res;
      console.log("Project values", this.projectLOV);
    });
  }
  getBusinessFunctionLOV() {

    this.ticketService.getListOfPMOValues().subscribe((res) => {
      console.log("value of ", this.projectidtk);
      this.emailTickets = res;


      console.log("project drop down email tickets", this.emailTickets);
      // if( (this.projectidtk=='0') &&(this.groupname=='{}')){


      //   alert("projectid with no group");
      //   this.emailTickets=res.filter((val:any)=>val.projectId==='6');
      //   console.log(this.emailTickets);
      // }
      // else if((this.projectidtk!='0')&&(this.groupname=='{}')) {
      //  alert("projectid with no group");
      //  console.log("project-sec",this.projectidtk);

      //   this.emailTickets=res.filter((val:any)=>val.projectId===this.projectidtk);
      //   console.log("project value",this.emailTickets);
      // }
      // else if((this.projectidtk!='0')&&(this.groupname!='{}'||this.groupname!='0'!||this.groupname.length!='0'))
      // {
      //   alert("projectid with no group");
      //   this.emailTickets=res.filter((val:any)=>val.projectId==='6');
      //   console.log(this.emailTickets);
      // }

    });
  }

  onChangelist(newValue: any) {

    this.Listboxprojectname = newValue.projectId;
    this.displaychart = true;
    this.displayclick = true;
    console.log("projectid", this.Listboxprojectname);


    this.dashboardStatusby();
    this.arr.length = 0;
    console.log("Poped", this.arr);
    //console.log(event.key);
    // this.values=event.target.value;
    // console.log('event :' +this.values);
  }
  getListOfEmail_select() {
    this.ticketService.getListOfEmails_select().subscribe((res) => {

      this.tickets = res;
      const valuess = this.tickets.values();

      this.basicData = {
        labels: ['Open Tickets', 'Closed Tickets',
          'Unassigned Tickets', 'Assigned Tickets'],

        datasets: [

          {
            label: '',
            data: this.arr,
            backgroundColor: [
              "#66BB6A",
              "#e94849",
              "#FFA726",
              "#1fade4"
            ],
            hoverBackgroundColor: [
              "#81C784",
              "#e94849",
              "#FFB74D",
              "#1fade4"
            ],

          }



        ]
      };
      //console.log("values",this.tickets.ticketNo)

      this.chartOption = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
      }

      this.tickets.filter((val: any) => {


        if (val.status === 'Closed') {

          this.temp1 = this.datepipe.transform(this.valueupdate, 'dd-MMM-yyyy hh:mm:ss a');
          val.createdAt = this.temp1;
          this.temp = this.datepipe.transform(this.valueupdate, 'dd-MMM-yyyy hh:mm:ss a');

          val.updatedAt = this.temp;
        }
        else {
          this.valueupdate = val.createdAt;
          this.temp = this.datepipe.transform(this.valueupdate, 'dd-MMM-yyyy hh:mm:ss a');
          this.temval = this.temp = this.datepipe.transform(val.updatedAt, 'dd-MMM-yyyy hh:mm:ss a');
          val.createdAt = this.temp;
          val.updatedAt = this.temval;
          val.updatedAt = '---';
        }



      });
      this.isLoading = false;
    })
  }
  filter() {

    if ((this.projectidtk == '0') && ((this.groupname == '{}') || (this.groupname == undefined))) {


      this.dashboardStatusbyprojectgroupwise();
      this.arrdash.length = 0;
      this.progroup = true;
      this.displayclickopen = true;
      this.displayclickclose = true;
      this.displayclickunassigned = true;
      this.displayclickassigned = true;
    }
    else if ((this.projectidtk != '0') && ((this.groupname == '{}') || (this.groupname == undefined))) {
      // alert(this.projectidtk+this.groupname+2+"filter");
      this.progroup = false;
      this.display = true;
      this.displaychart = true;
      this.dashboardStatusby();
      this.arr.length = 0;
    } else if ((this.projectidtk != '0') && ((this.groupname != '{}') || (this.groupname == undefined))) {
      //alert(this.projectidtk+this.groupname+3+"filter");
      this.progroup = false;
      this.dashboardStatusbyprojectgroupwise();
      this.arrdash.length = 0;
      this.progroup = true;
      this.displayclickopen = true;
      this.displayclickclose = true;
      this.displayclickunassigned = true;
      this.displayclickassigned = true;
    }


  }
  //by dropdown project value
  openstatuscount() {
    this.DashboardService.ticketDashboardbyprojectAll(this.projectCategoryId)
      .subscribe(
        (result) => {
          this.openallproject = result;
          console.log("open closed ", this.openallproject.length);
          this.openticketsct = this.openallproject.length;
          // this.openTickets=result.filter((val:any)=>val.status==='Open');
          console.log(this.openTick.length);
        });
  }
  //by roles
  openstatuscountbyroles() {
    this.DashboardService.ticketDashboardbyprojectAll(this.projectidtk)
      .subscribe(
        (result) => {
          this.openallproject = result;
          console.log("open closed ", this.openallproject.length);
          this.openticketsbyrolespro = this.openallproject.length;
          // this.openTickets=result.filter((val:any)=>val.status==='Open');

        });
  }
  opengroupstatuscountbyroles() {
    this.DashboardService.dashboardStatusbyOpen(this.projectidtk, this.groupname)
      .subscribe(
        (result) => {
          this.openallprojectbygroup = result;
          this.openticketsbyrolesprogroup = this.openallprojectbygroup.length;
        });
  }
  //by dropdown group based 
  opengroupstatuscount() {
    this.DashboardService.dashboardStatusbyOpen(this.projectCategoryId, this.groupagentId)
      .subscribe(
        (result) => {
          this.openallprojectbygroup = result;
          this.groupwiseprojectcount = this.openallprojectbygroup.length;
        });
  }
  //chart Role projectwise by role based
  dashboardStatusbyprojectwise() {
    this.progressbar=true;
    this.DashboardService.dashboardStatusby(this.projectidtk)
      .subscribe(
        (result) => {
          this.isLoading = false;

          this.status = result;
          this.openTick = result.filter((val: any) => val.status === 'Open');
          this.closeTick = result.filter((val: any) => val.status === 'Closed');
          this.assignedTick = result.filter((val: any) => val.status === 'Assigned');
          this.unassignedTick = result.filter((val: any) => val.status === 'UnAssigned');
          this.wipTick = result.filter((val: any) => val.status === 'WIP')
          this.onholdTick = result.filter((val: any) => val.status === 'On hold');
          this.customerTick = result.filter((val: any) => val.status === 'Customer Working')
          this.resolvedtick = result.filter((val: any) => val.status === 'Resolved')
          this.openTicketscount = this.openTick.length;
          this.closeTicketscount = this.closeTick.length;
          this.assignedTicketscount = this.assignedTick.length;
          this.unassignedTicketscount = this.unassignedTick.length;
          this.wipTicketscount = this.wipTick.length;
          this.onholdTicketscount = this.onholdTick.length;
          this.customerTicketscount = this.customerTick.length;

          console.log("open",this.openTicketscount);
          console.log("closed",this.closeTicketscount);
          console.log("Assigned",this.assignedTicketscount);
          console.log("Unaassigned",this.unassignedTicketscount);
          console.log("wipticketcount",this.wipTicketscount);
          console.log("onholdtickets",this.onholdTicketscount);
          console.log("customerwaiting",this.customerTicketscount);
          console.log("Resolved",this.resolvedtick);
          if (this.status.openTicketscount === '0') {
            this.displayclickopen = false;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickcustomer = true

          } else if (this.status.closeTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = false;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
          } else if (this.status.assignedTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = false;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = true;


          } else if (this.status.unassignedTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = false;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = true;


          } else if (this.status.wipTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = false;
            this.displayclickassigned = true;
            this.displayclickwip = false;
            this.displayclickonhold = true;
            this.displayclickonhold = true;

          } else if (this.status.onholdTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = false;
            this.displayclickonhold = true;

          } else if (this.status.customerTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = false;

          } else {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = true;
          }

          this.arr.push(this.openTicketscount,
            this.resolvedtick.length,
            this.unassignedTicketscount,
            this.assignedTicketscount, this.wipTicketscount.length, this.onholdTicketscount.length, this.customerTicketscount.length);

          console.log("ARRAY Value", this.arr);

          this.chartOption = {
            legend: { display: false },
            responsive: true,
            maintainAspectRatio: false
          }

          // this.chartOption = {
          //   responsive: true,
          //   maintainAspectRatio: false
          // };
          this.data = {
            labels: ['Open Tickets', 'Resolved Tickets',
              'Unassigned Tickets', 'Assigned Tickets', 'WIP', 'On Hold', 'Customer Working'],
            datasets: [
              {
                data: this.arr,
                backgroundColor: [
                  "#33691E",
                  "#85C1E9",

                  "#FFA726",
                  "#09B2C7",
                  "#7D3C98",
                  "#FF33CC",
                  "#00FFCC"
                ],
                hoverBackgroundColor: [
                  "#33691E",
                  "#85C1E9",

                  "#FFA726",
                  "#09B2C7",
                  "#7D3C98",
                  "#FF33CC",
                  "#00FFCC"
                ],

              }

            ]
          }
          this.progressbar=false;
          this.legendlabels=true;

        })
  }
  //chart for pmo project wise
  dashboardStatusby() {
    this.progressbar=true;
    this.DashboardService.dashboardStatusby(this.projectCategoryId)
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.legendlabels=true;
          this.progressbar=false;
          this.legendlabelsgroupwise=false;
          this.status = result;
          console.log('value of res ', result);
          // this.openTicketscount = this.status.openTicketscount;
          // console.log("openTicketscount", this.openTicketscount);
          // this.closeTicketscount = this.status.closeTicketscount;
          // this.assignedTicketscount = this.status.assignedTicketscount;
          // this.unassignedTicketscount = this.status.unassignedTicketscount;
          this.openTick = result.filter((val: any) => val.status === 'Open');
          this.closeTick = result.filter((val: any) => val.status === 'Closed');
          this.assignedTick = result.filter((val: any) => val.status === 'Assigned');
          this.unassignedTick = result.filter((val: any) => val.status === 'UnAssigned');
          this.wipTick = result.filter((val: any) => val.status === 'WIP')
          this.onholdTick = result.filter((val: any) => val.status === 'On Hold');
          this.customerTick = result.filter((val: any) => val.status === 'Customer Working')
          this.resolvedtick=result.filter((val: any) => val.status === 'Resolved')
          this.openTicketscount = this.openTick.length;
          this.closeTicketscount = this.closeTick.length;
          this.assignedTicketscount = this.assignedTick.length;
          this.unassignedTicketscount = this.unassignedTick.length;
          this.wipTicketscount = this.wipTick.length;
          this.onholdTicketscount = this.onholdTick.length;
          this.customerTicketscount = this.customerTick.length;
           this.resolvedcount=this.resolvedtick.length;

          console.log(this.openTicketscount.length);
          console.log(this.closeTicketscount.length);
          console.log(this.assignedTicketscount.length);
          console.log(this.unassignedTicketscount.length);
          console.log(this.wipTicketscount.length);
          console.log(this.onholdTicketscount.length);
          console.log(this.customerTicketscount.length);
          console.log( "resolved count",  this.resolvedcount)
          
          if (this.status.openTicketscount === '0') {
            this.displayclickopen = false;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickcustomer = true

          } else if (this.status.closeTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = false;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
          } else if (this.status.assignedTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = false;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = true;


          } else if (this.status.unassignedTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = false;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = true;


          } else if (this.status.wipTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = false;
            this.displayclickassigned = true;
            this.displayclickwip = false;
            this.displayclickonhold = true;
            this.displayclickonhold = true;

          } else if (this.status.onholdTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = false;
            this.displayclickonhold = true;

          } else if (this.status.customerTicketscount === '0') {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = false;

          } else {
            this.displayclickopen = true;
            this.displayclickclose = true;
            this.displayclickunassigned = true;
            this.displayclickassigned = true;
            this.displayclickwip = true;
            this.displayclickonhold = true;
            this.displayclickonhold = true;
          }

          this.arr.push(this.openTicketscount, this.resolvedcount, this.unassignedTicketscount, this.assignedTicketscount, this.wipTicketscount, this.onholdTicketscount, this.customerTicketscount);

          console.log("ARRAY Value", this.arr);

          this.chartOption = {
            legend: { display: true },
            responsive: true,
            maintainAspectRatio: false,
              tooltipEvents: [],
            tooltips: {
              intersect: false
            },
            showTooltips: false,            
          }



          this.data = {
            labels: ['Open Tickets', 'Resolved Tickets',
              'Unassigned Tickets', 'Assigned Tickets', 'WIP', 'On Hold', 'Customer Working'],

            datasets: [
              {
                data: this.arr,
                backgroundColor: [

                  "#33691E",
                  "#85C1E9",

                  "#FFA726",
                  "#09B2C7",
                  "#7D3C98",
                  "#FF33CC",
                  "#00FFCC"
                ],
                hoverBackgroundColor: [
                  "#33691E",
                  "#85C1E9",

                  "#FFA726",
                  "#09B2C7",
                  "#7D3C98",
                  "#FF33CC",
                  "#00FFCC"
                ],

              }

            ]
          };
          this.progressbar=false;
          // this.chartOption = {
          //   legend: { display: true },

          //   responsive: true,
          //   maintainAspectRatio: false,

          //   onAnimationComplete: function () {
          //     this.showTooltip(this.segments, true);
          //   },

          //   tooltipEvents: [],
          //   tooltips: {
          //     intersect: false
          //   },
          //   showTooltips: false,
          //   title: {
          //     display: true,
          //     text: 'My Title',
          //     fontSize: 16
          //   },

          // };
        })
  }
  //chart pmo count  project based group role PMo
  dashboardStatusbyprojectgroupwise() {
    this.legendlabels=false;
    this.legendlabelsgroupwise=true;
    this.progressbar=true;
    this.DashboardService.dashboardStatusforgroup(this.projectCategoryId, this.groupagentId)
      .subscribe(
        (result) => {
          this.status = result;
         
          console.log("total count", this.status);
          this.tkcountopen = result.filter((val: any) => val.status === 'Open');
          this.tkcountclose = result.filter((val: any) => val.status === 'Closed');
          this.tkcountunassign = result.filter((val: any) => val.status === 'UnAssigned');
          this.tkcountassign = result.filter((val: any) => val.status === 'Assigned');
          this.tkwip = result.filter((val: any) => val.status === 'WIP');
          this.tkonhold = result.filter((val: any) => val.status === 'On Hold');
          this.tkcustomer = result.filter((val: any) => val.status === 'Customer Working');
          this.tkresolved = result.filter((val: any) => val.status === 'Resolved');

          console.log("filter sec", this.tkcountopen);
          console.log(this.tkcountopen.length);
          console.log(this.tkcountclose.length);
          console.log(this.tkcountassign.length);
          console.log(this.tkwip.length);
          console.log(this.tkonhold.length);
          console.log(this.tkcustomer.length);
          console.log( "resolved count",  this.tkresolved.length);
          this.tkcountopenno = this.tkcountopen.length;
          this.tkcountcloseno = this.tkcountclose.length;
          this.tkcountassignno = this.tkcountassign.length;
          this.tkcountunassignno = this.tkcountunassign.length;
          this.tkcountwip = this.tkwip.length;
          this.tkCountonhold = this.tkonhold.length;
          this.tkCustomerwork = this.tkcustomer.length
          this.tkresolvedno=this.tkresolved.length;
          this.arrdash.push(this.tkcountopen.length, this.tkresolved.length, this.tkcountunassign.length, this.tkcountassign.length, this.tkwip.length, this.tkonhold.length, this.tkcustomer.length);
          console.log(this.arrdash);
          this.chartOption = {
            responsive: true,
            maintainAspectRatio: false
          };
          this.data = {
            labels: ['Open Tickets', 'Resolved Tickets',
              'Unassigned Tickets', 'Assigned Tickets', 'WIP', 'On Hold', 'Customer Working'],
            datasets: [
              {
                data: this.arrdash,
                backgroundColor: [
                  "#33691E",
                  "#85C1E9",

                  "#FFA726",
                  "#09B2C7",
                  "#7D3C98",
                  "#FF33CC",
                  "#00FFCC"
                ],
                hoverBackgroundColor: [
                  "#33691E",
                  "#85C1E9",

                  "#FFA726",
                  "#09B2C7",
                  "#7D3C98",
                  "#FF33CC",
                  "#00FFCC"
                ],

              }

            ]
          }
          this.progressbar=false;

        });



  }
  //chart Role Count  based projcet based group //role based auth 
  dashboardStatusbygroupwise() {
    this.progressbar=true;
    this.legendlabelsgroupwise_role=true;
    this.DashboardService.dashboardStatusforgroup(this.projectidtk, this.groupname)
      .subscribe(
        (result) => {
          this.status = result;
          console.log("total count", this.status);
          this.tkcountopen = result.filter((val: any) => val.status === 'Open');
          this.tkcountclose = result.filter((val: any) => val.status === 'Closed');
          this.tkcountunassign = result.filter((val: any) => val.status === 'UnAssigned');
          this.tkcountassign = result.filter((val: any) => val.status === 'Assigned');
          this.tkwip = result.filter((val: any) => val.status === 'WIP');
          this.tkonhold = result.filter((val: any) => val.status === 'On hold');
          this.tkcustomer = result.filter((val: any) => val.status === 'Customer Working');
          this.tkcustomerresolved = result.filter((val: any) => val.status === 'Resolved');
          console.log( "resolved count",  this.tkcustomerresolved.length);
          console.log("filter sec", this.tkcountopen);
          console.log(this.tkcountopen.length);
          console.log(this.tkcountclose.length);
          console.log(this.tkcountassign.length);
          console.log(this.tkcountunassign.length);
          console.log(this.tkwip.length);
          console.log(this.tkonhold.length);
          console.log(this.tkcustomer.length);
          this.tkcountopenno = this.tkcountopen.length;
          this.tkcountcloseno = this.tkcountclose.length;
          this.tkcountassignno = this.tkcountassign.length;
          this.tkcountunassignno = this.tkcountunassign.length;
          this.tkcountwip = this.tkwip.length;
          this.tkCountonhold = this.tkonhold.length;
          this.tkCustomerwork = this.tkcustomer.length


          this.arrdash.push(this.tkcountopen.length,
            this.tkcustomerresolved.length,
            this.tkcountunassign.length,
            this.tkcountassign.length, this.tkcountwip, this.tkCountonhold, this.tkCustomerwork);
          console.log("groupwise open ",this.tkcountopen.length);
          console.log("groupwise resolved ",this.tkcustomerresolved.length);
          console.log("groupwise unAssign ",this.tkcountunassign.length);
          console.log("groupwise Assign ",this.tkcountassign.length);
          console.log("groupwise wip ",this.tkcountwip);
          console.log("groupwise onhold ",this.tkCountonhold);
          console.log("groupwise CustomerWork ",this.tkCustomerwork);
          // this.chartOption = {
          //   responsive: true,
          //   maintainAspectRatio: false
          // };
          this.chartOption = {
            responsive: true,
            maintainAspectRatio: false
          };
          this.data = {
            labels: ['Open Tickets', 'Resolved Tickets',
              'Unassigned Tickets', 'Assigned Tickets', 'WIP', 'On Hold', 'Customer Working'],
              
            datasets: [
              {
                data: this.arrdash,
                backgroundColor: [
                  "#1D8348",
                  "#85C1E9",

                  "#DC7633",
                  "#BB8FCE",
                  "#F4D03F",
                  "#E67E22",
                  "#1F618D"

                ],
                hoverBackgroundColor: [
                  "#1D8348",
                  "#85C1E9",
                
                  "#DC7633",
                  "#BB8FCE",
                  "#F4D03F",
                  "#E67E22",
                  "#1F618D"

                ],

              }

            ]
          }
          this.progressbar=false;
          //this.legendlabelsgroupwise=true;
        });



  }

}
