import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { TicketService } from '../../tickets/components/ticket/ticketservice';
import { ReportService } from '../services/report.service';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [TicketService],
})
export class ReportsComponent implements OnInit {
  reportlabel:any;
  groupTickets:any;
  today:any;
  projectactive:any;
  fromdatechange:any;
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  timeZones : any;
  items: MenuItem[];

  home: MenuItem;
  reportform:FormGroup;
  reports:any;
  statusitems: any;
  projectlist:any;
  groups:any;
  groupbased:any;
  groupagentId:any;
  status:any;
  progressbar:boolean=false;
  
  reportvalue:any;
  selectedproject:any;
  date_period_year: Date;
  date_period_year2: Date;
  Listboxgroupname:any;
  localArray:any[]=[];
  statusvalue:any;
  errormessage:any;
  report:boolean=false;
  values:any;
  groupreportlist:any;
  statuslist:any;
  groupnamearray:any[]=[];
  ProjectPlaceholderText="Select Project Name"
  groupPlaceholderText = 'Group Name';
  Statusname='Select Status';
  Selectgroup="GroupName";
  userrolename:any;
  projectname:any;
  groupname:any;
  constructor(
    private fb : FormBuilder, 
    private ticketService: TicketService,
    private reportService : ReportService,
    private messageService : MessageService,
    public datepipe: DatePipe,
    public shareservice:AuthService
  ) { }

  ngOnInit(): void {
this.report=false;
this. today = new Date().toISOString().split('T')[0];
console.log(this.today);
    this.items = [
    
      {label: 'Reports',},
   
  ];

    this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.userrolename = this.shareservice.getrole();
    
    console.log("ROle",this.userrolename);
    this.projectname = this.shareservice.getprojectName();
    console.log("Projectnamesss",this.projectname);
    this.groupname = this.shareservice.getgroupname();
    console.log("groupname",this.groupname);
    this.groupnamearray.push(this.groupname);

    if (this.userrolename === 'ROLE_PMO' || this.userrolename === 'ROLE_ADMIN') {

      this.report=true

    }else
    {
      this.report=false;
    }

    this.ticketService.getListOfGroups().subscribe((result) => 
    {
    
      console.log('values of tickets getListOfGroups', result);
      this.groupTickets = result;   
   
    }
    );
    this.statusitems = [
      // { statusitems: 'Assigned' },
   
      { statusitems: 'On hold' },
      { statusitems: 'WIP' },
      { statusitems: 'Customer Working' },
      { statusitems: 'Closed' },
      { statusitems: 'Duplicate' },
      { statusitems: 'Resolved' },
      { statusitems: 'Open' },
      { statusitems: 'MergeClosed' },
    ];
    this.reports = [

      {label: 'CuratedReports '    
        },
      

    ];
       this.status = [

      {label: 'open '    
        },
        {label: 'close '    
        },
        {label: 'Wmp '    
      },
      

    ];
    this.timeZones = [
      { format: 'Hours', code: 'Hrs' },
      { format: 'minutes', code: 'Mins' },
      { format: 'days', code: 'Days' },
      { format: 'months', code: 'Mos' },
    ];
    this.reportform = this.fb.group({
      p_period:'',
      t_period:'',
      projectName:'',
      groupName:'',
      status:''
      
    });
    this.getprojectlist();
    this.getListStatus();
    this.get_projectactive();
    
  }

  dob : Date = new Date();

  date9 : any;
  savereport()
 {

 } 
 onChange1(event: any) {
  // console.log('event :' + event);
  
  this.groupagentId = event.value;


  //console.log(this.projectCategoryId);

  console.log("group name",  this.groupagentId);
}

