import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

import { TicketService } from './ticketservice';
import { ticket } from './ticketinterface';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import { AgentgroupService } from 'src/app/modules/admin/groups/services/agentgroup.service';
import { errorcodeservice } from 'src/app/modules/errorcode/errorcodeservice';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  providers: [
    TicketService,
    MessageService,
    errorcodeservice,
  ],
})
export class TicketComponent implements OnInit, AfterViewInit {
  sum = 10;


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild('opMenu') op: OverlayPanel | any;
  isLoading: boolean = true;
  
  isDropdownDisabled = false; 

  toggleOverlay = ({ originalEvent }: any) => this.op.toggle(originalEvent);
  showMsg: boolean = true;
  showassignbtn: boolean = true;
  showassignbtnauth: boolean = true;
  isloading: boolean = false;
  checked: boolean = false;
  tickets: any = [];
  groupproject: boolean =true;
  ticketno:any;
  temp_res:any;
  groups: any = [];
  project_id:any;
  projectvalue:any;
progressbar: boolean = false;
  ticketprojectid:any;
  ticketgroup:any;
  projectname:any;
  group_id:any;
  fromaddress:any;
  projectbyid:any;
  mailbody:any;
  projectlabel:any;
  projectlable:any;
  closedarray:any[]=[];
 tempclose:any;
  htmlString: any;
  firstresponse:any;
  groupProjectName:any;
  tickettypedisplay:boolean=false;
  amt = 0;
  groupprojectenable:boolean=false;
  content: any;
  ticketgroupname:any;
  selectedTicketGroupname: any;
  selectedTickets: any;
  selectedTicketsdis: any;
  cols: any;
  statusdropclose:boolean=true;
  statusvalue:any;
  emailHistoryTickets:any;
  checked_radio:boolean=true;
  list:any;
  _selectedColumns: any=[];
  temval: any;
  tempmin:any;
  temp_resolutiontime:any;
  TicketDialog: boolean = false;
  editTicketScreen: boolean = false;
  displayBasic: boolean = false;
  savebtn: boolean = false;
  header: any;
  replyitems: any;
  moreitems: any;
  menuitems: any;
  selectedvalue: any;
  frozenCols: any;
  tempmailbody:any;
  errorMessage: any;
  opPanel: any;
  closedtickets:any[]=[];
  menuItemDisplay: boolean = false;
  actualtarget: any;
  projectId: any;
  groupName: any;
  savemerge:boolean=false;
  projects: any;
  agentitems: any;
  statusitems: any;
  tickettype:any;
  userrole: any;
  emailTickets: any;
  userrolename: any;
  ticketForm!: any;
  visibleSidebar2: any;
  projectCategoryId: any;
  closedhtmlString:any;
  grouplistvalue: any;
  Listboxgroupname: any;
  ticketclosedhistory: any;
  show: boolean = false;
  projectLOV: any;
  showMsggroup: any;
  slamessage: any;
  listCategory: any;
  ticketclosedhistorymailbody:any;
  ticketnoprimary:any;
  groupTickets: any;
  values = '';
  mailbodyarr:number[]=[];
  tableselectedcol:boolean=true;
  arr: number[] = [];
  arr2: number[] = [];
  arr3: number[] = [];
  closedticket: any[] = [];
  sum2:any;
  ticketarray: number[] = [];
  maxNo: boolean = false;
  ticketmerge: Array<{
    ticketNo: number, ticketsubject: string,
    ticketrequestors: string, ticketdate: string, ticketmailbody: string,ticketstatus:string
  }> = [];
  selectedValueradio: any;
  ticket: any;
  showassign: boolean = true;
  emailPlaceholderText = 'Project Name';
  groupPlaceholderText = 'Search by Group Name';
  emailPlaceholder = ' Project Name';
  groupPlaceholder = 'Search by Group Name';
  TicketType='TicketType'
  file: any;
  groupagentId: any;
  progressbar_manual:boolean=false;
  tableselectedcol_priority:boolean=true;
  groupbased: any;
  temp: any;
  scrolled: boolean = false;
  groupNameForUser: any;
  showassigndialog: boolean = false;
  items: MenuItem[];
  Listboxstatus: any;
  valueupdate: any;
  temp1: any;
  selectdate: any;
  projectactive:any;
  ticketsproject:any;
  ticketnoselect: any;
  editingtick: boolean = false;
  editingremove: boolean = false;
  canSubmit: boolean = false;
  checkeddisable: boolean = true;
  home: MenuItem;
  tickettypevalue:any;
  projectName:any
  role: any;
  projectIdForUser: any;
  errorForm: FormGroup;
  projectid: any;
  projectidtk: any;
  projectcheck: any;
  closedticstatus:any;
  primaryticstatus:any;
  errors: any;
  groupname: any;
  groupNameForProject:any;
  groupFromAddress:any;
  ticketform: FormGroup;
  constructor(
    
    private fb: FormBuilder,
    private roleService: errorcodeservice,
    private router: Router,
    private ticketService: TicketService,
    private messageService: MessageService,   
    private shareservice: AuthService,
    private groupService: AgentgroupService,
    private datepipe: DatePipe,
  
  ) { }

