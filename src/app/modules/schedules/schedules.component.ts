import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { projectService } from '../project/project.service';
import { TicketService } from '../tickets/components/ticket/ticketservice';
import { ReportService } from '../reports/services/report.service';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  providers: [projectService,TicketService, MessageService,ConfirmationService],
})
export class SchedulesComponent implements OnInit {
  items: MenuItem[];
  Listboxgroupname:any;
  switchmodel="Y";
  value: any;
  isLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  localArray:any[]=[];
  groupreportlist:any;
  statusClientname:any;
  progressbar:boolean=false;
  groupScheduler:any;
  reportformatValue:any;
  time:any;
  weaklysec:any;
  statuslist:any;
  editclientName:any;
  editprojectName:any;
  editSchedulerList:any;
  statusProjectName:any;
  project_value:any;
  displayScheduleredit:boolean=false;
  statusvalue:any;
  inpSwitch:any;
  timesec:any;
  home: MenuItem;
  schedulesForm:FormGroup;
  schedulesFormEdit:FormGroup;
  ClientListLov_active:any;
  checkedvalue:boolean=false;
  schedulerservices:any[]=[];
  statusname:any;
  errormessage:any;
  weeklyscheduler:any;
  inpSwitchVal:any;
  weeklyschedulerarray:any[]=[];
  schdulerlist:any;

