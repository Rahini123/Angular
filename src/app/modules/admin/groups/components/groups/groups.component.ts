import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AgentService } from '../../../agents/components/general/agentservice';
import { Agent } from '../../../agents/components/general/modal/agent';
import { NewGroupAgents } from '../../modal/groups';
import { AgentgroupService } from '../../services/agentgroup.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
],
  styleUrls: ['./groups.component.scss'],
  providers : [MessageService,AgentgroupService,ConfirmationService,AgentService]
})
export class GroupsComponent implements OnInit {
  isLoading: boolean = true;
  progressbar:boolean=false;
  projectLOV:any;
  canSubmit: boolean;
  arr:number[]=[];
  arr2:number[]=[];
  email:any;
  projectNames:any;
  display: boolean = false;
  checked: boolean = false;
  items: MenuItem[];
  inpSwitchVal:any;
  inpSwitchVal1:any;
  inpSwitchModel:any;
  selectedvalue: any;
  localArray:any = [];
  values:any;
  agents:any;
  value:any;
  home: MenuItem;
  overlayVisible: boolean = false;
  constructor(
    private groupService : AgentgroupService,
    private agentService : AgentService,
    private messageService : MessageService,
    private fb : FormBuilder,
    private confirmationService : ConfirmationService
  ) { }