  ngAfterViewInit(): void {
    // this.ticketService.getTickets().then((data) => (this.tickets = data));
    // this.ticketService.getListOfEmails().subscribe((data)=> (this.tickets = data));
    this.groupname = this.shareservice.getgroupname();
    console.log(this.groupname);
       // this.projectvalue=JSON.parse(localStorage.getItem('projectnames'));
    //  console.log("values of projectname",     this.projectvalue);
    // if( this.groupname=='{}' || this.groupname == null || this.groupname == undefined)
    // {
    //   alert("groupname no" +this.groupname);
    // }else
    // {
    //   alert("groupname yes" +this.groupname);
    // }
    
    this.getListOfGroup_select();
    this.getBusinessFunctionLOV();
    this.get_projectactive();
    if (this.projectidtk == '0') {
         
      this.getListOfEmail_select();
    
      
    } else if (
      this.projectidtk != '0' &&
      (this.groupname == '{}' ||
        this.groupname == null ||
        this.groupname == undefined)
    ) {
      this.getListOfEmail_selectbyproject();
      // alert("not zero " + this.projectidtk +this.groupname);
    } else if (this.projectidtk != '0' && this.groupname != '{}') {
      this.getListOfEmail_projectidgroupid();
      // alert(this.projectidtk+this.groupname);
    }
  this.getListStatus();
  }