  slaservicestatusarray:any[]=[]
  slaservicestatusarrayWeekly:any[]=[]
  slaservicestatusarrayGroup:any[]=[]
  weekly:any;
  displayScheduler:boolean=false;
  id:any;
  statusscheduler:any;
  scheduler_status_Name:any;
  projectNamearray:any[]=[];
  allChecked = false;
  fromdate:boolean=false;
  statuslistarr:any[]=[];
  StatusGrouparray:any[]=[];
  description:any;
  schedulerArrayservices:any[]=[];
  schedulerservicesGroup:any[]=[];
  groupChoose:boolean=false;
  progressbar_scheduler:boolean=false;
  clientid:any;
  reportFormat:any;
  reportType:any;
  client_id:any;
  sendTo:any;
  statusarray:any[]=[];
  cols:any[]=[];
  projectlist:any;
  projectactive:any;
  ProjectPlaceholderText:any;
  statusScheduler:any;
  projectlabel:any;
  projectvalue:any;
  groupbased:any;
  items_weekly:any;
  items_daily:any[]=[];
  ClientPlaceholderText:any;
  gfg: boolean = true; 
checked: any;
Y: any;
  constructor(
    private fb : FormBuilder,
    private projectService: projectService,
    private ticketService: TicketService,
    private reportService : ReportService,
    private messageService : MessageService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.inpSwitchVal='Y';
  
    this.value = true;
    this.ClientPlaceholderText='Client Name';
    this.ProjectPlaceholderText='Project Name';
    this.items = [
    
      {label: 'Scheduler',},
      
   
  ];
  this.items_daily = [
    
    {label: 'Daily_Report',},
    {label: 'Daily_Group_Report',},
    {label: 'Date_Range_Report',},
 
];
  this.items_weekly= [
    
    {label: 'Weekly',},
  
 
];
  this.cols = [ 
   
    { field: "scheduler_status_Name", header: "Last Name" }, 
    
  ]; 
  this.weekly = [

    {scheduler_WeeklyName: 'Mon' },
    {scheduler_WeeklyName: 'Tue' },
    {scheduler_WeeklyName: 'Wed'},
    {scheduler_WeeklyName: 'Thu'},
    {scheduler_WeeklyName: 'Fri'},
    {scheduler_WeeklyName: 'Sat'},
    {scheduler_WeeklyName: 'Sun'},

    

  ];
  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
  this.schedulesForm = this.fb.group({
    scheduler_Id:'',
    clientName:'',
    projectName:'',
    groupName:'',
    status:'',
    weakly:'',
    fromDate:'',
    stillDate:'',
    description:'',
    sendTo:'',
    time:'',
    isActive:'',
    reportType:'',
    reportFormat:'',
    emailCC:'',
    subject:''

    
  });
  this.schedulesFormEdit = this.fb.group({
    scheduler_Id:'',
    clientName:'',
    projectName:'',
    groupName:'',
    status:'',
    weakly:'',
    fromDate:'',
    stillDate:'',
    description:'',
    sendTo:'',
    time:'',
    isActive:'',
    reportType:'',
    reportFormat:'',
    emailCC:'',
    subject:''

    
  });
this.getSchedulerlist();
this.getClientListactive();
this.get_projectactive();
this.getListOfStatus();
  }
  getClientListactive() 
  {
    this.progressbar=true;
    this.projectService.getListofClient_activeList().subscribe((res) => 
    {this.ClientListLov_active = res;
      this.progressbar=false;
    
    console.log("client active",this.ClientListLov_active);
  });
  }
  get_projectactive() {
    this.progressbar=true;
    this.ticketService.getListOfActiveProject().subscribe((res) => {
      this.projectactive = res;
      this.progressbar=false;
      console.log("projectment",this.projectactive);
    });
  }
  getSchedulerlist()
  {
    this.progressbar=true;
    this.reportService.getSchedilerlist().subscribe((res:any) => 
    {
      this.schdulerlist = res;
      this.progressbar=false;
      this.isLoading.next(false);
    console.log(" schdulerlist",this.schdulerlist);
  });
  }
  clickBonusChecked(e:any)
  {
    console.log("value is",e.checked);
  }
  showDialog()
  {
    this.inpSwitch='Y';
    
    this.displayScheduler=true;
    this.checkedvalue=false;

    this.groupChoose=false;
    
    this.statuslistarr.length=0;
   // this.statusScheduler.length=0;
    this.weeklyschedulerarray.length=0;
   
  

  }
  close()
  {
    //alert("hi");
    this.schedulesForm.get('clientName')?.reset();
    this.schedulesForm.get('projectName')?.reset();
    this.schedulesForm.get('description')?.reset();
    this.schedulesForm.get('fromDate')?.reset();
    this.schedulesForm.get('time')?.reset();
    this.schedulesForm.get('sendTo').reset();
    this.schedulesForm.get('reportFormat').reset();
    this.schedulesForm.get('emailCC').reset();
    this.schedulesForm.get('subject').reset();
    
    this.fromdate=false;
    this.StatusGrouparray.length=0;
    this.schedulerservicesGroup.length=0;
    this.projectNamearray.length=0;
    // this.schedulesForm.reset();
    this.weeklyschedulerarray.length=0;
    // this.schedulerArrayservices.length=0;
   

  }