  DownloadFile()
  {
    this.progressbar=true;
   let payload;
   console.log("Projectname",this.projectname);
    var date_period_year_yy_from=this.datepipe.transform(this.date_period_year, 'yyyy-MM-dd');
    var date_period_year_yy_end=this.datepipe.transform(this.date_period_year2, 'yyyy-MM-dd');
    this.isLoading.next(true);
    if (this.userrolename === 'ROLE_PMO' || this.userrolename === 'ROLE_ADMIN') {
       payload={
        p_period:date_period_year_yy_from,
        t_period:date_period_year_yy_end,
        projectName:this.reportlabel,
        groupName: this.groupreportlist,
        status:this.statuslist,
      }
    }else if(this.userrolename==='ROLE_AGENT'|| this.userrolename==='ROLE_GROUP'||
    this.userrolename==='ROLE_SUPERAGENT'){
       payload={
        p_period:date_period_year_yy_from,
        t_period:date_period_year_yy_end,
        projectName:this.projectname ,
        groupName:  null,
        status:this.statuslist,
      }
    }
    
    this.reportService.DownloadSampleFile(payload)
        .subscribe(
          {
            next : (res : any) => {
              this.handleloading(res);
              this.progressbar=false;
              this.reportform.reset();
            },
            error : (err) =>{ 
              this.handleError(err);
              this.errormessage=err.message;
               this.progressbar=false;
             
            }
          });
  }
  onChangeliststatus( report:any,newValue: any) {
  }
  onChange(event: any,onChange:any) {
    // console.log('event :' + event);
    this.reportlabel = onChange
    //console.log(this.projectCategoryId);
   this.reportvalue=event.value;
    console.log("report value" ,    this.reportlabel );
    console.log("report name" ,this.reportvalue);
    this.getgroupbasedproject();
  }
  setDate(e:any){
    console.log("from date value",e.target.value);
    this.fromdatechange=e.target.value;
    
    }
  handleloading(res : any)
  {
    this.isLoading.next(false);
    this.messageService.add(
      {
        severity : 'success',
        summary : 'Success',
        detail : 'Report Downloaded'
      });
      try {
        const blob = new Blob([res.body], {
          type: res.headers.get('Content-Type'),
        });
        const file = new File([blob], this.getFileName(res), {
          type: res.headers.get('Content-Type'),
        });
  
        saveAs(file);
      } catch (err) {
        var textFileAsBlob = new Blob([res.body], {
          type: res.headers.get('Content-Type'),
        });
        const file = new File([textFileAsBlob], this.getFileName(res));
  
        saveAs(file);
      }
      this.isLoading.next(false);
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
  get_projectactive() {
    this.ticketService.getListOfActiveProject().subscribe((res) => {
      this.projectactive = res;
    });
  }
  getFileName(response: any) {
    let name: string;
    try {
      const contentDisposition: string = response.headers.get(
        'content-disposition'
      );
      const [, filename] = contentDisposition.split('filename=');
      name = filename;
    } catch (e) {
      name = 'File_Name_Not_Specified_' + new Date();
    }
    return name;
  }
  handleError(err : any)
  {
    this.isLoading.next(false);
   console.log("message error",err.message);
      if(err.status.toString() === '400')
      {
        this.messageService.add(
          {
            severity : 'error',
            summary : 'Failed',
            detail : 'No Data Found'
          });
    
      }
      else {
        console.log('Error Occured');
        this.messageService.add(
          {
            severity : 'error',
            summary : 'Failed',
            detail : 'Download Failed'
          });
      }
  }
  // getgrouplist()
  // {
 
  //   this.agentService.getListOfAgents().subscribe((data) =>
  //    {
  
  //     this.agents = data;
  //   })
  //    ;
  // }
    getgroupbasedproject() {

    this.ticketService
      .getgroupbasedproject(this.reportvalue)
      .subscribe((res) => {
        this.groupbased = res;
        // this.arr.push(this.groupbased);
        // console.log('arr is', this.arr);
        // console.log('groupbased', this.groupbased);
        // console.log('project id', this.projectCategoryId);
      });
     
  }
  onChangelist(newvalue: any,event:any) {
  
    // if(event.value.checked==true)
    // {
    //   alert("hi");
    // }else
    // {
    //   alert("nt selected");
    // }
   this.Listboxgroupname = newvalue.groupAgentName;
   this.localArray.push(this.Listboxgroupname);;
   console.log("listname",this.Listboxgroupname);
   console.log("arraypush",this.localArray);

   this.groupreportlist=event.value;

 this.Listboxgroupname=event.value.agentName;
    console.log('clicked event :' +this.groupreportlist);
    console.log(this.localArray.push(this.values));

  }
  onChangestatuslist(newvalue: any,event:any) {
  
    // if(event.value.checked==true)
    // {
    //   alert("hi");
    // }else
    // {
    //   alert("nt selected");
    // }
  //  this.Listboxgroupname = newvalue.groupAgentName;
  //  this.localArray.push(this.Listboxgroupname);;
  //  console.log("listname",this.Listboxgroupname);
  //  console.log("arraypush",this.localArray);

   this.statuslist=event.value;

//  this.Listboxgroupname=event.value.agentName;
//     console.log('clicked event :' +this.groupreportlist);
//     console.log(this.localArray.push(this.values));

  }
  getprojectlist() {

    this.ticketService.getListOfPMOValues().subscribe((res) => {

     this.projectlist = res;
  
 
     console.log("project drop down email tickets",this.projectlist);
   

    });
  }
}
