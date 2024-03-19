import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../tickets/components/ticket/ticketservice';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdvisoryService } from './advisory.service';
import { MenuItem, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.scss'],
  providers: [
    TicketService,MessageService
  
  ],
})
export class AdvisoryComponent implements OnInit {
  index: number = 0;
  prev: boolean = false;
  AdvisoryDialog:boolean=false;
  AdvisoryDialogedit:boolean=false;
  advisoryForm: FormGroup;
  cols: any;
  dropvalue:any;
  errorMessage:any
  isLoading: boolean = true;
  dynamicVariable = true;
  back: boolean = false;
  togggleinfo:boolean=false;
  activeTab=0;
  ticketNo:any;
  broadcastMessage:any
  disabledtxt:boolean=true;
  dropstatus:any;
  emailTickets:any;
  dropadvisory:any;
  togggleindicants:boolean=false;
  statusplaceholder:"Select Advisory"
  tabIndex = 0;
  items: MenuItem[];

  home: MenuItem;
  ticketsproject:any;
  advisory:any;
  status:any;
  advisoryedit:any;
  incidental:any;
  date: Date;
  projectlabel:any;
  projectCategoryId:any;
  date2: Date;
  timeformat:any;
  calendarVal?: Date;
  calendarVal2?: Date;
  constructor(      private fb : FormBuilder,
    public datepipe: DatePipe,
     private ticketService: TicketService,
     private advisoryservice: AdvisoryService,
     private messageService: MessageService,) { }

  ngOnInit(): void {

    this.togggleinfo=false;
    this.togggleindicants=false;
    this.prev = true;
    this.items = [
    
      {label: 'Advisory',}
   
  ];
    this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
 this.getBusinessFunctionLOV();
 this.getListofAdvisory();
    this.back=false;
    this.advisoryForm = this.fb.group(
      {
        projectName: '',
        status : '',
        advisoryType : '',
        application : '',
        location : '',
        startDate:'',
        endDate:'',
        hoursMin:'',
        summary:'',
        background:'',
        businessImpact:'',
        actionRequired:'',
        emailId:'',
        fromAddress:'',
        advisory_Id:'',
        endHoursMin:'',
        ticketNo:'',
        broadcastMessage:'',
      })

    this.status = [ 
    
    { status: 'Intial', }, 
    { status: 'Update', },
    { status: 'Closed', },
  ];
    this.cols = [ 
 
    { field: 'Incidents', }, 
    { field: 'Information', },];
    this.timeformat = [ 
      { field:'Select AM/PM'}, 
    { field: 'AM', }, 
    { field: 'PM', },];
  }
  