  editScheduler(scheduler:any)
  {
   console.info("values",scheduler);
    this.statuslistarr.length=0;
    this.weeklyschedulerarray.length=0;
    this.StatusGrouparray.length=0;
    this.editSchedulerList= { ...scheduler };
    console.log(  "editScheduler",  scheduler);
    console.log("sendto value",this.editSchedulerList);
    if(this.editSchedulerList.reportFormat==='Daily_Report')
    {
      this.groupChoose=false;
      this.fromdate =false;
    }else if(this.editSchedulerList.reportFormat==='Daily_Group_Report')
    {
      this.groupChoose=true;
      this.fromdate =false;
    }else if(this.editSchedulerList.reportFormat==='Date_Range_Report'){
      this.groupChoose=true;
      this.fromdate =true;
    }
    this.displayScheduleredit=true;
   
this.statusClientname=this.editSchedulerList.clientName;
this.statusProjectName=this.editSchedulerList.projectName;
console.log("projectname",this.statusProjectName);

//status
this.statusScheduler=this.editSchedulerList.schedulerStatus;
this.weeklyscheduler=this.editSchedulerList.schedulerDay;
this.groupScheduler=this.editSchedulerList.schedulerGroup;
this.time=this.editSchedulerList.time;
this.sendTo=this.editSchedulerList.sendTo;
this.description=this.editSchedulerList.description;
this.reportType=this.editSchedulerList.reportType;
this.reportFormat=this.editSchedulerList.reportFormat;
//this.schedulesForm.get("time").setValue(this.time);
this.schedulesForm.get("sendTo").setValue(this.sendTo);
this.groupScheduler.forEach((x:any)=>{
  let payload={
    scheduler_id:x.scheduler_id,
    scheduler_GroupName:x.scheduler_GroupName
  }
  this.StatusGrouparray.push(payload);
});
 
    this.statusScheduler.forEach((x:any)=>{
let payload={
  //scheduler_status_Id:x.scheduler_status_Id,
  scheduler_status_Name:x.scheduler_status_Name
}
this.statuslistarr.push(payload);
    });
    this.weeklyscheduler.forEach((x:any)=>{
      let payload={
      //  scheduler_weeklyId:x.scheduler_weeklyId,
        scheduler_WeeklyName:x.scheduler_WeeklyName
      }
      this.weeklyschedulerarray.push(payload);
    })
console.log("edit value",this.statuslistarr);
// var fromdate=this.datepipe.transform(this.editSchedulerList.fromDate, 'dd-MM-yyyy');
// var enddate=this.datepipe.transform(this.editSchedulerList.stillDate, 'dd-MM-yyyy');
//  console.log("Date",fromdate,enddate);
        this.schedulesFormEdit.patchValue(
      {
        scheduler_Id: this.editSchedulerList.scheduler_Id,
        sendTo:this.editSchedulerList.sendTo,
        description:this.editSchedulerList.description,
        clientName:this.editSchedulerList.clientName,
        projectName:this.editSchedulerList.projectName,
        schedulerGroup:this.editSchedulerList.schedulerGroup,      
        fromDate:this.editSchedulerList.fromDate,
        stillDate:this.editSchedulerList.stillDate,        
        time:this.editSchedulerList.time,
        schedulerStatus:'',
        schedulerDay:'',        
        isActive:this.editSchedulerList.isActive,
        reportType:this.editSchedulerList.reportType,
        reportFormat:this.editSchedulerList.reportFormat,
        emailCC:this.editSchedulerList.emailCC,
        subject:this.editSchedulerList.subject,

        

      });
      this.getprojectnameBYClientName(this.editSchedulerList.clientName)
this.getGroupBasedByProjectName(this.statusProjectName);
  }
  all(value: boolean) {
    console.log(value);
    if(value==true)
    {
    this.allChecked = true;
    this.statuslistarr = this.schedulerArrayservices.map(m => ({ ...m, checked: true }));
    
  }else{
   this.allChecked = false;
    this.statuslistarr .length=0;
  }
  }
  getListOfStatus() {
    this.progressbar=true;
    this.ticketService.getListOfStatus()
      .subscribe(
        (result) => {
          this.progressbar=false;
          this.statusscheduler = result;
          console.log("status",this.statusscheduler);
            this.statusscheduler.filter((val: any) => {
          console.log("statussla sec",val.status);
          this.scheduler_status_Name=val.status,
          this.id=val.id

          let payload ={
            //sla_status_Id:this.id,
            scheduler_status_Name:this.scheduler_status_Name,
           // sla_type:this.sla_type
           }
           this.schedulerArrayservices.push(payload);
           console.log("schudler aray",this.schedulerArrayservices);
           let addpayload={
            scheduler_status_Name:this.scheduler_status_Name,
          }
          this.schedulerservices.push(addpayload);
          });
          
          console.log("slapolicy tech",this.schedulerservices);
        })
       
  }
  report_format(event:any)
  {
    console.log("reportformat",event.value);
    this.reportformatValue=event.value;
    if(event.value==='Date_Range_Report')
    {
      this.fromdate=true;
      this.groupChoose=true;
    }else if(event.value==='Daily_Report')
    {
      this.groupChoose=false;
      this.fromdate=false;
    }else if(event.value==='Daily_Report')
    {
      this.fromdate=false;
      this.groupChoose=true;
    }
    else{
      this.fromdate=false;
      this.groupChoose=true;
    }
  }
  onChangeservice(checked:any, item:any)
  {
    console.log("va;ue",item);
     this.allChecked=false;
    if (checked) {

      this.statuslistarr.push(item);
    } else {
      let removeIndex = this.statuslistarr.findIndex(
        (itm:any) => (itm.scheduler_status_Name === item.scheduler_status_Name)
      );
      if (removeIndex !== -1) this.statuslistarr.splice(removeIndex, 1);
    }
    console.log(this.statuslistarr);
  }

