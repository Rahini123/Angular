import { Component, OnInit } from '@angular/core';
import { ConfirmationService,MessageService } from 'primeng/api';
import { TicketService } from 'src/app/modules/tickets/components/ticket/ticketservice';
import { AgentgroupService } from '../../../groups/services/agentgroup.service';
import { AgentService } from '../../../agents/components/general/agentservice';
import { ClientComponentService } from 'src/app/modules/client/client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SlapolicyService } from '../../slapolicy.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { projectService } from 'src/app/modules/project/project.service';

@Component({
  selector: 'app-slaincident',
  templateUrl: './slaincident.component.html',
  styleUrls: ['./slaincident.component.scss'],
  providers: [projectService,MessageService, TicketService, AgentgroupService, AgentService, ClientComponentService,ConfirmationService]
})
export class SlaincidentComponent implements OnInit {

  slapolicy !: FormGroup;
  isLoading: boolean = true;
  items: MenuItem[];
  home: MenuItem;
  slapolicydialog: boolean = false;
  editslapolicydialog: boolean = false;
  selectedClient: any;
  slamessage: any;
  slaresult: any;
  statussla: any;
  ClientListLov_active:any;
  esculationresolverule:any;
  name = "Default SLAPolicy Name";
  desc = "Default SLAPolicy Description";
  high = "High";
  urgent = "Urgent";
  medium = "Medium";
  low = "Low";
  ListboxStatusValue: any;
  clients: any;
  sla_status_Name:any;
  sla_type:any;
  editSlapolicy: any;
  statuslist: any[] = [];
  statuslistarr:any;
  SLAolicyservice:any;
  escalationrespondrule:any;
  escalationresponserule:any;
  statuslistarrays: any[] = [];
  slapolicyservices:any[]=[];
  slaservicestatusarray:any[]=[];
  slaaddservice:any[]=[];
  slaaddlist:any[]=[];
  SLApolicyservice:any;
  escalationresolveemail:any;
  escalationrespondemail:any;
  esculationresponsrule:any;
  status: any;
  escalationRespondRule:any;
  progressbar:boolean=false;
  id: any;
  selected: any = [
  ];
  ClientComponentService: any;
  constructor(
    private fb: FormBuilder,
    private projectService: projectService,
  private ClientComponentServices:ClientComponentService,
    private groupService: AgentgroupService,
    private ticketService: TicketService,
    private messageService: MessageService,
    private route: Router,
    private agentService: AgentService,
    private slapolicyservice: SlapolicyService,
    private confirmationService : ConfirmationService
  ) { }
  ngAfterViewInit() {
    this.getListOfSLAPolicy();
    this.getListOfClient();
    this.getListOfStatus();
    this.getClientListactive();
  }
  ngOnInit(): void {

    this.SLApolicyservice = [
      {
        label: 'Before 1 Hour',
       
      },
      
    ];
    this.escalationRespondRule = [
      {
        label: 'Before 15 Mins',       
      },
      
    ];
    this.home = { icon: 'pi pi-home', routerLink:'/dashboard/sladashboard', };
    this.items = [

      { label: 'SLA Incident Ticket' },

    ];
   
    this.slapolicy = this.fb.group({
      sla_Id: '',
      slaPolicyName: '',
      description: '',
      clientName: '',
      urgentpriority: '',
      urgentresponseTime: '',
      urgentresolveTime: '',
      highpriority: '',
      highresponseTime: '',
      highresolveTime: '',
      mediumpriority: '',
      mediumresponseTime: '',
      mediumresolveTime: '',
      lowpriority: '',
      lowresponseTime: '',
      lowresolveTime: '',
      slaPolicyStatus: '',
      escalationResolveRule:'',
      escalationRespondRule:'',
      escalationResolveEmail:'',
      escalationRespondEmail:''


    });




  }
  formclear() {
    // this.slapolicy.get('urgentresponseTime')?.reset();
    // this.slapolicy.get('urgentresolveTime')?.reset();
    // this.slapolicy.get('highresponseTime')?.reset();
    // this.slapolicy.get('highresolveTime')?.reset();
    // this.slapolicy.get('mediumresponseTime')?.reset();
    // this.slapolicy.get('mediumresolveTime')?.reset();
    // this.slapolicy.get('lowresponseTime')?.reset();
    // this.slapolicy.get('lowresolveTime')?.reset();
  }
  getClientListactive() 
  {
    this.projectService.getListofClient_activeList().subscribe((res) => 
    {this.ClientListLov_active = res});
  }
  onChangelist(newvalue: any, event: any) {

    // if(event.value.checked==true)
    // {
    //   alert("hi");
    // }else
    // {
    //   alert("nt selected");
    // }
    this.ListboxStatusValue = event.value;
    console.log(this.ListboxStatusValue);
    //    this.localArray.push(this.Listboxgroupname);;
    //    console.log(this.Listboxgroupname);

    //    this.values=event.value;

    //  this.Listboxgroupname=event.value.agentName;
    //     console.log('clicked event :' +this.values);
    //     console.log(this.localArray.push(this.values));

  }
  keyPressAlphaNumericWithCharacters_contactnumber(event:any) {
    var regex = new RegExp("^[a-zA-Z0-9\b]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    // Allow numbers, alpahbets, space, underscore
    if (!regex.test(key))
    {
      event.preventDefault();
      return false;
    }else
    {
      return true
    }
   
  }
  editslapolicyincident() {
    this.progressbar=true;
    let payload={
        slaType: "Incident",
        sla_Id: this.editSlapolicy.sla_Id,
        clientName: this.slapolicy.controls['clientName'].value,
        slaPolicyName: this.slapolicy.controls['slaPolicyName'].value,
        description: this.slapolicy.controls['description'].value,
        urgentpriority: this.slapolicy.controls['urgentpriority'].value,
        urgentresponseTime: this.slapolicy.controls['urgentresponseTime'].value,
        urgentresolveTime: this.slapolicy.controls['urgentresolveTime'].value,
        highpriority:this.slapolicy.controls['highpriority'].value,
        highresponseTime: this.slapolicy.controls['highresponseTime'].value,
        highresolveTime: this.slapolicy.controls['highresolveTime'].value,
        mediumpriority:  this.slapolicy.controls['mediumpriority'].value,
        mediumresponseTime: this.slapolicy.controls['mediumresponseTime'].value,
        mediumresolveTime: this.slapolicy.controls['mediumresolveTime'].value,
        lowpriority:  this.slapolicy.controls['lowpriority'].value,
        lowresponseTime: this.slapolicy.controls['lowresponseTime'].value,
        lowresolveTime: this.slapolicy.controls['lowresolveTime'].value,
         // escalationRespondRule:this.escalationrespondrule,
        // escalationResolveRule:this.escalationresponserule,
        escalationRespondRule:this.editSlapolicy.escalationRespondRule,
        escalationResolveRule:this.editSlapolicy.escalationResolveRule,
        escalationResolveEmail:this.slapolicy.controls['escalationResolveEmail'].value,
        escalationRespondEmail:this.slapolicy.controls['escalationRespondEmail'].value,
       // slaPolicyStatus: this.slaservicestatusarray
       slaPolicyStatus:this.slaservicestatusarray
    }
    console.log("payload policy",payload);
    this.slapolicyservice.createslapolicy(payload).subscribe(
      {
        next: (value: any) => {
          if (value === null) {
            this.progressbar=false;
            this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'SLA Policy Updated Successfully' });
 this.slaservicestatusarray.length=0;
            this.getListOfSLAPolicy();
            // this.slapolicy.reset();
            
            this.slapolicydialog = false;
            this.editslapolicydialog = false;
            this.progressbar=false;
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
          }
        },
        error: (err) => {
          this.progressbar=false;
          this.slamessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.slamessage });
        }
      }
    )
  }
  saveslapolicy() {
    this.progressbar=true;
    let payload={
        slaType: "Incident",
        // sla_Id: this.editSlapolicy.sla_Id,
        clientName: this.slapolicy.controls['clientName'].value,
        slaPolicyName: this.slapolicy.controls['slaPolicyName'].value,
        description: this.slapolicy.controls['description'].value,
        urgentpriority: this.slapolicy.controls['urgentpriority'].value,
        urgentresponseTime: this.slapolicy.controls['urgentresponseTime'].value,
        urgentresolveTime: this.slapolicy.controls['urgentresolveTime'].value,
        highpriority:this.slapolicy.controls['highpriority'].value,
        highresponseTime: this.slapolicy.controls['highresponseTime'].value,
        highresolveTime: this.slapolicy.controls['highresolveTime'].value,
        mediumpriority:  this.slapolicy.controls['mediumpriority'].value,
        mediumresponseTime: this.slapolicy.controls['mediumresponseTime'].value,
        mediumresolveTime: this.slapolicy.controls['mediumresolveTime'].value,
        lowpriority:  this.slapolicy.controls['lowpriority'].value,
        lowresponseTime: this.slapolicy.controls['lowresponseTime'].value,
        lowresolveTime: this.slapolicy.controls['lowresolveTime'].value,
        escalationRespondRule:this.escalationrespondrule,
        escalationResolveRule:this.escalationresponserule,
        escalationResolveEmail:this.slapolicy.controls['escalationResolveEmail'].value,
        escalationRespondEmail:this.slapolicy.controls['escalationRespondEmail'].value,
       // slaPolicyStatus: this.slaservicestatusarray
       slaPolicyStatus:this.slaaddservice
    }
    console.log("payload policy",payload);
    this.slapolicyservice.createslapolicy(payload).subscribe(
      {
        next: (value: any) => {
          if (value === null) {
            this.progressbar=false;
            this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
          }
          else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'SLA Policy Created Successfully' });
            this.slaservicestatusarray.length=0;
            this.getListOfSLAPolicy();
            // this.slapolicy.reset();
            this.slapolicydialog = false;
            this.editslapolicydialog = false;
            this.progressbar=false;
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
          }
        },
        error: (err) => {
          this.progressbar=false;
          this.slamessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.slamessage });
        }
      }
    )
  }
  getListOfStatus() {
    this.ticketService.getListOfStatus()
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.statussla = result;
            this.statussla.filter((val: any) => {
          console.log("statussla sec",val);
          this.sla_status_Name=val.status,
          this.id=val.id
          this.sla_type='Service'
          let payload ={
            //sla_status_Id:this.id,
            sla_status_Name:this.sla_status_Name,
           // sla_type:this.sla_type
           }
           this.slapolicyservices.push(payload);
           let addpayload={
            sla_status_Name:this.sla_status_Name,
          }
          this.slaaddlist.push(addpayload);
          });
          
          console.log("slapolicy tech",this.slaaddlist);
        })
       
  }
  getListOfSLAPolicy() {
    this.slapolicyservice.getListOfslapolicy_incident()
    .subscribe(
      (result) => {
          this.isLoading = false;
          this.slaresult = result;
          this.slaresult.filter((val: any) => {
            console.log("slaresult sec",this.slaresult);
          });
        })
  }
  deletesla(slapolicy: any) {

    // this.slapolicyservice.deleteSlaById(slapolicy.sla_Id) .subscribe();
    // this.messageService.add(
    //   {
    //     severity: 'success',
    //     summary: 'deleted',
    //     detail: 'SLA Policy  :' + slapolicy.sla_Id + ' ' + 'Deleted Successfully'
    //   });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
console.log(" SLA Id  " + slapolicy.sla_Id)
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Record?',
      header:'Delete SLA Policy',
        icon : 'pi pi-delete',

        accept : () => 
            {
              this.progressbar=true;
              this.slapolicyservice.deleteSlaById(slapolicy.sla_Id).subscribe({
                  next: (val: any) => {
                    this.messageService.add(
                      {
                        severity : 'success',
                        summary : 'Deleted',
                        detail : 'Deleted Successfully'
                      });
                      this.getListOfSLAPolicy(); 
                      this.progressbar=false; 
                },error: (err: any) => {
                  this.progressbar=false; 
                  this.getListOfSLAPolicy();  
                  this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Deleted Successfully'});
                }
              });
            
            },
            
        });
        
  }
  showDialog() {
    this.slapolicy.reset();
    this.slaaddservice.length=0;
    this.slapolicy.patchValue(
      {
        urgentpriority: 'Urgent',
        highpriority: 'High',
        mediumpriority: 'Medium',
        lowpriority: 'Low',
        slaPolicyName: 'Default SLAPolicy',
        description: 'Default Description'

      });
    this.slapolicy.get('urgentresponseTime')?.reset();
    this.slapolicy.get('urgentresolveTime')?.reset();
    this.slapolicy.get('highresponseTime')?.reset();
    this.slapolicy.get('highresolveTime')?.reset();
    this.slapolicy.get('mediumresponseTime')?.reset();
    this.slapolicy.get('mediumresolveTime')?.reset();
    this.slapolicy.get('lowresponseTime')?.reset();
    this.slapolicy.get('lowresolveTime')?.reset();
    this.slaservicestatusarray.length=0;
    //this.slapolicy.controls['description'].reset();
    // this.slapolicy.controls['urgentresponseTime'].reset();
    // this.slapolicy.controls['urgentresolveTime'].reset();
    // this.slapolicy.controls['highresponseTime'].reset();
    // this.slapolicy.controls['highresolveTime'].reset();
    // this.slapolicy.controls['highresponseTime'].reset();
    // this.slapolicy.controls['mediumresponseTime'].reset();
    // this.slapolicy.controls['mediumresolveTime'].reset();
    // this.slapolicy.controls['lowresponseTime'].reset();
    // this.slapolicy.controls['lowresolveTime'].reset();
    this.slapolicydialog = true;



  }
  

  onChangesla_escalationRespondRule(checked:any, item:any)
  {
    console.log(item);
    this.escalationrespondrule=item;
  }
  onChangesla_resolve_rule(checked:any, item:any)
  {
     this.escalationresponserule=item;
     console.log(item);
  }
  isItemSelected(itemId: number): boolean {
   

    for (var i = 0; i < this.slaservicestatusarray.length; i++) {

      if ((this.slaservicestatusarray[i].sla_status_Name === itemId) && (this.slaservicestatusarray[i].sla_status_Name ) ) {
        return true;
      }
    }
  }
  onChange(checked:any, item:any) {
    if (checked) {
      this.slaservicestatusarray.push(item);
    } else {
      let removeIndex = this.slaservicestatusarray.findIndex(
        (itm:any) => (itm.sla_status_Name === item.sla_status_Name)
      );
      if (removeIndex !== -1) this.slaservicestatusarray.splice(removeIndex, 1);
    }
    console.log(this.slaservicestatusarray);
  }
  //add
  isItemSelectedadd(itemId: number): boolean {
   

    for (var i = 0; i < this.slaaddservice.length; i++) {

      if ((this.slaaddservice[i].sla_status_Name === itemId) && (this.slaaddservice[i].sla_status_Name ) ) {
        return true;
      }
    }
  }
  onChangeadd(checked:any, item:any) {
    if (checked) {
      this.slaaddservice.push(item);
    } else {
      let removeIndex = this.slaaddservice.findIndex(
        (itm:any) => (itm.sla_status_Name === item.sla_status_Name)
      );
      if (removeIndex !== -1) this.slaaddservice.splice(removeIndex, 1);
    }
    console.log(this.slaaddservice);
  }
  
  editslapolicy(slapolicy: any) {
    this.statuslistarrays.length=0;
    
    this.slaservicestatusarray.length=0;
    this.editslapolicydialog = true;
    this.editSlapolicy = { ...slapolicy };
    this.esculationresolverule=this.editSlapolicy.escalationResolveRule;
    // this.esculationresponsrule=this.editSlapolicy.escalationRespondEmail;
    this.esculationresponsrule=this.editSlapolicy.escalationRespondRule;
    console.log("esculationrule",this.esculationresolverule);
    this.statuslistarrays.push(this.editSlapolicy);
    console.log("statuslistarrays",this.statuslistarrays);
    this.statuslistarr=this.editSlapolicy.slaPolicyStatus;
    console.log("value in edit",this.statuslistarr);  
    this.statuslistarr.forEach((x:any)=>{
      console.log("in for loop",x.sla_status_Id);
      let payload={
        sla_status_Id:x.sla_status_Id,
         sla_status_Name:x.sla_status_Name,
      //  sla_type:'Service'

      }
      let addpayload={
        sla_status_Name:x.sla_status_Name,
      }
      console.log("value inside ",payload);
      this.slaaddservice.push(addpayload);
  this.slaservicestatusarray.push(payload);
  console.log("add",this.slaaddservice);
    });
    console.log("Array inside the for loop",this.slaservicestatusarray);
    this.slapolicy.patchValue(
      {
        sla_Id: this.editSlapolicy.sla_Id,

        clientName: this.editSlapolicy.clientName,
        slaPolicyName: this.editSlapolicy.slaPolicyName,
        description: this.editSlapolicy.description,
        urgentpriority: this.editSlapolicy.urgentpriority,
        urgentresponseTime: this.editSlapolicy.urgentresponseTime,
        urgentresolveTime: this.editSlapolicy.urgentresolveTime,
        highpriority: this.editSlapolicy.highpriority,
        highresponseTime: this.editSlapolicy.highresponseTime,
        highresolveTime: this.editSlapolicy.highresolveTime,
        mediumpriority: this.editSlapolicy.mediumpriority,
        mediumresponseTime: this.editSlapolicy.mediumresponseTime,
        mediumresolveTime: this.editSlapolicy.mediumresolveTime,
        lowpriority: this.editSlapolicy.lowpriority,
        lowresponseTime: this.editSlapolicy.lowresponseTime,
        lowresolveTime: this.editSlapolicy.lowresolveTime,
        // escalationrespondrule:this.editSlapolicy.escalationrespondrule,
        // escalationresponserule:this.editSlapolicy.escalationresponserule,
        escalationrespondrule:this.editSlapolicy.escalationRespondRule,
        escalationresponserule:this.editSlapolicy.escalationResponseRule,
        escalationRespondEmail:this.editSlapolicy.escalationRespondEmail,
        escalationResolveEmail:this.editSlapolicy.escalationResolveEmail,
        slaPolicyStatus: this.statuslist

      });
    
     
//this.slaservicestatusarray.push(this.statuslistarr);
console.log("value in edit outside",this.statuslistarr.length);
  }
  getStatussla(isChecked: boolean, Status: any) {
    this.status = { ...Status };
    console.log("Status", this.status.status);
    if (isChecked === true) {
      console.log(isChecked, Status.id);
      console.log(this.status.status);

      // this.statuslist.push(Status);
      // console.log(this.statuslist);
      let statusitemlist={
        sla_status_Name:Status.status
      }
      this.statuslist.push(statusitemlist);

    } else {
      // console.log(isChecked, Status.id);
      // console.log("sttaus",Status.status)
      let removeIndex = this.statuslist.findIndex(itm => itm.sla_status_Name===Status.status);
      console.log(removeIndex);
      if (removeIndex !== -1)
        this.statuslist.splice(removeIndex, 1);
    }
    console.log(this.statuslist);

  }
  getListOfClient() {
    this.ClientComponentServices.getListOfClient()
      .subscribe(
        (result:any) => {
          this.isLoading = false;
          this.clients = result;
        })
  }
}