  openNext() {
    // this.index = (this.index === 2) ? 0 : this.index + 1;
    // console.log("Next", this.index);
    // if (this.index === 0) {
  
    //   this.prev=true;
    //   this.back=false;
    // } else if (this.index === 1) {
    //   alert("1");
    //   this.back = true;
    // }else if(this.index === 2)
    // {
    //   this.back = false;
    //   this.prev=true;
    // }
    this.AdvisoryDialog=true;
    this.advisoryForm.reset();
  }
  getListofAdvisory()
  {
    this.advisoryservice.getListofAdvisory()
        .subscribe(
          (result) => 
          {
            this.isLoading = false;
            this.advisory = result;
            console.log(this.advisory);
           
           
          })
  }
  cancel()
  {
    this.togggleinfo=false;
    this.togggleindicants=false;
  }
  editAdvisory(advisory : any)
  {
   
    this.dynamicVariable = true;
this.advisoryedit={...advisory};
this.dropvalue=this.advisoryedit.projectName;
this.dropstatus=this.advisoryedit.status;
this.dropadvisory=this.advisoryedit.advisoryType;
this.ticketNo=this.advisoryedit.ticketNo;
this.broadcastMessage=this.advisoryedit.broadcastMessage;
// console.log("advisory edit",this.advisoryedit.projectName);
// alert(this.advisoryedit.projectName);

if(this.dropadvisory==='Incidents')
{
  this.advisoryForm.get('application').disable();
  this.advisoryForm.get('location').disable();
  this.advisoryForm.get('startDate').disable();
  this.advisoryForm.get('hoursMin').disable();
  this.advisoryForm.get('endDate').enable();
  this.advisoryForm.get('endHoursMin').enable();

  this.advisoryForm.get('summary').disable();
  this.advisoryForm.get('background').enable();
  this.advisoryForm.get('businessImpact').disable();
  this.advisoryForm.get('actionRequired').enable();
  this.advisoryForm.get('fromAddress').disable();


  this.togggleindicants=true;
  this.togggleinfo=false; 
}else if(this.dropadvisory==='Information')
{
  this.advisoryForm.get('application').disable();
  this.advisoryForm.get('location').disable();
  this.advisoryForm.get('startDate').disable();
  this.advisoryForm.get('hoursMin').disable();
  this.advisoryForm.get('endDate').disable();
  this.advisoryForm.get('endHoursMin').disable();
  this.advisoryForm.get('summary').disable();
  this.advisoryForm.get('background').enable();
  this.advisoryForm.get('businessImpact').disable();
  this.advisoryForm.get('actionRequired').enable();
  this.advisoryForm.get('fromAddress').disable();

 this.togggleinfo=true; 
 this.togggleindicants=false;
}
this.AdvisoryDialogedit=true;
// this.advisoryForm.get('projectName')?.setValue(this.dropvalue);

this.advisoryForm.setValue(
  {
    advisory_Id: this.advisoryedit.advisory_Id,
    projectName : this.advisoryedit.projectName,
    status:this.advisoryedit.status,
    ticketNo:this.advisoryedit.ticketNo,
    advisoryType:this.advisoryedit.advisoryType,
    broadcastMessage:this.advisoryedit.broadcastMessage,
    application:this.advisoryedit.application,
    location:this.advisoryedit.location,
    startDate:this.advisoryedit.startDate,
    endDate:this.advisoryedit.endDate,
    hoursMin:this.advisoryedit.hoursMin,
    endHoursMin:this.advisoryedit.endHoursMin,
    summary:this.advisoryedit.summary,
    background:this.advisoryedit.background,
    businessImpact:this.advisoryedit.businessImpact,
    actionRequired:this.advisoryedit.actionRequired,
    emailId:this.advisoryedit.emailId,
    fromAddress:this.advisoryedit.fromAddress,
  });
}
  updateAdvisory()
  {


    let payload={
      advisory_Id: this.advisoryForm.controls['advisory_Id'].value,
      projectName: this.advisoryedit.projectName,
      status:this.advisoryForm.controls['status'].value,
      ticketNo:this.advisoryForm.controls['ticketNo'].value,
      advisoryType:this.advisoryForm.controls['advisoryType'].value,
      broadcastMessage:this.advisoryForm.controls['broadcastMessage'].value,
      application:this.advisoryForm.controls['application'].value,
      location:this.advisoryForm.controls['location'].value,
      startDate:this.advisoryForm.controls['startDate'].value,
      endDate:this.advisoryForm.controls['endDate'].value,
      hoursMin:this.advisoryForm.controls['hoursMin'].value,
      endHoursMin:this.advisoryForm.controls['endHoursMin'].value,
      summary:this.advisoryForm.controls['summary'].value,
      background:this.advisoryForm.controls['background'].value,
      businessImpact:this.advisoryForm.controls['businessImpact'].value,
      actionRequired:this.advisoryForm.controls['actionRequired'].value,
      emailId:this.advisoryForm.controls['emailId'].value,
      fromAddress:this.advisoryForm.controls['fromAddress'].value,
     
    }
   
 this.advisoryservice.createAdvisoryUpdate(payload)
          .subscribe(
            {
                next : (value) => {
                  console.log("Value of advisoryform",value);
                  if(value === null)
                {
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                 // window.location.reload();
                }
                else
              {
             
                this.messageService.add({severity:'success', summary: 'Success', detail: 'Advisory Details Updated Successfully'});
                this.AdvisoryDialogedit=false;
                        
               this.ngOnInit();
             
              }
                },
                error : (err) => {
                  console.log(err);
                  this.errorMessage = err.error.message;
                  this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
                }
            });
  }
  addAdvisory()
  {
    var date_period_year_yy_from=this.datepipe.transform(this.date, 'yyyy-MM-dd');
    var date_period_year_yy_end=this.datepipe.transform(this.date2, 'yyyy-MM-dd');
    // var starthourMin=this.datepipe.transform(this.calendarVal, 'HH:mm');
    // var endhourMin=this.datepipe.transform(this.calendarVal2, 'HH:mm');  
    let payload={
      projectName: this.projectlabel,
      status:this.advisoryForm.controls['status'].value,
      ticketNo:this.advisoryForm.controls['ticketNo'].value,
      advisoryType:this.advisoryForm.controls['advisoryType'].value,
      broadcastMessage:this.advisoryForm.controls['broadcastMessage'].value,
      application:this.advisoryForm.controls['application'].value,
      location:this.advisoryForm.controls['location'].value,
      startDate:date_period_year_yy_from,
      endDate:date_period_year_yy_end,
      hoursMin:this.advisoryForm.controls['hoursMin'].value,
      endHoursMin:this.advisoryForm.controls['endHoursMin'].value,
      summary:this.advisoryForm.controls['summary'].value,
      background:this.advisoryForm.controls['background'].value,
      businessImpact:this.advisoryForm.controls['businessImpact'].value,
      actionRequired:this.advisoryForm.controls['actionRequired'].value,
      emailId:this.advisoryForm.controls['emailId'].value,
      fromAddress:this.advisoryForm.controls['fromAddress'].value,
     
    }
 this.advisoryservice.createAdvisoryUpdate(payload)
          .subscribe(
            {
                next : (value) => {
                  console.log("Value of advisoryform",value);
                  if(value === null)
                {
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                 // window.location.reload();
                }
                else
              {
             
                this.messageService.add({severity:'success', summary: 'Success', detail: 'Advisory Details Updated Successfully'});
                        
               this.ngOnInit();
             this.AdvisoryDialog=false;
              }
                },
                error : (err) => {
                  
                  this.errorMessage = err.error.message;
                  this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
                }
            });
  }
  onChangeproject(event: any,label:any) {
   
    this.projectlabel=label;
  
   console.log("label;", this.projectlabel);
   this.projectCategoryId = event.value;
   console.log("label;",this.projectCategoryId);
   // console.log(event.value,value,this.projectlabel);
this.getProjectDetailsById();
  
  
   
  
 }
 
