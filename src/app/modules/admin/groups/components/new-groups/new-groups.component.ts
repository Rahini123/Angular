import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AgentService } from '../../../agents/components/general/agentservice';
import { AgentgroupService } from '../../services/agentgroup.service';

@Component({
  selector: 'app-new-groups',
  templateUrl: './new-groups.component.html',
  styleUrls: ['./new-groups.component.scss'],
  providers : [MessageService,AgentgroupService,AgentService]
})
export class NewGroupsComponent implements OnInit {
  inpSwitchVal:any;
  inpSwitchVal1:any;
  inpSwitchModel:any;
  selectedvalue: any;
  localArray:any = [];
  values:any;
  agents:any;
  value:any;
  constructor(
    private fb : FormBuilder,
    private groupService : AgentgroupService,
    private messageService : MessageService,
    private route : Router,
    private agentService : AgentService
  ) { }



  ngOnInit(): void {
  //   if(this.checked==false)
  //   {
  // alert("Y");
  //   }
  this.inpSwitchVal = 'N';

  this.inpSwitchVal1 = 'N'
 // this.inpSwitchModel = this.inpSwitchVal== 'Y';
    this.groupForm = this.fb.group({
      groupAgentName : '',
      groupAgentDescription : '',
      email : '',
      projectName : '',
      agentId: ''
    });
    this.getAgentList();
    this.getBusinessFunctionLOV();
    this.getUnassignedTicketTimeLOV();
    this.getProjectLOV();
    this.getGroupNames();
    this.getAgentDetailsByGroup();

    this.timeformat=[
      { timeformat:'Legal'},
     { timeformat:'Finance'},
     { timeformat:'Marketing'}
    ];

  }

  groupForm !: FormGroup;
  errorMessage: any;
 // checked: boolean = false;
 // checked_ticket:boolean=false;
businessFunctionDropdown : any;
ticketTimingsDropdown : any;
groupName : any;
agentDetails : any;
projectLOV:any;
timeformat : any;
Listboxgroupname:any;

    saveGroups()
    {
      this.groupService.createGroups(this.groupForm.value).subscribe(
        {
          next : (value) => {
            if(value==null)
                {
    
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                }
                else
                {
                  this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Groups Created Successfully'});
                  setTimeout(() => {

                    window.location.reload();

                  }, 1000);
                }
              },
              error : (err) => {
                this.errorMessage = err.error.message;
                this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
              }
            }
          )
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
    //   this.localArray.push(this.Listboxgroupname);;
    // console.log(this.Listboxgroupname);

     this.values=event.value;

   //  this.Listboxgroupname=event.value.agentName;
      console.log('clicked event :' +this.values);
      //console.log(this.localArray.push(this.values));

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
  getProjectLOV() 
  {
    this.groupService.getListOfprojectValues().subscribe((res) => 
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

}