  isItemSelected(itemId: number): boolean {
   

    for (var i = 0; i < this.statuslistarr.length; i++) {

      if ((this.statuslistarr[i].scheduler_status_Name === itemId) && (this.statuslistarr[i].scheduler_status_Name ) ) {
        
        return true;
       
      }
    }
  }
  isItemSelected_group(itemId: number): boolean {
   

    for (var i = 0; i < this.StatusGrouparray.length; i++) {

      if ((this.StatusGrouparray[i].scheduler_GroupName === itemId) && (this.StatusGrouparray[i].scheduler_GroupName ) ) {
        return true;
      }
    }
  }
  isItemSelected_weekly(itemId: number): boolean {
   

    for (var i = 0; i < this.weeklyschedulerarray.length; i++) {

      if ((this.weeklyschedulerarray[i].scheduler_WeeklyName === itemId) && (this.weeklyschedulerarray[i].scheduler_WeeklyName ) ) {
        return true;
      }
    }
  }
  // isItemSelectedadd(itemId: number): boolean {
   

  //   for (var i = 0; i < this.slaaddservice.length; i++) {

  //     if ((this.slaaddservice[i].sla_status_Name === itemId) && (this.slaaddservice[i].sla_status_Name ) ) {
  //       return true;
  //     }
  //   }
  // }