  ngOnInit(): void {
    this.savebtn=false;
    // this.savebtn = false;

    this.role = localStorage.getItem('role');
    // this.getgroupbasedproject();
    this.checked = true;
   //getting auth project id 
    this.projectIdForUser = localStorage.getItem('projectId');
  
    this.getGroupsByProject(this.projectIdForUser);
    //     var projectnames = JSON.stringify(this.projectlable);
    // localStorage.setItem('projectnames', projectnames);
 

    if (this.role === 'ROLE_SUPERAGENT') {
      this.showassignbtn = false;
      this.showassignbtnauth = true;
      this.ticketService
        .getTicketsForSuperAgent(this.projectIdForUser)
        .subscribe((res: any) => {
          this.progressbar=false;
          this.tickets = res;  
          this.tickets.filter((val: any) => {
            this.temp=val.from_Address.replace(/["]+/g, '');
            val.from_Address=this.temp;
            console.log("requestor name",val.from_Address);
            console.log("slaResponseStatus",val.slaResponseStatus);
            this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
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
            this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
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
    } else if (this.role === 'ROLE_GROUP') {
  
      // this.showMsg=true;
      this.groupproject=false;
      this.showassignbtn = false;
      this.showassignbtnauth = true;
      this.groupprojectenable=true;
      this.getgroupbasedbyauth();
 
      this.groupNameForUser = localStorage.getItem('groupName');
    //  alert("groupname"+this.groupNameForUser);
      let payload = {
        projectId: this.projectIdForUser,
        groupName: this.groupNameForUser,
      };

      this.ticketService
        .getTicketsForGroup(payload.projectId, payload.groupName)
        .subscribe((res: any) => {
          this.tickets = res;
          
          console.log("groupbased",this.tickets);
          this.tickets.filter((val: any) => {
            this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
            console.log("requestor name",val.from_Address);
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
            this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
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
        //groupbased project email id and project naame 
     this.ticketService.getProjectDetailsByIdservice(this.projectIdForUser).subscribe((res:any) => {
      this.ticketgroupname = res;
      console.log("projectby id",this.ticketgroupname);
      this.groupFromAddress=this.ticketgroupname.emailAddress;
      this.groupProjectName=this.ticketgroupname.projectName;
      console.log("getProjectDetailsgroup",this.groupProjectName);
      this.projectbyid=this.ticketgroupname.projectId;
    
    });
    //groupbased list by projectIDUser
    // this.ticketService
    //   .getgroupbasedproject(this.projectIdForUser)
    //   .subscribe((res) => {
      
    //     this.groupbased = res;
    //     console.log(this.groupbased);
     
    //   });
         
    } else if (this.role === 'ROLE_USER') {
      this.showassignbtn = false;
      this.showassignbtnauth = false;
      this.ticketService
        .getTicketsForUser(this.projectIdForUser)
        .subscribe((res: any) => {
          this.tickets = res;
          this.tickets.filter((val: any) => {

            console.log("slaResponseStatus",val.slaResponseStatus);
            if(val.slaResponseStatus=='--')
            {
              val.firstResponseTime='--';
              this.temp=val.from_Address.replace(/["]+/g, '');
              val.from_Address=this.temp;
              
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
            this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
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
    } else if (this.role === 'ROLE_AGENT') {
      this.showassignbtnauth = false;
      this.groupNameForUser = localStorage.getItem('groupName');
     

      let payload = {
        projectId: this.projectIdForUser,
        groupName: this.groupNameForUser,
      };

      this.ticketService
        .getTicketsForGroup(payload.projectId, payload.groupName)
        .subscribe((res: any) => {
          this.tickets = res;
          this.tickets.filter((val: any) => {
            this.temp=val.from_Address.replace(/["]+/g, '');
            val.from_Address=this.temp;
            console.log("slaResponseStatus",val.slaResponseStatus);
            if(val.slaResponseStatus=='--')
            {
              val.firstResponseTime='--';
              console.log("requestor name",val.from_Address);
              
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
            this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
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
    this.projectidtk = this.shareservice.getprojectid();
    this.getProjectLOV();
    console.log('ticket screen', this.projectidtk);

    this.errorForm = this.fb.group({
      error_code: '',
      error_name: '',
      error_description: '',
    });
    this.ticketService.getListOfGroups().subscribe((result) => {
      console.log(' values of tickets getListOfGroups', result);
      this.groupTickets = result;
      this.groupTickets.filter((val: any) => {
       
        this.temp = this.datepipe.transform(val.clientCreationDate, 'dd-MMM-yyyy hh:mm:ss a');
        
        val.clientCreationDate = this.temp;
      });
      this.isloading = false;
    });

    this.showMsg = false;
    this.showMsggroup = false;
    this.userrole = this.shareservice.getrole();
    this.userrolename = this.shareservice.getUsername();
    this.projectName = this.shareservice.getprojectName();
    this.project_id=this.shareservice.getprojectid();
    this.group_id=this.shareservice.getgroupname();
    console.log(this.userrolename);
    console.log("Project name",this.projectName,this.project_id);

    if (this.userrole === 'ROLE_PMO' || this.userrole === 'ROLE_ADMIN') {
      this.showMsg = true;
      this.showMsggroup = true;
      this.showassignbtnauth = false;

    } else if (this.userrole == 'ROLE_SUPERAGENT') {
      this.showMsggroup = false;
    } else {
      this.showMsg = false;
    }
    console.log('ticketpage', this.userrole);
    this.ticketform = this.fb.group({
      'projectId':new FormControl(''),   
      'groupName': new FormControl(''),
      'from_Address':new FormControl(''),
      'subject':new FormControl(''),
      'status': new FormControl(''),
      'mailBody': new FormControl('')
    });
    this.statusitems = [
      // { statusitems: 'Assigned' },
      { statusitems: 'Select Status' },
      { statusitems: 'On hold' },
      { statusitems: 'WIP' },
      { statusitems: 'Customer Working' },
      { statusitems: 'Closed' },
      { statusitems: 'Duplicate' },
      { statusitems: 'Resolved' },
      { statusitems: 'Open' },
      { statusitems: 'MergeClosed' },
    ];
    this.tickettype = [
      // { statusitems: 'Assigned' },
 
      { tickettype: 'SR' },
      { tickettype: 'INC' },

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



    this.items = [
      {
        label: 'Tickets',
        routerLink: '/dashboard/tickets',
      },
    ];

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem' };

    this.cols = [
      // { field: 'id', header: 'id' },
      { field: 'tempDate', header: 'Created Date' },
      { field: 'from_Address', header: 'Requestors' },
      { field: 'subject', header: 'Issue Description' },
     { field: 'priority', header: 'Priority' },
      { field: 'ticketNo', header: 'Ticket No' },
      { field: 'groupName', header: 'Group' },
      { field: 'clientClosedDate', header: 'Closed Date' },          
      { field: 'slaResponseStatus', header: 'First Response Status' },
      { field: 'firstResponseDate', header: 'First Response Date ' },
      { field: 'firstResponseTime', header: 'First Response Time ' },
      { field: 'resolutionTime', header: ' Resolution Time ' },
      { field: 'resolutionDate', header: 'Resolution Date ' },
      { field: 'slaResolveStatus', header: 'SLAResolveStatus' },
      { field: 'ticketAge', header: 'Ticket Age' },
      

      // { field: 'to_Address', header: 'To Address' },

      // { field: 'priority', header: 'priority' },

      // { field: 'mailBody', header: 'mailBody' },

      // { field: 'status', header: 'Status' },

      // { field: 'mail_flag', header: 'mail flag' },

      // { field: 'comments', header: 'comments' },
    ];
    this._selectedColumns = [
      { field: 'tempDate', header: 'Created Date' },
      { field: 'priority', header: 'Priority' },
      { field: 'from_Address', header: 'Requestors' },
      { field: 'subject', header: 'Issue Description' },
      { field: 'ticketNo', header: 'Ticket No' },
      { field: 'groupName', header: 'Group' },
      { field: 'clientClosedDate', header: 'Closed Date' },
      // { field: 'slaResponseStatus', header: 'First Response Status' },
      // { field: 'first_RESPONSEON', header: 'First Response Time ' },
      //       { field: 'slaResolveStatus', header: 'slaResolveStatus' },
      // // { field: 'to_Address', header: 'To Address' },

      // { field: 'status', header: 'Status' },

      // { field: 'groupName', header: 'Group' },

      // { field: 'createdAt', header: 'created Date' },
      // { field: 'updatedAt', header: 'UpdatedDate' },

      // { field: 'mailBody', header: 'mailBody' },
    ];
    this.frozenCols = [{ field: 'ticketNo', header: 'TicketNo' }];
   
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
    //restore original order
    //alert(JSON.stringify(val));
    if(JSON.stringify(val)==='[]')
    {
      // alert(null);
      this.tableselectedcol=false;
      this.tableselectedcol_priority=false;
    }else
    {
      this.tableselectedcol=true;
      this.tableselectedcol_priority=true;
    }
   

  }
  getGroupNameLov() {
    this.ticketService.getListOfGroups().subscribe((res) => {
      this.groupTickets = res;  
    });
  }
  isColumnWithFrom(columnField: string, cellValue: any): boolean {
    return typeof cellValue === 'string' && cellValue.startsWith('Medium');
    }

  getStyleClass(id:any) {
    if(id<2) {
     return 'customClass'+id;
    }
    return '';
  }
   //formfieldgetapi
   viewcheckbox()
   {
    this.checked=false;
    this.checked_radio=true;
    alert("view");
   }
  getTicket(isChecked: boolean, ticketNo: any, ticketsubject: any, ticketrequestors: any, ticketdate: any, ticketmailbody: any,ticketstatus:any) {
     this.checked_radio=true;
     this.checked=false;

    console.log("value of ", ticketNo + ":");
    console.log("value of ", ticketsubject + ":");

    console.log("value of ", ticketrequestors + ":");
    console.log("value of ", ticketdate + ":");
    console.log("value of ", ticketmailbody + ":");
    console.log("value of ", ticketstatus + ":");

    if (isChecked == true) {
      this.amt++;

      //  alert(this.amt);
      this.savebtn = true;
      // alert("true" + ticketNo);
      this.ticketmerge.push({
        ticketNo: ticketNo, ticketsubject: ticketsubject,
        ticketrequestors: ticketrequestors, ticketdate: ticketdate, ticketmailbody: ticketmailbody,ticketstatus:ticketstatus
      });
      console.log("ticket merge data",this.ticketmerge);
      console.log("ticketmerge first & second ticket ticket",this.ticketmerge[0].ticketNo,this.ticketmerge[1].ticketNo);
      this.arr2.push(this.ticketmerge[0].ticketNo, this.ticketmerge[1].ticketNo);

      console.log("values", this.arr2[0], this.arr2[1]);
     
       
      this.canSubmit = true;
      // console.log(e.target.disabled);
      var space = 0;
      if (this.ticketmerge.length === 2) {
        this.checked = true;
        this.visibleSidebar2 = true;
      }
      this.content = this.arr.push(ticketNo + ticketsubject + ticketrequestors + ticketdate);
      console.log("No of Ticket Selected", this.content.length);
      var split = this.content.toString();
      var splitvalue = split.split('+');
      console.log("splited value", splitvalue);
      console.log("Pushed Array ", this.arr.toString);
    }
    else {
      this.amt--;
      // alert(this.amt);
      this.ticketmerge.pop();
      this.arr.pop();
      if (this.arr.length === 0) {
        this.savebtn = false;
      }
    
      
    }
   this.sum2=this.arr[0].toString();
      console.log(this.sum2);
    this.amt === 2 ? (this.maxNo = true) : (this.maxNo = false);
  }
  get SumValue() {
  
    console.log("content number",  this.arr.toString);
    this.sum=45;
    return this.sum;
}
  sidenavClosed() {
    this.checked = false;
    const j = this.ticketmerge.length;
    for (var i = 1; i <= j; i++) {
      console.log(i);
      this.ticketmerge.pop();


    }
    this.ngAfterViewInit();
  }
  merge() {

    if (this.ticketmerge[0].ticketNo === this.header) {
      // alert("primary");
      this.ticketclosedhistory = this.ticketmerge[1].ticketNo;
      // this.ticketclosedhistorymailbody=this.ticketmerge[1].ticketNo;
      this.ticketnoselect = this.ticketmerge[0].ticketNo;
      // this.ticketnoprimary=this.ticketmerge[1].ticketmailbody;


      this.messageService.add({ severity: 'success', summary: 'Suceess', detail: 'Primary Ticket is set' });
    } else {
      //alert("closed");
      this.ticketclosedhistory = this.ticketmerge[0].ticketNo;
      this.ticketnoselect = this.ticketmerge[1].ticketNo;
    }
//closed ticket in radio button 
    console.log("ClosedTicket", this.ticketclosedhistory);
        //selected ticket in radio button
        this.closedarray.push(this.ticketclosedhistory);
        console.log("Tciket closed array",this.closedarray)
    console.log("Primaryselect", this.ticketnoselect);
    this.primaryticstatus=this.ticketmerge[0].ticketmailbody;
    this.closedticstatus=this.ticketmerge[1].ticketmailbody;
 
    let closedticket={
      ticketNo:this.ticketclosedhistory
    }
    this.closedtickets.push(closedticket);
    let changestatuspayload = {
  
      projectName: this.projectlable,
      ticketNo:this.ticketnoselect,
      mergeTicket:this.closedtickets
    };
    this.ticketService.mergeticket(changestatuspayload).subscribe({
      next: (val: any) => {


          this.messageService.add({
            severity: 'success',
            summary: this.ticketnoselect +'Merged Sucessfully',

            life: 3000,
          });
          const j = this.ticketmerge.length;
          for (var i = 1; i <= j; i++) {
            console.log(i);
            this.ticketmerge.pop();

          }
          this.visibleSidebar2 = false;
          this.checked =true;
          console.log("popped array ", this.arr.length);
        //  this.router.navigate(['/dashboard/mergeticket',this.ticketnoselect,this.ticketclosedhistory]);
          this.ngAfterViewInit();

       
      },

      error: (err: any) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'error',
          detail: 'Failed to Active User',
          life: 3000,
        });
  
      },
    });



  }
  

  getHistoryApi() {
   
 
    this.ticketService.getHistoryDetailById(this.ticketnoselect)
      .subscribe((result) => {

        this.emailHistoryTickets = result;

        this.emailHistoryTickets.filter((val: any) => {
    
           val.mailBody="--";
        
          this.temp = this.datepipe.transform(val.clientCreationDate, 'dd-MMM-yyyy hh:mm:ss a');
          val.clientCreationDate = this.temp;
          // console.log("values email",val.emailCC);
          // console.log("value of", val.createdAt);
        });

      }
      )
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
    var windowScrollPosition = window.scrollY + 0;
    // if(windowScrollPosition>0)
    // {
    //   this.scrolled = window.scrollY > 0;
    // }
  }

  //Edit ticket by ticket id
  editTicket(ticket: any) {
    // this.editTicketScreen = true;
    this.header = ticket.ticketNo;
   

    this.router.navigate(['/dashboard/tickets', ticket.ticketNo]);
    
  }
  manualticketbtn() {
    this.displayBasic = true;
    this.ticketform.reset();
  }
  updateticket() {
    this.progressbar=true;
    this.progressbar_manual=true;
    if (this.role === 'ROLE_GROUP') {
     this.ticketprojectid= this.projectbyid;
     this.ticketgroup=this.groupNameForUser;
     this.fromaddress=this.groupFromAddress;
    
    
  }else{
      this.ticketprojectid=this.ticketform.controls['projectId'].value;
      this.ticketgroup=this.ticketform.controls['groupName'].value;
     this.fromaddress=this.ticketform.controls['from_Address'].value;
    this.mailbody=this.ticketform.controls['mailBody'].value
    }
    
    let payload={
      projectId: this.ticketprojectid,
      groupName: this.ticketgroup,
      from_Address: this.fromaddress,
      subject:this.ticketform.controls['subject'].value,
      status:this.ticketform.controls['status'].value,
      mailBody:  this.mailbody
      }
      if( payload.mailBody===null)
      {
        this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Remarks Required' });
        this.progressbar=false;
        this.progressbar_manual=false;
      }else if(payload.groupName===null){
        this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'GroupName Required' });
        this.progressbar=false;
        this.progressbar_manual=false;
      }else if(payload.from_Address===null){
        this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'From Address Required' });
        this.progressbar=false;
        this.progressbar_manual=false;
      }else if(payload.subject===null){
        this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Subject Required' });
        this.progressbar=false;
        this.progressbar_manual=false;
      }
      else{
        this.ticketService.createmanualTicket(payload).subscribe(
          {
            next: (value: any) => {
              
              if (value === null) {
                this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
                this.progressbar=false;
                this.progressbar_manual=false;
              }
              else {
                this.displayBasic = false;
                this.progressbar=false;
                this.progressbar_manual=false;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'ManualTicket Created Successfully' });
           
                this.ngAfterViewInit();
              
    
              }
            },
            error: (err) => {
              this.progressbar=false;
              this.progressbar_manual=false;
              this.slamessage = err.error.message;
              this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.slamessage });
            }
          }
        )
      }
// let payload={
//   projectId: this.ticketform.controls['projectId'].value,
//   groupName: this.ticketform.controls['groupName'].value,
//   from_Address:this.ticketform.controls['from_Address'].value,
//   subject:this.ticketform.controls['subject'].value,
//   status:this.ticketform.controls['status'].value,
//   mailBody: this.ticketform.controls['mailBody'].value
// }

   
  }
  //edit merge ticket 
  editTicketsarray(ticket: any) {
    // this.editTicketScreen = true;
    this.savemerge=true;
    this.messageService.add({
      severity: 'success',
      summary: 'Merge - Primary Ticket',
      detail: `${ticket.ticketNo} is Selected as a Primary Ticket `,
      life: 3000,


    });
    this.header = ticket.ticketNo;
  //  alert(this.header);
    // this.router.navigate(['/dashboard/tickets', ticket.ticketNo]);
  }
  menuClick(e: any) {
    console.log(e);
    // this.menuItemDisplay = true;
    this.op.show(e, this.actualtarget);
  }
  editstatus() {
    this.show = true;
  }
  getBusinessFunctionLOV() {
    this.ticketService.getListOfPMOValues().subscribe((res) => {
      this.emailTickets = res;
    });
  }
  get_projectactive() {
    this.ticketService.getListOfActiveProject().subscribe((res) => {
      this.projectactive = res;`  `
    });
  }
  onChangeliststatus2(ticket: any, newValue: any) {
    this.Listboxstatus = newValue.status;
    this.ticket = { ...ticket };

    // console.log(this.ticket.first_RESPONSEON);
    // console.log('onchange', this.ticket.subject);
    console.log('listbox value', this.Listboxstatus);

    let changestatuspayload = {
      ticketNo: ticket.ticketNo,
      status: this.Listboxstatus,
    };

    this.ticketService.activeStatus(changestatuspayload).subscribe({
      next: (val: any) => {

//alert(changestatuspayload.status);
        if (changestatuspayload.status == 'Resolved') {
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
            summary: 'Ticket Status ',
            detail: `${ticket.ticketNo} Status changed to ${ticket.status} `,
            life: 3000,
          });
          this.ngAfterViewInit();
        }
      },

      error: (err: any) => {
        this.isLoading = false;
        this.progressbar=false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'Failed to Active User for the ticket',
          life: 3000,
        });
        this.ngAfterViewInit();
      },
    });
  }

  onChangeliststatus(ticket: any, newValue: any,e:any) {
    console.log("value of ",e);
   
    this.Listboxstatus = newValue.status;
    console.log( "value list box",this.Listboxstatus);
   
    this.ticket = { ...ticket };
   // alert("hi");
    // alert(this.ticket.first_RESPONSEON);
    // console.log('onchange', this.ticket.subject);
     console.log('listbox status chnage', this.Listboxstatus);
    
     let changestatuspayload = {
       ticketNo: ticket.ticketNo,
       status: this.Listboxstatus,
      };
  
    // this.isDropdownDisabled = this.Listboxstatus === 'Closed';
if(this.ticket.first_RESPONSEON===null)
{
  this.messageService.add({
    severity: 'info',
    summary: 'Notification',
    detail: 'Acknowledge the Ticket before Status Change',
    life: 3000,
  });
}else{

  console.log(" Change Status Payload Status: ", changestatuspayload.status);
  console.log(" Change Status Payload TicketNo : ", changestatuspayload.ticketNo);
  
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
            summary: 'Ticket Status',
            detail: `${ticket.ticketNo} Status changed to  ${this.Listboxstatus} `,
            life: 3000,
          });
          this.progressbar=false;
          this.ngAfterViewInit();
         if(this.groupagentId==null){
          this.getListOfEmail();
          this.progressbar=false;
         }else{
          this.getLiistofGroup();
          this.progressbar=false;
         }
        }
      },

      error: (err: any) => {
        this.slamessage = err.error.message;
        this.isLoading = false;
        this.progressbar=false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.slamessage,
          life: 3000,
        });
      //  this.ngAfterViewInit();
      console.log(this.groupagentId);
      if(this.groupagentId==null)
      {
        this.getListOfEmail();
        this.progressbar=false;
      }else{
        this.getLiistofGroup();
        this.progressbar=false;
      }
      },
    });
  }
  }
  ongroupbased() {

    this.getgroupbasedbyauth();
  }
  onChangelist(newValue: any) {

    this.Listboxgroupname = newValue.groupAgentName;

  }
  getMerge()
  {
//alert("merge");
this.checked=false;
this.checked_radio=true;
this.messageService.add({ severity: 'success', summary: 'Select the CheckBox to Merge', detail: 'Please Select the required Checkboxes to Merge' });

  }
  getAssign()
  {
    //alert("kk");
    
this.checked=true;
this.checked_radio=false;

  }
  onChange(event: any,onChange:any) {
  
    this.checked = true;
    this.checked_radio=false;
    this.projectlable= onChange;
    console.log("Project label",this.projectlable);
    // var projectnames = JSON.stringify(this.projectlable);
    // localStorage.setItem('projectnames', projectnames);
    // this.projectvalue=JSON.parse(localStorage.getItem('projectnames'));
    //  console.log("values of projectname",     this.projectvalue);
  
    // alert("hi");
    // console.log('event :' + event);
    this.projectCategoryId = event.value;
    if(this.projectCategoryId===null)
    {
      

  this.ngAfterViewInit();
  this.checked=true;
    }
     
    //console.log(this.projectCategoryId);
 
   
    this.getListOfEmail();
    
    
    // console.log('Project name', event.value);
  }
  
  onChangeproject(event: any,label:any) {
   
     this.projectlabel=label;
   
    console.log("ariab;",label);
    this.projectCategoryId = event.value;
   
    // console.log(event.value,value,this.projectlabel);
    this.getProjectDetailsById();
    this.getgroupbasedproject();
   
    
   
  }
  onChangetickettype(event: any) {
    // console.log('event :' + event);
    this.tickettypevalue = event.value;
    console.log(this.ticketno);
    console.log(this.tickettypevalue);
    let payload = {
      ticketNo: this.ticketno,
      ticketType: this.tickettypevalue,
    };
    this.ticketService.createTicketType(payload).subscribe(
      {
        next: (value: any) => {
          // alert("hi");
          if (value === null) {
            this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Suceess', detail: 'TicketType Changed Successfully' });
            this.tickettypedisplay=false;
            this.ngAfterViewInit();

          }
        },
        error: (err:any) => {
          this.slamessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: "TicketType not changed" });
        }
      }
    )


   
  }
  getProjectDetailsById()
  {
    this.progressbar=true;
    this.ticketService
    .getProjectDetailsByIdservice(this.projectCategoryId)
    .subscribe((res:any) => {
      this.progressbar=false;
      this.ticketsproject = res;
      console.log("getProjectDetailsById",this.ticketsproject.emailAddress);
      
    
    });
   
  }
  onChange1(event: any) {


    this.groupagentId = event.value;
    if(this.groupagentId===null)
    {
     this.getListOfEmail();
  //this.ngAfterViewInit();
    }else{
    this.getLiistofGroup();}
    //console.log(this.projectCategoryId);
    console.log('group name', this.groupagentId);
  }
 
  //for manual ticket project name
  onChangeproj(event: any) {
    // console.log('event :' + event);

    this.groupagentId = event.value;

    // this.getLiistofGroup();
    //console.log(this.projectCategoryId);
    console.log('group name', this.groupagentId);
    this.ticketform.get('from_Address')?.setValue(this.ticketsproject.emailAddress);
    
  }
  getemaildetailsbyid() {
    this.ticketService.getEmailDetailById(this.ticketnoselect)
      .subscribe((result) => {
console.log("result value",result);
        // console.log('values are of', result.mailBody);
        // this.htmlString = result.mailBody;
        // console.log(this.htmlString);
        // this.emailTickets = result;
      }

      )
  }
  getListStatus() {
    this.ticketService.getListOfStatus()
      .subscribe((result) => {
console.log("result of status",result);
this.statusvalue=result;
console.log("sorting value",this.statusvalue.sort((a:any, b:any) => (a.status < b.status ? -1 : 1)));
        // console.log('values are of', result.mailBody);
        // this.htmlString = result.mailBody;
        // console.log(this.htmlString);
        // this.emailTickets = result;




      }

      )
  }
  getclosedticketbyid() {
    this.ticketService.getEmailDetailById(this.ticketclosedhistory)
      .subscribe((result) => {

        // console.log('Closed Mailbody', result);
        this.closedhtmlString = result;
        // console.log("Closed Mailbody",this.closedhtmlString);
        this.emailTickets = result;




      }

      )
      
  }
  //ticket screen display url
  getListOfEmail_select() {
    
    this.progressbar=true;
    this.ticketService.getListOfEmails_select().subscribe((res) => {
   
      this.tickets = res;
      this.progressbar=false;
      // console.log(this.tickets);
      this.tickets.filter((val: any) => {
        this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
console.log(val.from_Address);
this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
console.log("temp value ",this.temp);

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
        

    //  console.log("mailboady",val.mailBody);
    //  this.tempmailbody=this.primaryticstatus+this.closedticstatus;
    // val.mailBody="--";
    // this.tempmailbody=this.primaryticstatus+this.closedticstatus;
    //  val.mailBody=this.primaryticstatus;
          // console.log("mailboady",val.mailBody);
        // this.temp = this.datepipe.transform(
        //   val.clientCreationDate,
        //   'dd-MMM-yyyy hh:mm:ss a'
        // );
        // val.clientCreationDate = this.temp;
        // console.log("first response time",val.firstResponseTime/60);
         this.temp = this.datepipe.transform(
          val.clientCreationDate,
          'dd-MMM-yyyy hh:mm:ss a '
        );
        this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
        val.resolutionDate = this.temp_res;
       

        val.clientCreationDate = this.temp;
        // console.log("TimeZone date",val.clientCreationDate.toUTCString());
        this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
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
  getListOfEmail_selectbyproject() {
    this.progressbar=true;
    this.ticketService
      .getListOfProjectbyid(this.projectidtk)
      .subscribe((res) => {
        this.progressbar=false;
        this.tickets = res;
        // console.log(this.tickets);
        
        this.tickets.filter((val: any) => {
          this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
          console.log("requestor name",val.from_Address);
          this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
          this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
        val.resolutionDate = this.temp_res;
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
            'dd-MMM-yyyy hh:mm:ss a'
          );
          val.clientCreationDate = this.temp;
          console.log(val.updatedAt);
          if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
            var hours_restime = Math.trunc(val.resolutionTime/60);
            var minutes_restime = val.resolutionTime % 60;
            this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
            val.resolutionTime=this.temp_resolutiontime;
            console.log(hours +"Hrs"+ minutes+"mintues");
            // console.log(val.status);
            this.temp = this.datepipe.transform(
              val.updatedAt,
              'dd-MMM-yyyy hh:mm:ss a'
            );
            val.updatedAt = this.temp;
            this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
            console.log("Closed date temp",  this.tempclose );
          
            val.closedDate= this.tempclose;
          } else {
            val.updatedAt = '---';
            val.closedDate='---';
            val.resolutionTime='--'
          }
        });
        this.isLoading = false;
      });
  }
  getListOfEmail_projectidgroupid() {
    this.progressbar=true;
    this.ticketService
      .getListOfProjectbyidgroupbyid(this.projectidtk, this.groupname)
      .subscribe((res) => {
        this.progressbar=false;
        this.tickets = res;
        // console.log(this.tickets);
        this.tickets.filter((val: any) => {
          this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
          console.log("requestor name",val.from_Address);
          this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
          this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
        val.resolutionDate = this.temp_res;
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
            'dd-MMM-yyyy hh:mm:ss a'
          );
          val.clientCreationDate = this.temp;
       
          if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
      
            this.temp = this.datepipe.transform(
              val.updatedAt,
              'dd-MMM-yyyy hh:mm:ss a'
            );
            val.updatedAt = this.temp;
            this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
          console.log("Closed date temp",  this.tempclose );
        
          val.closedDate= this.tempclose;
          
          var hours_restime = Math.trunc(val.resolutionTime/60);
          var minutes_restime = val.resolutionTime % 60;
          this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
          val.resolutionTime=this.temp_resolutiontime;
          console.log(hours +"Hrs"+ minutes+"mintues");
          } else {
            val.updatedAt = '---';
            val.closedDate= '---';
            val.resolutionTime='--';
          }
        });
        this.isLoading = false;
      });
  }

  getListOfGroup_select() {
    this.ticketService.getListOfGroup_select().subscribe((res) => {
      this.groups = res;

      // console.log(this.groups);
      this.groups.filter((val: any) => {
        if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
   
          this.temp = this.temp = this.datepipe.transform(
            this.file,
            'dd-MMM-yyyy hh:mm:ss a'
          );
          val.clientCreationDate = this.temp;
          this.valueupdate = val.updatedAt;
          this.temp = this.datepipe.transform(
            this.valueupdate,
            'dd-MMM-yyyy hh:mm:ss a'
          );

          val.updatedAt = this.temp;
          this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
          console.log("Closed date temp",  this.tempclose );
        
          val.closedDate= this.tempclose;
        } else {
          this.file = val.clientCreationDate;

          this.temp = this.temp = this.datepipe.transform(
            this.file,
            'dd-MMM-yyyy hh:mm:ss a'
          );
          this.temval = this.temp = this.datepipe.transform(
            val.updatedAt,
            'dd-MMM-yyyy hh:mm:ss a'
          );
          val.clientCreationDate = this.temp;
          val.updatedAt = this.temval;
          val.updatedAt = '---';
          val.closedDate='---'
        }
      });
      this.isLoading = false;
    });
  }

  getListOfEmail() {
    this.progressbar=true;
    this.getgroupbasedproject();
    if(this.userrole==='ROLE_SUPERAGENT')
    {
     this.projectname=this.project_id
    }else
    {
      this.projectname=this.projectCategoryId
    }
    this.ticketService
      .getListOfEmails(this.projectname)
      .subscribe((res) => {
     
        this.tickets = res;
        this.progressbar=false;
       
        this.tickets.filter((val: any) => {
          this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
          console.log("requestor name",val.from_Address);
          this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
          this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');  
          console.log("requestor name",val.from_Address);    
        val.resolutionDate = this.temp_res;
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
            'dd-MMM-yyyy hh:mm:ss a'
          );
          val.clientCreationDate = this.temp;
          this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
          val.first_RESPONSEON= this.firstresponse;
          // console.log(val.updatedAt);
          if ((val.status === 'Closed') || (val.status === 'MergeClosed')) {
            // console.log(val.status);
            this.temp = this.datepipe.transform(val.updatedAt, 'dd-MMM-yyyy hh:mm:ss a');
            val.updatedAt = this.temp;
            this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
            console.log("Closed date temp",  this.tempclose );
          
            val.closedDate= this.tempclose;
            var hours_restime = Math.trunc(val.resolutionTime/60);
            var minutes_restime = val.resolutionTime % 60;
            this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
            val.resolutionTime=this.temp_resolutiontime;
            console.log(hours +"Hrs"+ minutes+"mintues");
            
          } else {
            val.updatedAt = '---';
            val.closedDate='----';
            val.resolutionTime='--';
          }
        });
        this.progressbar=false;
      });
  
  }