  getProjectDetailsById()
  {
    this.ticketService
    .getProjectDetailsByIdservice(this.projectCategoryId)
    .subscribe((res:any) => {
      this.ticketsproject = res;
      console.log("getProjectDetailsById",this.ticketsproject.projectName);
      this.advisoryForm.get('fromAddress')?.setValue(this.ticketsproject.emailAddress);
    
    });
   
  }
  getBusinessFunctionLOV() {
    this.ticketService.getListOfPMOValues().subscribe((res) => {
      this.emailTickets = res;
    });
  }
  onChangetickettype(event: any) {
    this.incidental = event.value;
    if(this.incidental===null)
    {
      this.togggleindicants=false;
      this.togggleinfo=false;
    }
   
   else if(this.incidental==='Incidents')
    {
     this.togggleindicants=true;
     this.togggleinfo=false;
    }else if(this.incidental==='Information')
    {
     this.togggleindicants=false;
     this.togggleinfo=true;
    }
  }
  onClose(tab:any)
  {
    // alert("Accordion is Closed"+tab);
  }
  switchHeaders(tabnumber:any)
  {
    this.activeTab = tabnumber.index;
    // alert(this.activeTab);
    if(this.activeTab===0)
    {
      this.prev=true;
      this.back=false;
    }else if(this.activeTab===1)
    {
      this.back=true;
      this.prev=true;
    }else if(this.activeTab===2)
    {
      this.back=true;
      this.prev=false;
    }
  }

}