  ngOnInit(): void 
  {

    this.groupForm = this.fb.group({
      groupAgentId: '',
      groupAgentName : '',
      groupAgentDescription : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      projectName : '',
      agentId: '',
      ccMail:''

    });

    this.inpSwitchVal = 'N';

    this.inpSwitchVal1 = 'N'
    this.projectNames=environment.outbound_project_name;
    this.isLoading = true; 
    this.items = [
    
      {
        label: 'Admin',
        routerLink:'/dashboard/admin'
      },
      {
        label: 'Groups',
     
      },
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.getAllGroups();
    this.getProjectLOV();
    this.getBusinessFunctionLOV();
    this.getAgentList();
    this.getGroupNames();
    this.getUnassignedTicketTimeLOV();
    // this.getAgentDetailsByGroup();

   
    this.timeformat=[
     { timeformat:'Legal'},
     { timeformat:'Finance'},
     { timeformat:'Marketing'}
    ];

    console.log("selected", this.selectedGroups);

    console.log("kehgfk", this.group);

  }
  listCategory:any;
  timeformat : any;
  Listboxgroupname:any;
  groupName:any;
  groups : any;

  selectedGroups : any;

  groupForm : FormGroup;
  group : any;
  groupDialog : boolean = false;
  errorMessage : any;

  businessFunctionDropdown : any;
  ticketTimingsDropdown : any;

  groupAgentId : any;

  agentDetails : any;
  cancel()
  {
    this.arr2.length=0;
    console.log("Poped",this.arr2)
  }
  getAgentList()
  {
 
    this.agentService.getListOfAgents().subscribe((data) =>
     {
  
      this.agents = data;
    })
     ;
  }
  getAgentDetailsByGroup()
  {
    this.agentService.getListOfAgentNames()
        .subscribe(
          (res) => {
            this.agentDetails = res;
            console.log('Agent dEtails', res);
          }
          )
  }
  saveGroups()
  {
    console.log("agent id",this.groupForm.value.agentId);
    this.progressbar=true;
    if(this.groupForm.value.agentId==null)

    {
      this.messageService.add({severity:'error', summary: 'Failure', detail: 'AgentName must not be blank'});
      this.progressbar=false;

    }else{
      this.groupService.createGroups(this.groupForm.value).subscribe(
        {
          next : (value) => {
            if(value==null)
                {
    
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                  this.progressbar=false;
                }
                else
                {
                  this.messageService.add({severity:'success', summary: 'Success', detail: 'Groups Created Successfully'});
                  this.getAllGroups();
                  this.display=false;
                  this.progressbar=false;
              
                }
              },
              error : (err) => {
                this.errorMessage = err.error.message;
                this.email=err.error.email;
                this.progressbar=false;
                 
                if(this.groupForm.value==null)
                {
                  this.progressbar=false;
                  this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
                }else{ 
                  this.progressbar=false;
                  this.messageService.add({severity:'error', summary: 'Failure', detail: this.email +'\n'+this.errorMessage});}
               
              }
            }
          )
    }
  
  }
  getAllGroups()
  {
    this.groupService.getAllGroups()
        .subscribe(
          (result) => 
          {
            this.isLoading = false;
            this.groups = result;
        
          })
  }
  onChangelist(newvalue: any,event:any) {
  
    // if(event.value.checked==true)
    // {
    //   alert("hi");
    // }else
    // {
    //   alert("nt selected");
    // }
   this.Listboxgroupname = newvalue.agentName;
   this.localArray.push(this.Listboxgroupname);;
   console.log(this.Listboxgroupname);

   this.values=event.value;

 this.Listboxgroupname=event.value.agentName;
    console.log('clicked event :' +this.values);
    console.log(this.localArray.push(this.values));

  }
  toggle() {
    this.overlayVisible = !this.overlayVisible;
}
  deleteGroup(group : NewGroupAgents)
  {
    console.log('Group',group.groupAgentName);
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Group',
      header:'Delete Group Details',
        icon : 'pi pi-delete',
        accept : () => 
            {
              this.groupService.deleteGroupById(group.groupAgentId).subscribe({
                next:(res)=>{
                  console.log("delete res",res);
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'Group deleted successfully'
                  });
                },
                error:(err:any)=>
                {
                  console.log("delete res",err.message);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Deleted',
                    detail: err.message
                  });
                }
              });
             
                // setTimeout(() => {
                //      window.location.reload();
                //     }, 1000);
                this.getAllGroups();
            },
            
        });
        // 
       
  }
  getProjectLOV() 
  {
    this.groupService.getListofProject_activeList().subscribe((res) => 
    {
      this.projectLOV = res;
      console.log("Project values",this.projectLOV);
    });
  }
  getGroupNames()
  {
    this.groupService.getAllGroups()
        .subscribe(
          (result) => 
          {
            this.groupName = result;
            console.log('Group Name',result);
          })
  }
  deleteGroupsById(group : NewGroupAgents)
  {


    this.confirmationService.confirm(
      {
        message : 'Are you want to delete' + group.groupAgentName,
        header : 'Confirm',
        icon : 'pi pi-delete',

        accept : () => 
            {
              this.groupService.deleteGroupById(group.groupAgentId).subscribe();
              // this.agentService.deleteAgentById(agent.agent_id).subscribe((res) => console.log(res));
              this.messageService.add({severity : 'error', summary : 'deleted', detail : 'Agent successfully deleted'});
              // this.ngOnInit();
            },
      });
  }

  editGroups(group1 : NewGroupAgents)
  {
    this.groupDialog = true;
   
    this.group = {...group1};
    console.log(this.group.agents);
    const values = this.group.agents;
    for (const arr of values)
    {
      this.listCategory=arr.agent_id;
      console.log(this.listCategory);
      this.arr2.push(this.listCategory);
      console.log("console arr",this.arr2);
      
    }
   // this.arr2=this.listCategory;

    console.log("console array2",this.arr2);
    this.groupForm.patchValue(
      {
        groupAgentId : this.group.groupAgentId,
        groupAgentName : this.group.groupAgentName,
        groupAgentDescription : this.group.groupAgentDescription,
        businessFunction : this.group.businessFunction,
        ticketAssignment : this.group.ticketAssignment,
        unassignedTicketTime : this.group.ticketAssignment,
        email : this.group.email,
        projectName : this.group.projectName,
        agentId:this.arr2,
        ccMail:this.group.ccMail
      })
  }


  updateGroups()
  {
    this.progressbar=true;
    console.log("agent id",this.groupForm.value.agentId);
    this.groupService.createGroups(this.groupForm.value)
      .subscribe(
        {
          next : (value) => {
            // this.getAllGroups();

            
            if(value === null)
            {
              this.arr2.length=0;
              this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
              this.progressbar=false;
            }
            else
          {
            this.arr2.length=0;
            this.progressbar=false;
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Groups Updated Successfully'});
            this.groupDialog=false;
            this.getAllGroups();

          }
          },
          error : (err) => {
            //this.arr2.length=0;
            this.progressbar=false;
            this.errorMessage = err.error.message;
            this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
          }
        }
      )
    // if(this.groupForm.value.agentId==null ||this.groupForm.value.agentId=='[]'||this.groupForm.value.agentId.length==0)

    // {
    //   this.progressbar=false;
    //   this.messageService.add({severity:'error', summary: 'Failure', detail: 'AgentName must not be blank'});

    // }
    
    // else{
      
    // }
  
  }

  getBusinessFunctionLOV() 
  {
    this.groupService.businessFunctions().subscribe((res) => 
    {this.businessFunctionDropdown = res});
  }

  getUnassignedTicketTimeLOV() 
  {
    this.groupService.unassignedTicketTimings().subscribe((res) => 
    {this.ticketTimingsDropdown = res});
  }
  getGroup(e:any,data:any){
  
    e.target.disabled = false;
    
    if(e.target.checked==true) 
    { 
     this.canSubmit = true;
    console.log( e.target.disabled);
    this.arr.push(data);
     }  else{
         if(this.arr.length===0)
     {
    this.canSubmit = false;
     }
    else{
    this.arr.pop();
    }
     }
    
    console.log(this.arr);
    //alert(this.arr.length);
    
     }

MultideleteSelectedAgents()

 {


   this.groupService.deleteSelectedGroups(this.arr)

         .subscribe((res) => {

           console.log('the value is '+res);

        //   console.log('Id',this.delMuser.ids[this.delMuser.id]);

         });

 }

 showDialog() {
  this.display = true;
  this.groupForm.reset();
}
}