  getgroupbasedproject() {
    this.progressbar_manual=true;
    if(this.userrole==='ROLE_SUPERAGENT' )
    {
     this.projectname=this.project_id
    }else
    {
      this.projectname=this.projectCategoryId
    }
    this.ticketService
      .getgroupbasedproject(this.projectname)
      .subscribe((res) => {
        this.progressbar_manual=false;
        this.groupbased = res;
     
     
      });
     
  }

  getgroupbasedbyauth() {
    this.progressbar=true;
    this.ticketService
      .getgroupbasedproject(this.projectidtk)
      .subscribe((res) => {
   
        this.groupbased = res;
        this.progressbar=false;
        // this.arr.push(this.groupbased);
        // console.log('arr is', this.arr);
        // console.log('groupbased', this.groupbased);
        // console.log('project id', this.projectCategoryId);
      });
  }


  getLiistofGroup() {
    this.progressbar=true;
    this.ticketService.getListOfGroup(this.groupagentId).subscribe((res) => {
      this.progressbar=false;
      this.tickets = res;
      // console.log("this groups", this.tickets);
      this.tickets.filter((val: any) => {
        this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
        this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
        console.log("requestor name",val.from_Address);
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
        this.temp_res = this.datepipe.transform(val.resolutionDate, 'dd-MM-yyyy ');      
        val.resolutionDate = this.temp_res;
        
        this.temp = this.datepipe.transform(val.clientCreationDate, 'dd-MMM-yyyy hh:mm:ss a');
        console.log("value of",this.temp);
        val.clientCreationDate = this.temp;
        this.temp = this.datepipe.transform(val.resolutionDate, 'dd-MMM-yyyy a');
        console.log("value of",this.temp);
        val.resolutionDate = this.temp;
        if ((val.status === 'Closed') || (val.status === 'MergeClosed ')) {
          // console.log(val.status);
          this.temp = this.datepipe.transform(
            val.updatedAt,
            'dd-MMM-yyyy hh:mm:ss a'
          );
          val.updatedAt = this.temp;
          this.tempclose = this.datepipe.transform(val.closedDate, 'dd-MMM-yyyy hh:mm:ss a'   );
          console.log("Closed date temp",  this.tempclose );
        
          val.closedDate= this.tempclose;
          this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
          val.first_RESPONSEON= this.firstresponse;

          var hours_restime = Math.trunc(val.resolutionTime/60);
          var minutes_restime = val.resolutionTime % 60;
          this.temp_resolutiontime=hours_restime +"Hr"+ ":"+minutes_restime+"Min";    
          val.resolutionTime=this.temp_resolutiontime;
          console.log(hours +"Hrs"+ minutes+"mintues");
        } else {
          val.updatedAt = '---';
          val.closedDate='----';
          val.resolutionTime='--'
        }
      });
     // const values = this.tickets.values();
    })
  }
  saveErrors() {
    this.roleService.createErrorCode(this.errorForm.value).subscribe({
      next: (value: any) => {
        if (value === null) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Required',
            detail: 'Fill All Mandatory Fields',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Suceess',
            detail: 'Error Code Created Successfully',
          });
          this.ngAfterViewInit();
          this.TicketDialog=false;
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        }
        
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: this.errorMessage,
        });
      },
    });
  }

  getProjectLOV() {
    this.groupService.getAllGroups().subscribe((res: any) => {
      this.projectLOV = res;
      // console.log('Project values', this.projectLOV);
    });
  }

  assignTickets() {
    this.progressbar=true;
    let delbasepayload = {
      groupName: this.Listboxgroupname,
      projectId: this.selectProjectId,
      ticketNo: this.selectTicketNo,
    };
    this.ticketService.assignTo(delbasepayload).subscribe({
      next: (value) => {
        this.showassigndialog = true;
        this.progressbar=false;
        if (value == null) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Required',
            detail: 'Fill All Mandatory Fields',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Assigned Successfully',
          });
          this.progressbar=false;
          // this.getListOfEmail();
          if(this.role === 'ROLE_ADMIN')
          {
            this.getListOfEmail();
          }else if(this.role==='ROLE_GROUP')
          {
           this.getgroupbaseduser();
          }else
          {
            this.getListOfEmail();
          }
       
        }
      },
      error: (err) => {
        this.progressbar=false;
        this.errorMessage = err.error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: this.errorMessage,
        });
      },
    });
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

  editTickets(ticket: ticket) {
    //this.TicketDialog= true;
    this.tickettypedisplay=true;
   //alert("hi");
   this.checked_radio=false;
   this.checked=true;

    console.log(this.tickettypevalue);
    this.ticket = { ...ticket };
    this.selectProjectId = this.ticket.projectId;
    this.ticketno=this.ticket.ticketNo;

    this.arr.push(this.selectProjectId);
    // console.log('arr is', this.arr);

    this.selectTicketNo = this.ticket.ticketNo;
    this.selectedTicketGroupname = this.ticket.groupName;
    // console.log('selectProjectId', this.selectProjectId);
    // console.log('selectTicketNo', this.selectTicketNo);
    console.log('selectedTicketGroupname', this.selectedTicketGroupname);
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
  getgroupbaseduser()
  {
    this.progressbar=true;
    this.ticketService
    .getTicketsForGroup(this.project_id,this.group_id)
    .subscribe((res: any) => {
      this.tickets = res;
      this.progressbar=false;
      console.log("groupbased",this.tickets);
      this.tickets.filter((val: any) => {
        this.temp=val.from_Address.replace(/["]+/g, '');
val.from_Address=this.temp;
        console.log("requestor name",val.from_Address);
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
        this.firstresponse=this.datepipe.transform(val.first_RESPONSEON,'dd-MMM-yyyy hh:mm:ss a');
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

  getGroupsByProject(id: number) {
    this.projectId = localStorage.getItem('projectId');
    let pay = {
      projectId: this.projectId
    }

    this.ticketService.getGroupByProject(pay.projectId)
      .subscribe({
        next: (res: any) => {
          console.log('Gr', res);
        },
        error: (err: any) => {
          console.error('Er', err);
        }
      })
  }


}
