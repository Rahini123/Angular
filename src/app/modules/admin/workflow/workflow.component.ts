import { Component, OnInit } from '@angular/core';
import { WorkflowService } from './workflow.service';
import { TicketService } from '../../tickets/components/ticket/ticketservice';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  providers: [
    TicketService,
    MessageService
  ],
})
export class WorkflowComponent implements OnInit {
workflow:any;
isLoading:any;
project_name:any;
items: MenuItem[];
slapolicyservice!:FormGroup;
projectname:any;
ticketPriority:any;
projectNames:any;
slamessage:any;
  home: MenuItem;
ticketpriority:any;
workflowlist:any;
projectnames:any;
WorkflowDialog:boolean=false;
WorkflowDialogAdd:boolean=false;
progressbar:boolean=false;
projectlable:any;
projectCategoryId:any;
projectactive:any;
ticket_Priority:any;
ticketprioritylabel:any;
workflowid:any;
ticketpriorityid:any;
  constructor(
    private fb: FormBuilder,
    private workflowservice:WorkflowService,
    private ticketService:TicketService ,
    private messageservice:MessageService) { }

  ngOnInit(): void {
this.getlistofWorkflow();
this.getBusinessFunctionLOV();
this.get_projectactive();
this.items = [
    
  {label: 'Workflow',
},

];
this.slapolicyservice = this.fb.group({
  workflowId:'',
  projectName:'',
  ticketPriority:''
});
this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
this.ticketpriority=[{
  label:'Urgent'
},
{
  label:'High'
},
{
  label:'Medium'
},
{
  label:'Low'
}
];
  }
  onChangeticket(event:any,onChange:any)
  {
    console.log("values",event.value,onChange);
    this.ticketprioritylabel= onChange;

    console.log("Project label",this.ticketprioritylabel);
    // alert("hi");
    // console.log('event :' + event);
    this.ticketpriorityid = event.value;
    if(this.ticketpriorityid===null)
    {
  this.ngOnInit();
    }
     
    //console.log(this.projectCategoryId);
 
   
    this.getlistofWorkflow();
    
    
  }
  get_projectactive() {
    this.ticketService.getListOfActiveProject().subscribe((res) => {
      this.projectactive = res;
    });
  }
  saveclick()
  {
    this.progressbar=true;
  let payload={
    projectName:this.projectlable,
    ticketPriority:this.ticketprioritylabel
  }
  this.workflowservice.createWorkflow(payload).subscribe(
    {
      next: (value: any) => {
        if (value === null) {
          this.progressbar=false;
          this.messageservice.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
        }
        else {
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Workflow Created Successfully' });
          this.progressbar=false;
          this.getlistofWorkflow();
          // this.slapolicy.reset();
          this.WorkflowDialogAdd = false;
          
        
        }
      },
      error: (err) => {
        this.progressbar=false;
        this.slamessage = err.error.message;
        this.messageservice.add({ severity: 'error', summary: 'Failure', detail: this.slamessage });
      }
    }
  )
  }
  editclick()
  {
    this.progressbar=true;
    if(this.projectlable==undefined &&  this.ticketprioritylabel==undefined)
    {
this.project_name=this.projectname;
this.ticket_Priority=this.ticketPriority;
    }else  if(this.projectlable==undefined &&  this.ticketprioritylabel!=undefined)
    {
this.project_name=this.projectname;
this.ticket_Priority=this.ticketprioritylabel
    }
    let payload={
      workflowId:this.workflowid,
      projectName:this.project_name,
      ticketPriority:this.ticket_Priority
    }


    console.log(localStorage.getItem("workflowid"));
    this.workflowservice.createWorkflow(payload).subscribe(
      {
        next: (value: any) => {
          if (value === null) {
            this.progressbar=false;
            this.messageservice.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
          }
          else {
            this.progressbar=false;
            this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Workflow Saved Successfully' });
  
            this.getlistofWorkflow();
            // this.slapolicy.reset();
            // this.WorkflowDialogAdd = false;
            this.WorkflowDialog=false;
          
          }
        },
        error: (err) => {
          // this.WorkflowDialogAdd = false;
          this.WorkflowDialog=false;
          this.progressbar=false;
          this.slamessage = err.error.message;
          this.messageservice.add({ severity: 'error', summary: 'Failure', detail: this.slamessage });
        }
      }
    )
  }
  onChange(event: any,onChange:any) {
  
   
    this.projectlable= onChange;
    console.log("Project label",this.projectlable);
    // alert("hi");
    // console.log('event :' + event);
    this.projectCategoryId = event.value;
    if(this.projectCategoryId===null)
    {
  this.ngOnInit();
    }
     
    //console.log(this.projectCategoryId);
 
   
    this.getlistofWorkflow();
    
    
    // console.log('Project name', event.value);
  }
  showDialog()
  {
    this.WorkflowDialogAdd=true;
  }
  getBusinessFunctionLOV() {
    this.ticketService.getListOfPMOValues().subscribe((res) => {
      this.projectnames = res;
    });
  }
  
  editworkflow(workflow:any)
  {
    this.WorkflowDialog=true;
    console.log("value of work flow",this.ticketprioritylabel);
    this.workflowlist={...workflow}
    console.log("value of value ",this.workflowlist);
    this.workflowid=this.workflowlist.workflowId;
    this.projectname=this.workflowlist.projectName;
    this.ticketPriority=this.workflowlist.ticketPriority;
    console.log("workflowid",this.workflowid,this.projectname,this.ticketPriority);
    const workflowsec=this.workflowlist.workflowid;
    localStorage.setItem('workflowid',workflowsec);
    this.getlistofWorkflow();
  }
  cancel()
  {

  }
  getlistofWorkflow() {
    this.workflowservice.getListOfWorkFlow()
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.workflow = result;
        })
  }
 
}