  onChangeserviceWeekly(checked:any, item:any)
  {
    console.log("va;ue",item);
    if (checked) {
      this.weeklyschedulerarray.push(item);
    } else {
      let removeIndex = this.weeklyschedulerarray.findIndex(
        (itm:any) => (itm.scheduler_WeeklyName === item.scheduler_WeeklyName)
      );
      if (removeIndex !== -1) this.weeklyschedulerarray.splice(removeIndex, 1);
    }
    console.log(this.slaservicestatusarrayWeekly);
  }
  onChangeserviceGroup(checked:any, item:any)
  {
    if (checked) {
      this.StatusGrouparray.push(item);
    } else {
      let removeIndex = this.StatusGrouparray.findIndex(
        (itm:any) => (itm.scheduler_GroupName === item.scheduler_GroupName)
      );
      if (removeIndex !== -1) this.StatusGrouparray.splice(removeIndex, 1);
    }
    console.log(this.StatusGrouparray);
  }
  onChange(event: any,onChange:any) {
    this.projectNamearray.length=0;
    console.log('event :' + event);
    this.clientid = onChange
    console.log("label client",this.clientid);
   this.client_id=event.value;
   console.log("value of onchange",this.client_id);
   this.getprojectnameBYClientName(event.value);
  // this.statusProjectName=" ";
   //this.projectvalue.clear();
  // this.getprojectnameBYClientID(this.client_id);
  }
  onChangeproject_editproject(event:any)
  {
    console.log("event value",event.value);
    this.schedulerservicesGroup.length=0;
    this.StatusGrouparray.length=0;
    this.project_value=event.value;
    this.getGroupBasedByProjectName(event.value);
       
  }
  getGroupBasedByProjectName(event:any)
  {
    this.ticketService
    .getgroupbasedprojectbyProjectName(event)
    .subscribe((res) => {
      this.groupbased = res;
      this.groupbased.filter((val: any) => {
        let payload ={
          //sla_status_Id:this.id,
          scheduler_GroupName:val.groupAgentName,
         // sla_type:this.sla_type
         }
         this.schedulerservicesGroup.push(payload);
      });
      // this.arr.push(this.groupbased);
      // console.log('arr is', this.arr);
      // console.log('groupbased', this.groupbased);
      // console.log('project id', this.projectCategoryId);
    });
  }
  onChangeproject(event: any,onchage1:any)
  {
this.schedulerservicesGroup.length=0;
this.projectlabel = onchage1;

console.log(this.projectlabel);
    console.log(this.projectlabel);
   this.projectvalue=event.value;
   // console.log("report value" ,    this.projectlabel );
    console.log("report name" ,this.projectvalue);

    this.getgroupbasedproject();
  }
  getgroupbasedproject() {
    this.progressbar_scheduler=true;
    this.ticketService
      .getgroupbasedprojectbyProjectName(this.projectvalue)
      .subscribe((res) => {
        this.progressbar_scheduler=false;
        this.groupbased = res;
        this.groupbased.filter((val: any) => {
          let payload ={
            //sla_status_Id:this.id,
            scheduler_GroupName:val.groupAgentName,
           // sla_type:this.sla_type
           }
           this.schedulerservicesGroup.push(payload);
        });
        // this.arr.push(this.groupbased);
        // console.log('arr is', this.arr);
        // console.log('groupbased', this.groupbased);
        // console.log('project id', this.projectCategoryId);
      });
     
  }
  getprojectnameBYClientID(value:any)
  {
    console.log(value);
    this.projectService.getprojectsByClientId(value).subscribe((res) => {
      this.projectlist = res;
      console.log("projectbtclientid",this.projectlist);
      this.projectlist.filter((val: any) => {
        console.log("projectname",val.projectName);
        let payload={
          projectName:val.projectName,
          projectid:val.projectId
        }
        this.projectNamearray.push(payload);
        console.log("project section",this.projectNamearray);
      });

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
  handleloading(res : any)
  {

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
schedulesForm_download()
{
//   this.schedulesForm.value.reportFormat='Daily_Report';
// console.log(this.schedulesForm.value.reportFormat);
if(this.schedulesForm.value.reportFormat==='' || this.schedulesForm.value.reportFormat===null)
{
  this.schedulesForm.value.reportFormat='Daily_Report';
  this.messageService.add({ severity: 'error', summary: 'Invalid', detail:'Should fill the mandatory field: ReportFormat' });
  
}

else  if(this.schedulesForm.value.reportFormat=='Daily_Report')
  {
    

  let payload={

    clientName:this.clientid,
    projectName:this.projectvalue,
    isActive:this.schedulesForm.value.isActive,
    time:this.schedulesForm.value.time, 
    sendTo:this.schedulesForm.value.sendTo,    
    description:this.schedulesForm.value.description,
    schedulerStatus:this.statuslistarr,  
    schedulerDay:this.weeklyschedulerarray,
    reportType:'Weekly',
    reportFormat:this.schedulesForm.value.reportFormat,
    emailCC:this.schedulesForm.value.emailCC,
    subject:this.schedulesForm.value.subject,
  }
  console.log(payload)
  this.progressbar=true;
  this.progressbar_scheduler=true;
  this.reportService.SchedulerDownload(payload)
  .subscribe(
    {
      next : (res : any) => {
        this.progressbar=false;
       // this.handleloading(res);
       this.progressbar_scheduler=false;
       this.displayScheduler=false;
       this.getSchedulerlist();
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'successfully Scheduler Added' });
      
      },
      error:(err:any)=>
      {
       // this.handleError(err);
       console.log(err);
       this.progressbar_scheduler=false;
        this.errormessage=err.error.message;
         this.progressbar=false;
         this.messageService.add({ severity: 'error', summary: 'Invalid', detail:this.errormessage }
         );
      }
    });
}
else if(this.schedulesForm.value.reportFormat=='Daily_Group_Report')
{
  let payload={

    clientName:this.clientid,
    projectName:this.projectvalue,
    isActive:this.schedulesForm.value.isActive,
    time:this.schedulesForm.value.time, 
    sendTo:this.schedulesForm.value.sendTo,    
    description:this.schedulesForm.value.description,
    schedulerStatus:this.statuslistarr,
    schedulerDay:this.weeklyschedulerarray,
    reportType:'Weekly',
    reportFormat:this.schedulesForm.value.reportFormat,
    schedulerGroup:this.StatusGrouparray,
    emailCC:this.schedulesForm.value.emailCC,
     subject:this.schedulesForm.value.subject
  }
  console.log(payload)
  this.progressbar=true;
  this.progressbar_scheduler=true;
  this.reportService.SchedulerDownload(payload)
  .subscribe(
    {
      next : (res : any) => {
        this.progressbar=false;
       // this.handleloading(res);
       this.displayScheduler=false;
       this.progressbar_scheduler=false;
       this.getSchedulerlist();
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'successfully Scheduler Added' });

      },
      error:(err)=>
      {
       // this.handleError(err);
        this.errormessage=err.error.message;
        this.progressbar_scheduler=false;
         this.progressbar=false;
         this.messageService.add({ severity: 'error', summary: 'Invalid', detail:   this.errormessage });
      }
    });
}else if(this.schedulesForm.value.reportFormat=='Date_Range_Report'){
  let payload={

    clientName:this.clientid,
    projectName:this.projectvalue,
    isActive:this.schedulesForm.value.isActive,
    fromDate:this.schedulesForm.value.fromDate,
    time:this.schedulesForm.value.time, 
    sendTo:this.schedulesForm.value.sendTo,    
    description:this.schedulesForm.value.description,
    schedulerStatus:this.statuslistarr,
    schedulerDay:this.weeklyschedulerarray,
    reportType:'Weekly',
    reportFormat:this.schedulesForm.value.reportFormat,
    schedulerGroup:this.StatusGrouparray,
    emailCC:this.schedulesForm.value.emailCC,
    subject:this.schedulesForm.value.subject
  }
  console.log(payload)
  this.progressbar=true;
  this.progressbar_scheduler=true;
  this.reportService.SchedulerDownload(payload)
  .subscribe(
    {
      next : (res : any) => {
        this.progressbar=false;
       // this.handleloading(res);
       this.displayScheduler=false;
       this.progressbar_scheduler=false;
       this.getSchedulerlist();
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'successfully Scheduler Added' });

      },
      error:(err)=>
      {
       // this.handleError(err);
        this.errormessage=err.error.message;
         this.progressbar=false;
         this.progressbar_scheduler=false;
         this.messageService.add({ severity: 'error', summary: 'Invalid', detail:   this.errormessage });
      }
    });
}
 


}
getprojectnameBYClientName(value:any)
{
  console.log(value);
  this.progressbar=true;
  this.progressbar_scheduler=true;
  this.projectService.getprojectsByClientName(value).subscribe((res) => {
    this.progressbar_scheduler=false;
    this.projectlist = res;
    console.log("projectbtclientid",this.projectlist);
    this.projectlist.filter((val: any) => {
      console.log("projectname",val.projectName);
      let payload={
        projectName:val.projectName,
        projectid:val.projectId
      }
      this.projectNamearray.push(payload);
      this.progressbar=false;
     
      console.log("project section",this.projectNamearray);
    });

  });
}
schedulesForm_download_edit()
{
  if(this.schedulesFormEdit.value.reportFormat==='Daily_Report')
  {
    
  if(this.schedulesFormEdit.value.clientName===null || this.schedulesFormEdit.value.clientName===undefined)
  {
    this.editclientName=this.statusClientname;
  }else
  {
    this.editclientName=this.clientid;
  }
  if(this.schedulesFormEdit.value.projectName===null || this.schedulesFormEdit.value.projectName===undefined)
  {
    this.editprojectName=this.statusProjectName;
  }else
  {
    this.editprojectName=this.projectvalue;
  }
  let payload={
    scheduler_Id:this.schedulesFormEdit.value.scheduler_Id,
    clientName:this.schedulesFormEdit.value.clientName,
    projectName: this.schedulesFormEdit.value.projectName,
    time:this.schedulesFormEdit.value.time,
    // fromDate:this.schedulesFormEdit.value.fromDate,
    sendTo:this.schedulesFormEdit.value.sendTo,
    isActive:this.schedulesFormEdit.value.isActive,
    // stillDate:this.schedulesFormEdit.value.stillDate,
    description:this.schedulesFormEdit.value.description,
    schedulerStatus:this.statuslistarr,
    // schedulerGroup:this.StatusGrouparray,
    schedulerDay:this.weeklyschedulerarray,
    reportType:'Weekly',
    reportFormat:this.schedulesFormEdit.value.reportFormat,
    emailCC:this.schedulesFormEdit.value.emailCC,
    subject:this.schedulesFormEdit.value.subject
  }
  
  this.progressbar=true;
  this.progressbar_scheduler=true;
 
console.log(payload);
this.reportService.SchedulerDownload(payload)
  .subscribe(
    {
      next : (res : any) => {
       // this.handleloading(res);
       this.progressbar=false;
       this.progressbar_scheduler=false;
       this.displayScheduleredit=false;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Scheduler Added' });
       this.getSchedulerlist();

      },
      error:(err)=>
      {
       // this.handleError(err);
        this.errormessage=err.error.message;
         this.progressbar=false;
         this.progressbar_scheduler=false;
         this.messageService.add({ severity: 'error', summary: 'Invalid', detail:   this.errormessage });
      }
    });
  }else if(this.schedulesFormEdit.value.reportFormat==='Daily_Group_Report'){
    
  if(this.schedulesFormEdit.value.clientName===null || this.schedulesFormEdit.value.clientName===undefined)
  {
    this.editclientName=this.statusClientname;
  }else
  {
    this.editclientName=this.clientid;
  }
  if(this.schedulesFormEdit.value.projectName===null || this.schedulesFormEdit.value.projectName===undefined)
  {
    this.editprojectName=this.statusProjectName;
  }else
  {
    this.editprojectName=this.projectvalue;
  }
  let payload={
    scheduler_Id:this.schedulesFormEdit.value.scheduler_Id,
    clientName:this.schedulesFormEdit.value.clientName,
    projectName: this.schedulesFormEdit.value.projectName,
    time:this.schedulesFormEdit.value.time,
    //fromDate:this.schedulesFormEdit.value.fromDate,
    sendTo:this.schedulesFormEdit.value.sendTo,
    isActive:this.schedulesFormEdit.value.isActive,
    //stillDate:this.schedulesFormEdit.value.stillDate,
    description:this.schedulesFormEdit.value.description,
    schedulerStatus:this.statuslistarr,
    schedulerGroup:this.StatusGrouparray,
    schedulerDay:this.weeklyschedulerarray,
    reportType:'Weekly',
    reportFormat:this.schedulesFormEdit.value.reportFormat,
    emailCC:this.schedulesFormEdit.value.emailCC,
    subject:this.schedulesFormEdit.value.subject
  }
  
  this.progressbar=true;
  this.progressbar_scheduler=true;
console.log(payload);
this.reportService.SchedulerDownload(payload)
  .subscribe(
    {
      next : (res : any) => {
       // this.handleloading(res);
       this.progressbar=false;
       this.progressbar_scheduler=false;
       this.displayScheduleredit=false;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Scheduler Added' });
       this.getSchedulerlist();

      },
      error:(err)=>
      {
       // this.handleError(err);
        this.errormessage=err.error.message
         this.progressbar=false;
         this.progressbar_scheduler=false;
         this.messageService.add({ severity: 'error', summary: 'Invalid', detail:   this.errormessage });
      }
    });

  }else if(this.schedulesFormEdit.value.reportFormat==='Date_Range_Report')
  {
    
  if(this.schedulesFormEdit.value.clientName===null || this.schedulesFormEdit.value.clientName===undefined)
  {
    this.editclientName=this.statusClientname;
  }else
  {
    this.editclientName=this.clientid;
  }
  if(this.schedulesFormEdit.value.projectName===null || this.schedulesFormEdit.value.projectName===undefined)
  {
    this.editprojectName=this.statusProjectName;
  }else
  {
    this.editprojectName=this.projectvalue;
  }
  let payload={
    scheduler_Id:this.schedulesFormEdit.value.scheduler_Id,
    clientName:this.schedulesFormEdit.value.clientName,
    projectName: this.schedulesFormEdit.value.projectName,
    time:this.schedulesFormEdit.value.time,
    fromDate:this.schedulesFormEdit.value.fromDate,
    sendTo:this.schedulesFormEdit.value.sendTo,
    isActive:this.schedulesFormEdit.value.isActive,
    //stillDate:this.schedulesFormEdit.value.stillDate,
    description:this.schedulesFormEdit.value.description,
    schedulerStatus:this.statuslistarr,
    schedulerGroup:this.StatusGrouparray,
    schedulerDay:this.weeklyschedulerarray,
    reportType:'Weekly',
    reportFormat:this.schedulesFormEdit.value.reportFormat,
    emailCC:this.schedulesFormEdit.value.emailCC,
    subject:this.schedulesFormEdit.value.subject
  }
  
  this.progressbar=true;
  this.progressbar_scheduler=true;
console.log(payload);
this.reportService.SchedulerDownload(payload)
  .subscribe(
    {
      next : (res : any) => {
       // this.handleloading(res);
       this.progressbar=false;
       this.displayScheduleredit=false;
       this.progressbar_scheduler=false;
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Scheduler Added' });
       this.getSchedulerlist();

      },
      error:(err)=>
      {
       // this.handleError(err);
        this.errormessage=err.error.message;
         this.progressbar=false;
         this.progressbar_scheduler=false;
         this.messageService.add({ severity: 'error', summary: 'Invalid', detail:   this.errormessage });
      }
    });

  }
  
}
onChangelist(newvalue: any,event:any) {
  

 this.Listboxgroupname = newvalue.groupAgentName;
 this.localArray.push(this.Listboxgroupname);;
 console.log("listname",this.Listboxgroupname);
 console.log("arraypush",this.localArray);

 this.groupreportlist=event.value;

this.Listboxgroupname=event.value.agentName;
  console.log('clicked event :' +this.groupreportlist);
 // console.log(this.localArray.push(this.values));

}
onChangestatuslist(newvalue: any,event:any) {
  
  // if(event.value.checked===true)
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
 console.log("values",this.statuslist);
  this.statuslist.filter((val: any) => {
    console.log("values",val);
    this.statusname=val;
    this.statusarray.push(this.statusname);
    console.log("values",this.statusarray);
 });
 
 let payload={
  //scheduler_status_Id:"",
  scheduler_status_Name:this.statusname
 }
//  this.statusarray.push(payload);
// console.log("values",  this.statusarray)
//  this.Listboxgroupname=event.value.agentName;
//     console.log('clicked event :' +this.groupreportlist);
//     console.log(this.localArray.push(this.values));

}
onChangestatuslist_weekly(event:any) {

 this.weaklysec=event.value;
 console.log("values of weekly",this.weaklysec);

}
}
