import { FormBuilder, FormGroup } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';


import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import { AgentgroupService } from 'src/app/modules/admin/groups/services/agentgroup.service';
import { errorcodeservice } from 'src/app/modules/errorcode/errorcodeservice';
import { TicketService } from '../tickets/components/ticket/ticketservice';
import { DashboardService } from '../dashboard/dashboard/dashboard.service';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-ticketdashboard',
  templateUrl: './ticketdashboard.component.html',
  styleUrls: ['./ticketdashboard.component.scss'],
  providers: [TicketService, DashboardComponent,MessageService, ConfirmationService, errorcodeservice, DashboardService],
})

export class TicketdashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // 
  @ViewChild('opMenu') op: OverlayPanel | any;
  isLoading: boolean = true;
  toggleOverlay = ({ originalEvent }: any) => this.op.toggle(originalEvent);
  showMsg: boolean = true;
  isloading: boolean = true;
  tickets: any = [];
  groups: any = [];
  selectedTicketGroupname: any;
  selectedTickets: any;
  selectedTicketsdis: any;
  progressbar:boolean=false;
  firstresponse:any;
  tempmin:any;
  cols: any;
  openticketlist: any;
  _selectedColumns: any;
  temval: any;
  selectedProject: any;
  TicketDialog: boolean = false;
  editTicketScreen: boolean = false;
  showassignbtn:boolean=true;
  header: any;
  replyitems: any;
  moreitems: any;
  menuitems: any;
  selectedvalue: any;
  frozenCols: any;
  errorMessage: any;
  serviceopenticket: any;
  opPanel: any;
  tempclose:any;
  temp_res:any;
  temp_resolutiontime:any;
  menuItemDisplay: boolean = false;
  actualtarget: any;
  projectId: any;
  groupName: any;
  groupbased:any;
  projects: any;
  agentitems: any;
  statusitems: any;
  userrole: any;
  emailTickets: any;
  userrolename: any;
  ticketForm !: any;
  projectCategoryId: any;
  grouplistvalue: any;
  Listboxgroupname: any;
  show: boolean = false;
  projectLOV: any;
  listCategory: any;
  openticketlists:any;
  groupTickets: any;
  values = '';
  selectedValue: string;
  tableselectedcol:boolean=true;
  ticket: any;
  showassign: boolean = true;
  emailPlaceholderText = ' Project Name';
  groupPlaceholderText = 'Group Name';
  file: any;
  groupagentId: any;
  temp: any;
  showassigndialog: boolean = false;
  showtstatuslistbox:boolean=false;
  showtstatus:boolean=false;
  items: MenuItem[];
  Listboxstatus: any;
  valueupdate: any;
  temp1: any;
  groupid:any;
  statusvalue:any;
  slamessage:any;
  selectdate: any;
  tkcounttkcount:any;
  editingtick: boolean = false;
  editingremove: boolean = false;
  projectvalue: any;
  home: MenuItem;
  errorForm: FormGroup;
  status:any;
  errors: any;
  date_created:any;
  projectidtk:any;
  groupname:any;
  status_txt:any;
  projectcomponent:any;
  userName: string = '';
 valueproject:any;
 groupname_txt:any;
 arropen: number[] = [];
 arrclose: number[] = [];
 arrassign: number[] = [];
 arrunassign: number[] = [];
 tkcount:any;
 ticketstatus:boolean=false;
 id:any;
 statusname:any;
 col_waitingforapproval:any;
 approvallength:any;
 projectname:any;
 groupidname:any;
 role:any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: errorcodeservice,
    private DashboardService: DashboardService,
    private router: Router,
    private ticketService: TicketService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private shareservice: AuthService,
    private groupService: AgentgroupService,
    private datepipe: DatePipe,
    private dashboard:DashboardComponent


  ) { 
    
  }

  ngAfterViewInit(): void {
    // this.ticketService.getTickets().then((data) => (this.tickets = data));
    // this.ticketService.getListOfEmails().subscribe((data)=> (this.tickets = data));

   // this.getListOfEmail_select();
    this.getListOfGroup_select();
    this.getBusinessFunctionLOV();

  }

  ngOnInit(): void {

   this.id= this.route.snapshot.paramMap.get('id');
   this.projectname= this.route.snapshot.paramMap.get('projectname');
   this.status=this.route.snapshot.paramMap.get('groupName');
   this.groupname_txt=this.route.snapshot.paramMap.get('groupName');
   this.status_txt=this.route.snapshot.paramMap.get('status');
   console.log("projectname",this.projectname);
    console.log("router values",this.id,this.status_txt);
    if( this.status_txt=='Waiting for Approval')
    { 
    
      this._selectedColumns = [
        { field: 'approvalCreateDate', header: 'Created Date' },
        { field: 'priorityStatus', header: 'priority' },
        { field: 'from_Address', header: 'Requestors' },
        { field: 'subject', header: 'Issue Description' },
        { field: 'ticketNo', header: 'Ticket No' },
        { field: 'groupName', header: 'Group' },
        { field: 'clientClosedDate', header: 'Closed Date' },
      ];
      this.cols = [
      
        { field:'approvalCreateDate', header: 'Created Date' },
        { field:'from_Address', header: 'Requestors' },
        { field: 'priorityStatuss', header: 'Priority' },
        { field: 'subject', header: 'Issue Description' },
  
        { field: 'ticketNo', header: 'Ticket No' },
  
        { field: 'groupName', header: 'Group' },
  
  
        { field: 'clientClosedDate', header: 'Closed Date' },
          
        { field: 'slaResponseStatus', header: 'First Response Status' },
        { field: 'first_RESPONSEON', header: 'First Response Date ' },
        { field: 'firstResponseTime', header: 'First Response Time ' },
        { field: 'resolutionTime', header: ' Resolution Time ' },
        { field: 'slaResolveStatus', header: 'SLAResolveStatus' },
        
        // { field: 'ticketAge', header: 'Ticket Age' },
        
  
  
      ];
  
    }else
    {
      this._selectedColumns = [
        { field: 'tempDate', header: 'Created Date' },
        { field: 'priority', header: 'Priority' },
        { field: 'from_Address', header: 'Requestors' },
        { field: 'subject', header: 'Issue Description' },
        { field: 'ticketNo', header: 'Ticket No' },
        { field: 'groupName', header: 'Group' },
        { field: 'clientClosedDate', header: 'Closed Date' },
      ];
      this.cols = [
      
        { field:'tempDate', header: 'Created Date' },
        { field: 'priority', header: 'Priority' },
        { field:'from_Address', header: 'Requestors' },
        { field: 'subject', header: 'Issue Description' },
  
        { field: 'ticketNo', header: 'Ticket No' },
  
        { field: 'groupName', header: 'Group' },
  
  
        { field: 'clientClosedDate', header: 'Closed Date' },
          
        { field: 'slaResponseStatus', header: 'First Response Status' },
        { field: 'firstResponseDate', header: 'First Response Date ' },
        { field: 'firstResponseTime', header: 'First Response Time ' },
        { field: 'resolutionTime', header: ' Resolution Time ' },
        { field: 'slaResolveStatus', header: 'SLAResolveStatus' },
  
        
  
  
      ];
    }
    // this.ticketService.getListOfAproval(this.id).subscribe((res) => {
    //   this.ticketstatus=true;
    //   this.isLoading = false;
    //   this.openticketlist = res;
    //   console.log("approval legth",this.openticketlists.length);
    //   console.log("this approval part", this.openticketlists);
    //   this.approvallength=this.openticketlists.length;


    // });
    // this.ticketService.getTicketsForApprovalGroup(this.id,this.groupname).subscribe((res) => {
    //   this.ticketstatus=true;
    //   this.isLoading = false;
    //   this.openticketlist = res;
    //   // console.log("approval legth group",this.openticketlists.length);
    //   console.log("this approval part group", this.openticketlists);
    //   this.approvallength=this.openticketlists.length;


    // });

    this.statusname=this.route.snapshot.paramMap.get('status');
    console.log("status",this.statusname);
    this.groupidname=this.route.snapshot.paramMap.get('groupid');
    console.log("status",this.groupidname);


    
    // this.getListOfEmail_select();
    this.valueproject=this.dashboard.projectCategoryId;
    console.log("tk project id",this.valueproject);
    this.projectidtk = this.shareservice.getprojectid();
    console.log("ticket screen", this.projectidtk);
    this.groupname=this.shareservice.getgroupname();
    console.log(this.groupname);   
    this.projectId =this.route.snapshot.paramMap.get('id');
    this.status=this.route.snapshot.paramMap.get('status');
    this.status_txt=this.route.snapshot.paramMap.get('status');
    this.groupid=this.route.snapshot.paramMap.get('groupid');
    console.log("routing value", this.projectId,this.status,this.groupid);
    console.log("groupid sec",this.groupid);
    this.role=this.shareservice.getrole();
    console.log("this role",this.role);
    if((this.projectId!='0' || this.projectId! ==null)&&(this.status!='0'|| this.status!==null)&&(this.groupid===null))
    {
      console.log("inside project loop ",this.projectId,this.status,this.groupid)
      if(this.status=='Open')
      {
          //alert("open all");
         this.openticketbyprojectsAll();
      }else{
    //alert("projectwise");
    if( (this.projectId!=null)&&(this.status===null)&&(this.groupid===null))
    {
      //alert("waiting for approval project");
      this.getwaitingforapproval_projectwise();
    }
    // else if((this.projectId!==null)&&(this.status_txt!=null)&&(this.groupid===null))
    // {
    //   alert("waiting for approval  group");
    //   this.getWaitingforapproval_groupbase();
    // }
    else{ 
      this.openticketbyproject();
      //this.getWaitingforapproval_groupbase();
    }
   
  }
    }
    else
    {
      console.log("inside group loop ",this.projectId,this.status,this.groupid)
    //alert("groupwise");
    if(this.status==='Open')
  {
    this.openticketbyall();
  }else{
    if(this.status==='Waiting for Approval'){
      // alert("waiting");
      this.getWaitingforapproval_groupbase();
    
      

    }else{this.openticket();}
    
  }
    }
   
    this.showtstatus=true;
    this.showtstatuslistbox=false;   
   
    this.errorForm = this.fb.group(
      {
        error_code: '',
        error_name: '',
        error_description: ''

      })
    this.ticketService.getListOfGroups().subscribe((result: any) => {

      //console.log(' values of tickets getListOfGroups', result);
      this.groupTickets = result;

      this.isloading = false;
    }
    );



    //this.showMsg = false;

    this.userrole = this.shareservice.getrole();
    this.userrolename = this.shareservice.getUsername();
    ///console.log(this.userrolename);

    if (this.userrole === 'ROLE_PMO' || this.userrole === 'ROLE_ADMIN' || this.userrole === 'ROLE_SUPERAGENT' || this.userrole === 'ROLE_GROUP' ) {
      
      if(this.status=='Open'|| this.status=='UnAssigned')
      {
      this.showassignbtn = true;}else{
        this.showassignbtn = false;
      }
    }
    else {
      this.showassignbtn = false;
    }
   // console.log('ticketpage', this.userrole);



    this.statusitems = [

      // { statusitems: 'Assigned' },
      { statusitems: 'Select Status' },
      { statusitems: 'WIP' },
      { statusitems: 'On hold' },
      { statusitems: 'Customer Working' },
      { statusitems: 'Closed' },
      { statusitems: 'Duplicate' },
      { statusitems: 'Resolved' },
    ];

    this.menuitems = [
      {
        label: 'ATA BASIS',
        value: 'de',
        items: [
          { label: 'ATA support', value: 'ata ss' },
          { label: 'ATA squard', value: 'ata sa' },
        ],
      },
      {
        label: 'ATA ABAP',
        value: 'us',
        items: [
          { label: 'ABAP support(me)', value: 'sup' },
          { label: 'ATA', value: 'ata' },
        ],
      },
      {
        label: 'ATA MM',
        value: 'jp',
        items: [
          { label: 'MM support', value: 'mm ss' },
          { label: 'MM', value: 'mm' },
        ],
      },
    ];
    console.log("openarrayoninit",this.arropen);
    // this.menuitems = [
    //   {
    //     label: 'ATA ABAP',
    //     command: this.toggleOverlay,
    //     // command: (event: any) => {
    //     //   this.menuClick(event);
    //     // },
    //   },
    //   {
    //     label: 'ATA BB',
    //     command: this.toggleOverlay,
    //   },
    // ];

    this.items = [

      {
        label: 'Dashboard',
        routerLink: '/dashboard/dashboard'

      },

    ];

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard/dashboard' };

  
   
    // this.frozenCols = [{ field: 'ticketNo', header: 'TicketNo' },];
              
   console.log("opentickets",this.arropen);
   this.getListStatus();
   
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
    //restore original order
    //alert(JSON.stringify(val));
    if(JSON.stringify(val)==='[]')
    {
      // alert(null);
      this.tableselectedcol=false;
    }else
    {
      this.tableselectedcol=true;
    }
    this.getapprovallist();
  }
  onclickassign()
  {
     this.getgroupbasedassign();
  }
  getapprovallist()
  {
    
  }
  getListStatus() {
    this.ticketService.getListOfStatus()
      .subscribe((result) => {
   console.log("result of status",result);
   this.statusvalue=result;
        // console.log('values are of', result.mailBody);
        // this.htmlString = result.mailBody;
        // console.log(this.htmlString);
        // this.emailTickets = result;
      }

      )
  }
  getGroupNameLov() {

    this.ticketService.getListOfGroups().subscribe((res: any) => {

      this.groupTickets = res
    });
  }
  editTicket(ticket: any) {
    // this.editTicketScreen = true;
    this.header = ticket.ticketNo;
    //alert(this.header);
    this.router.navigate(['/dashboard/tickets', ticket.ticketNo]);
  }
  editTicketsec(ticket: any) {
    // this.editTicketScreen = true;
    this.header = ticket.ticketNo;
   // console.log("dropsec",this.header);
    //alert(this.header);
    //this.router.navigate(['/dashboard/tickets', ticket.ticketNo]);
  }
  getgroupbasedproject()
  {
    this.ticketService.getgroupbasedproject(this.projectCategoryId).subscribe((res) => {

      this.groupbased = res;
      console.log("groupbased",this.groupbased);

    });
  }
  getgroupbasedassign()
  {
    this.ticketService.getgroupbasedproject(this.projectId).subscribe((res) => {

      this.groupbased = res;
      console.log("groupbased",this.groupbased);

    });
  }
  menuClick(e: any) {
    //console.log(e);
    // this.menuItemDisplay = true;
    this.op.show(e, this.actualtarget);
  }
  editstatus() {
    this.show = true;
  }
  getBusinessFunctionLOV() {

    this.ticketService.getListOfPMOValues().subscribe((res: any) => {

      this.emailTickets = res
    });
  }
  onChangeliststatus(ticket: any, newValue: any) {
    this.Listboxstatus = newValue.status;
    this.ticket = { ...ticket };
    // alert(this.ticket.first_RESPONSEON);
    // console.log('onchange', this.ticket.subject);
     console.log('listbox status chnage', this.Listboxstatus);
    

    let changestatuspayload = {
      ticketNo: ticket.ticketNo,
      status: this.Listboxstatus,
    };
if(this.ticket.first_RESPONSEON===null)
{
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Acknowledge the Ticket before Status Change',
    life: 3000,
  });
}else{
    this.ticketService.activeStatus(changestatuspayload).subscribe({
      next: (val: any) => {

  console.log("change status",this.Listboxstatus);
   console.log('Value', val);

        if (changestatuspayload.status === 'Resolved') {
       
          this.TicketDialog = true;
          console.log('onchange', this.ticket.subject);
          this.errorForm.setValue({
            error_code: changestatuspayload.ticketNo,
            error_name: this.ticket.subject,
            error_description: '',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'save',
            detail: `${ticket.ticketNo} Status changed to  ${this.Listboxstatus} `,
            life: 3000,
          });
          this.ngAfterViewInit();
          this.ngOnInit();
        }
      },

      error: (err: any) => {
        this.slamessage = err.error.message;
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.slamessage,
          life: 3000,
        });
        this.ngAfterViewInit();
        this.ngOnInit();
      },
    });
  }
  }
  onChangelist(newValue: any) {
    this.Listboxgroupname = newValue.groupAgentName;
   
    //console.log(this.Listboxgroupname);

  }
 
  onChange(event: any) {
    // console.log('event :' + event);
    this.projectCategoryId = event.value
    //console.log(this.projectCategoryId);
    this.getListOfEmail();

   // console.log("Project name", event.value);
  }
  getwaitingforapproval_projectwise()
  {
    this.progressbar=true;
    this.status="Waiting For Approval"
     this.ticketService.getListOfAproval(this.id,this.status).subscribe((res) => {
      this.ticketstatus=true;
      this.isLoading = false;
      this.progressbar=false;
      this.openticketlist = res;
      // console.log("approval legth",this.openticketlists.length);
      this.openticketlist.filter((val: any) => {

        console.log("slaResponseStatus",val.slaResponseStatus);
        if(val.slaResponseStatus=='--')
        {
          val.firstResponseTime='--';
                   
        }else
        {
          var hours = Math.trunc(val.firstResponseTime/60);
          var minutes = val.firstResponseTime % 60;
          this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
          val.firstResponseTime=this.tempmin;

         
        
        }

         this.temp = this.datepipe.transform(
          val.clientCreationDate,
          'dd-MMM-yyyy hh:mm:ss a '
        );
        this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
        val.resolutionDate = this.temp_res;
       this.temp=this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy ');   
       val.approvalCreateDate=this.temp;

        val.clientCreationDate = this.temp;
        // console.log("TimeZone date",val.clientCreationDate.toUTCString());
        this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MM-yyyy  ');
        val.first_RESPONSEON= this.firstresponse;
        // console.log(val.updatedAt);
        if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
          console.log("Closed date",val.closedDate);
          // console.log(val.status);
          this.temp = this.datepipe.transform(
            val.updatedAt,
            'dd-MMM-yyyy hh:mm:ss a'
          );
          this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
          console.log("Closed date temp",  this.tempclose );
       
          val.closedDate= this.tempclose;
          var hours_restime = Math.trunc(val.resolutionTime/60);
          var minutes_restime = val.resolutionTime % 60;
          this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
          val.resolutionTime=this.temp_resolutiontime;
          console.log(hours +"Hrs"+ minutes+"mintues");
            // val.updatedAt = this.temp;
        } else {
          // val.updatedAt = '---';
          val.closedDate="---";
          val.resolutionTime='--'

        }
      });  
      // this.openticketlist.filter((val: any) => {
      //   if(val.slaResponseStatus=='--')
      //   {
      //     val.firstResponseTime='--';

          
      //   }else
      //   {
      //     var hours = Math.trunc(val.firstResponseTime/60);
      //     var minutes = val.firstResponseTime % 60;
      //    this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
      //      val.firstResponseTime=this.tempmin;
      //     console.log(hours +"Hrs"+ minutes+"mintues");
        
      //   }
      //   // val.mailBody="--";
      // console.log("status approval",this.openticketlist)
      //   this.temp = this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy  a');
      //   val.approvalCreateDate = this.temp;
      //   // console.log("values email",val.emailCC);
      //   // console.log("value of", val.createdAt);
      // });
     // console.log("this approval part", this.openticketlists);
      // this.approvallength=this.openticketlists.length;

    });
  }
  getWaitingforapproval_groupbase()
  {
    // alert("hi");
    const statuswaiting='Waiting for Approval'
console.log("inside group status",this.status);
     this.ticketService.getTicketsForApprovalGroup(this.id,this.status,this.groupid).subscribe((res) => {
      this.ticketstatus=true;
      this.isLoading = false;
      this.openticketlist = res;
      // console.log("approval legth group",this.openticketlists.length);
      // console.log("this approval part group", this.openticketlists);
      // this.approvallength=this.openticketlists.length;
      this.openticketlist.filter((val: any) => {

        console.log("slaResponseStatus",val.slaResponseStatus);
        if(val.slaResponseStatus=='--')
        {
          val.firstResponseTime='--';
                   
        }else
        {
          var hours = Math.trunc(val.firstResponseTime/60);
          var minutes = val.firstResponseTime % 60;
          this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
          val.firstResponseTime=this.tempmin;

         
        
        }

         this.temp = this.datepipe.transform(
          val.clientCreationDate,
          'dd-MMM-yyyy hh:mm:ss a '
        );
        this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
        val.resolutionDate = this.temp_res;
        this.temp=this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy ');   
        val.approvalCreateDate=this.temp;

        val.clientCreationDate = this.temp;
        // console.log("TimeZone date",val.clientCreationDate.toUTCString());
        this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MM-yyyy ');
        val.first_RESPONSEON= this.firstresponse;
        // console.log(val.updatedAt);
        if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
          console.log("Closed date",val.closedDate);
          // console.log(val.status);
          this.temp = this.datepipe.transform(
            val.updatedAt,
            'dd-MMM-yyyy hh:mm:ss a'
          );
          this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
          console.log("Closed date temp",  this.tempclose );
       
          val.closedDate= this.tempclose;
          var hours_restime = Math.trunc(val.resolutionTime/60);
          var minutes_restime = val.resolutionTime % 60;
          this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
          val.resolutionTime=this.temp_resolutiontime;
          console.log(hours +"Hrs"+ minutes+"mintues");
            // val.updatedAt = this.temp;
        } else {
          // val.updatedAt = '---';
          val.closedDate="---";
          val.resolutionTime='--'

        }
      });  

    });
  }
  onChange1(event: any) {


    this.groupagentId = event.value;
    this.getLiistofGroup();


    //console.log("group name", this.groupagentId);
  }
  // getListOfEmail_select() {
  //   this.ticketService.getListOfEmails_select().subscribe((res: any) => {

  //     this.tickets = res;


  //     this.tickets.filter((val: any) => {
  //       this.temp = this.datepipe.transform(val.clientCreationDate, 'dd-MMM-yyyy hh:mm:ss a');
  //       val.clientCreationDate = this.temp;  

  //       if (val.status === 'Closed') {        
  //         this.temp = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a');
  //         val.closedDate = this.temp;
  //       }
  //       else {
  //         val.closedDate = '---';
  //       }
  //     });
  //     this.isLoading = false;
  //   })
  // }

  getListOfGroup_select() {
    this.ticketService.getListOfGroup_select().subscribe((res: any) => {

      this.groups = res;
      this.groups.filter((val: any) => {
        if (val.status === 'Closed') {
          this.temp = this.temp = this.datepipe.transform(this.file, 'dd-MMM-yyyy hh:mm:ss a');
          val.clientCreationDate = this.temp;
          this.valueupdate = val.closedDate;
          this.temp = this.datepipe.transform(this.valueupdate, 'dd-MMM-yyyy hh:mm:ss a');

          val.closedDate = this.temp;
        }
        else {

          this.file = val.clientCreationDate;
          this.temp = this.temp = this.datepipe.transform(this.file, 'dd-MMM-yyyy hh:mm:ss a');
          this.temval = this.temp = this.datepipe.transform(val.updatedAt, 'dd-MMM-yyyy hh:mm:ss a');
          val.clientCreationDate = this.temp;
          val.closedDate = this.temval;
          val.closedDate = '---';
        }
      });
      this.isLoading = false;
    })
  }

  getListOfEmail() {
    this.ticketService.getListOfEmails(this.projectCategoryId).subscribe((res: any) => {
    this.tickets = res;
  


    })
  }

  getLiistofGroup() {
    this.ticketService.getListOfGroup(this.projectCategoryId).subscribe((res: any) => {
      this.ngOnInit();
      this.isLoading = false;
      this.groups = res;
   //   console.log("this groups", this.groups);

      const values = this.groups.values();
    })
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


  getProjectLOV() {
    this.groupService.getAllGroups().subscribe((res: any) => {
      this.projectLOV = res;
     // console.log("Project values", this.projectLOV);
    });
  }



  assignTickets() {
    let delbasepayload = {
      groupName: this.Listboxgroupname,

      projectId: this.selectProjectId,
      ticketNo: this.selectTicketNo,



    }
    this.ticketService.assignTo(delbasepayload).subscribe(
      {


        next: (value: any) => {
          this.showassigndialog = true;
          if (value == null) {

            this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
          }
          else {

            this.messageService.add({ severity: 'success', summary: 'Suceess', detail: 'Assigned Successfully' });
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
  selectProjectId: any;
  selectTicketNo: any;


  project() {
    //     this.projects = { ...project };
    //     console.log('Name',project.ticketNo);
    //   this.selectProjectId = this.selectedTickets[0].projectId;
    //   this.selectTicketNo = this.selectedTickets[0].ticketNo;
    // console.log("selectTickets", this.selectProjectId);
    // console.log("selectTick", this.selectTicketNo);
  }

  editTickets(ticket: any) {
    //this.TicketDialog= true;
    this.ticket = { ...ticket };
    this.selectProjectId = this.ticket.projectId;
    this.selectTicketNo = this.ticket.ticketNo;
    this.selectedTicketGroupname = this.ticket.groupName;
   // console.log('selectProjectId', this.selectProjectId);
   // console.log('selectTicketNo', this.selectTicketNo);
   // console.log('selectedTicketGroupname', this.selectedTicketGroupname);
    if (this.selectedTicketGroupname === null) {
      //alert('null');
      // window.scroll({ 
      //   top: 0, 
      //   left: 0, 
      //   behavior: 'smooth' 
      // });
      // this.messageService.add({severity:'success', summary:'Ticket Assign', detail: 'You can assign the group for this ticket'});
    } else {
      // window.scroll({ 
      //   top: 0, 
      //   left: 0, 
      //   behavior: 'smooth' 
      // });
      //  this.messageService.add({severity:'error', summary: 'Ticket Already Assigned', detail: 'Ticket already assign to '+ this.selectedTicketGroupname});
    }

  }
  //display the ticket based on the status Closed , Assigned and Unassigned by groupproject based 
  openticket() {
  //  console.log("status",this.status);

    this.DashboardService.ticketDashboard(this.projectId,this.status,this.groupid)
      .subscribe((res: any) => {
 
       console.log(this.groupname);
        this.openticketlist = res;
        this.tkcount=this.openticketlist.length;
        this.arropen.push(this.tkcount);
        console.log("value of ticket count inside service",this.arropen);
        this.openticketlist.filter((val: any) => {

          console.log("slaResponseStatus",val.slaResponseStatus);
          if(val.slaResponseStatus=='--')
          {
            val.firstResponseTime='--';
                     
          }else
          {
            var hours = Math.trunc(val.firstResponseTime/60);
            var minutes = val.firstResponseTime % 60;
            this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
            val.firstResponseTime=this.tempmin;
  
           
          
          }
  
           this.temp = this.datepipe.transform(
            val.clientCreationDate,
            'dd-MMM-yyyy hh:mm:ss a '
          );
          this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
          val.resolutionDate = this.temp_res;
         
          this.temp=this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy ');   
          val.approvalCreateDate=this.temp;
          val.clientCreationDate = this.temp;
          // console.log("TimeZone date",val.clientCreationDate.toUTCString());
          this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MM-yyyy ');
          val.first_RESPONSEON= this.firstresponse;
          // console.log(val.updatedAt);
          if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
            console.log("Closed date",val.closedDate);
            // console.log(val.status);
            this.temp = this.datepipe.transform(
              val.updatedAt,
              'dd-MMM-yyyy hh:mm:ss a'
            );
            this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
            console.log("Closed date temp",  this.tempclose );
         
            val.closedDate= this.tempclose;
            var hours_restime = Math.trunc(val.resolutionTime/60);
            var minutes_restime = val.resolutionTime % 60;
            this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
            val.resolutionTime=this.temp_resolutiontime;
            console.log(hours +"Hrs"+ minutes+"mintues");
              // val.updatedAt = this.temp;
          } else {
            // val.updatedAt = '---';
            val.closedDate="---";
            val.resolutionTime='--'
  
          }
        });  

        console.log("value of opentcikets", this.openticketlist);
      });
  }
  //sperate api for open alone in projectgroupwise display all tickets by groupwise and project wise 
  openticketbyall() {
    //  console.log("status",this.status);
  
      this.DashboardService.dashboardStatusbyOpen(this.projectId,this.groupid)
        .subscribe((res: any) => {
   
         console.log(this.groupname);
          this.openticketlist = res;
          this.tkcount=this.openticketlist.length;
          this.arropen.push(this.tkcount);
          console.log("value of ticket count inside service",this.arropen);
          this.openticketlist.filter((val: any) => {

            console.log("slaResponseStatus",val.slaResponseStatus);
            if(val.slaResponseStatus=='--')
            {
              val.firstResponseTime='--';
                       
            }else
            {
              var hours = Math.trunc(val.firstResponseTime/60);
              var minutes = val.firstResponseTime % 60;
              this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
              val.firstResponseTime=this.tempmin;
    
             
            
            }
    
             this.temp = this.datepipe.transform(
              val.clientCreationDate,
              'dd-MMM-yyyy hh:mm:ss a '
            );
            this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
            val.resolutionDate = this.temp_res;
           
            this.temp=this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy ');   
            val.approvalCreateDate=this.temp;
            val.clientCreationDate = this.temp;
            // console.log("TimeZone date",val.clientCreationDate.toUTCString());
            this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MM-yyyy ');
            val.first_RESPONSEON= this.firstresponse;
            // console.log(val.updatedAt);
            if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
              console.log("Closed date",val.closedDate);
              // console.log(val.status);
              this.temp = this.datepipe.transform(
                val.updatedAt,
                'dd-MMM-yyyy hh:mm:ss a'
              );
              this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
              console.log("Closed date temp",  this.tempclose );
           
              val.closedDate= this.tempclose;
              var hours_restime = Math.trunc(val.resolutionTime/60);
              var minutes_restime = val.resolutionTime % 60;
              this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
              val.resolutionTime=this.temp_resolutiontime;
              console.log(hours +"Hrs"+ minutes+"mintues");
                // val.updatedAt = this.temp;
            } else {
              // val.updatedAt = '---';
              val.closedDate="---";
              val.resolutionTime='--'
    
            }
          });  
  
          console.log("value of opentcikets", this.openticketlist);
        });
    }
  
  //display the ticket based on the status Closed , Assigned and Unassigned by project based
  openticketbyproject() {
if(this.status=='Waiting for Approval')
{
// alert("waiting for approval");
this.getwaitingforapproval_projectwise();
}else{
  this.DashboardService.ticketDashboardbyproject(this.projectId,this.status)
  .subscribe((res: any) => {
 //   console.log(this.projectId, this.serviceopenticket);

    this.openticketlist = res;
    console.log("opentickets", this.openticketlist);
    this.openticketlist.filter((val: any) => {

      console.log("slaResponseStatus",val.slaResponseStatus);
      if(val.slaResponseStatus=='--')
      {
        val.firstResponseTime='--';
                 
      }else
      {
        var hours = Math.trunc(val.firstResponseTime/60);
        var minutes = val.firstResponseTime % 60;
        this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
        val.firstResponseTime=this.tempmin;

       
      
      }

       this.temp = this.datepipe.transform(
        val.clientCreationDate,
        'dd-MMM-yyyy hh:mm:ss a '
      );
      this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
      val.resolutionDate = this.temp_res;
     

      val.clientCreationDate = this.temp;
      // console.log("TimeZone date",val.clientCreationDate.toUTCString());
      this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MM-yyyy ');
      val.first_RESPONSEON= this.firstresponse;
      this.temp=this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy ');   
      val.approvalCreateDate=this.temp;
      // console.log(val.updatedAt);
      if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
        console.log("Closed date",val.closedDate);
        // console.log(val.status);
        this.temp = this.datepipe.transform(
          val.updatedAt,
          'dd-MMM-yyyy hh:mm:ss a'
        );
        this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
        console.log("Closed date temp",  this.tempclose );
     
        val.closedDate= this.tempclose;
        var hours_restime = Math.trunc(val.resolutionTime/60);
        var minutes_restime = val.resolutionTime % 60;
        this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
        val.resolutionTime=this.temp_resolutiontime;
        console.log(hours +"Hrs"+ minutes+"mintues");
        
          // val.updatedAt = this.temp;
      } else {
        // val.updatedAt = '---';
        val.closedDate="---";
        val.resolutionTime='--'

      }
    });  

    console.log("value of opentcikets", this.openticketlist);
  });
}

   
  }
   //sperate api for open alone in project - all tickets need to display when the status is open
  openticketbyprojectsAll() {
   this.progressbar=true;
   //alert(this.projectId);
    this.DashboardService.ticketDashboardbyprojectAll(this.projectId)
      .subscribe((res: any) => {
     //   console.log(this.projectId, this.serviceopenticket);
     this.progressbar=false;
        this.openticketlist = res;
        console.log("opentickets", this.openticketlist);
        this.openticketlist.filter((val: any) => {

          console.log("slaResponseStatus",val.slaResponseStatus);
          if(val.slaResponseStatus=='--')
          {
            val.firstResponseTime='--';
                     
          }else
          {
            var hours = Math.trunc(val.firstResponseTime/60);
            var minutes = val.firstResponseTime % 60;
            this.tempmin=hours +"Hr"+ ":"+minutes+"Min";
            val.firstResponseTime=this.tempmin;
  
           
          
          }
  
           this.temp = this.datepipe.transform(
            val.clientCreationDate,
            'dd-MMM-yyyy hh:mm:ss a '
          );
          this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
          val.resolutionDate = this.temp_res;
         
          this.temp=this.datepipe.transform(val.approvalCreateDate, 'dd-MM-yyyy ');   
          val.approvalCreateDate=this.temp;
          val.clientCreationDate = this.temp;
          // console.log("TimeZone date",val.clientCreationDate.toUTCString());
          this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MM-yyyy ');
          val.first_RESPONSEON= this.firstresponse;
          // console.log(val.updatedAt);
          if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
            console.log("Closed date",val.closedDate);
            // console.log(val.status);
            this.temp = this.datepipe.transform(
              val.updatedAt,
              'dd-MMM-yyyy hh:mm:ss a'
            );
            this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
            console.log("Closed date temp",  this.tempclose );
         
            val.closedDate= this.tempclose;
            var hours_restime = Math.trunc(val.resolutionTime/60);
            var minutes_restime = val.resolutionTime % 60;
            this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
            val.resolutionTime=this.temp_resolutiontime;
            console.log(hours +"Hrs"+ minutes+"mintues");
              // val.updatedAt = this.temp;
          } else {
            // val.updatedAt = '---';
            val.closedDate="---";
            val.resolutionTime='--'
  
          }
        });  

        console.log("value of opentcikets", this.openticketlist);
      });
  }
}
