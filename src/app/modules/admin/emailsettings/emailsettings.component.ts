import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '../../tickets/components/ticket/ticketservice';
import { EmailsettingService } from './emailsetting.service';

@Component({
  selector: 'app-emailsettings',
  templateUrl: './emailsettings.component.html',
  styleUrls: ['./emailsettings.component.scss'],
  providers: [MessageService,TicketService,ConfirmationService]
})
export class EmailsettingsComponent implements OnInit {
  items: MenuItem[];

    home: MenuItem;
    projectactive:any;
    project_List:any;
    isLoading: boolean = true;
    progressbar:boolean=true;
    header:any;
    smtpvalues:any;
    projectname:any;
    projectlabelsmtp:any;
    labelproject:any;
    imaphost:boolean=false;
    imtpvalues:any;
    smtphost:boolean=false;
    email_address:any;
    imap_host_form:any;
    SMTP_List:any;
    MailMessage:any;
    smtp_host_form:any;
    IMAP_List:any;
    selectedClient: any;
    projectlabel:any;
    projectlist:any;
    projectCategoryId:any
  constructor( private fb : FormBuilder,
    private emailservice:EmailsettingService,
    private messageService : MessageService,
    private ticketService: TicketService,
    private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {
    this.labelproject="Select Project Name"
    this.getBusinessFunctionLOV();
    this.get_projectactive();
    this.get_IMAPLIST();
    this.get_SMTPLISt();
    this.items = [

      {
        label: 'Admin',
        routerLink:'/dashboard/admin'
      },
    
      {label: 'Email Settings',},
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
  
  this.imap_host_form = this.fb.group(
    {
      id:'',
      imap_host : '',
      port : '',
      username :'',
      password:'',
      projectName:'',
     
    })
    this.smtp_host_form = this.fb.group(
      {
        id:'',
        smtp_host : '',
        port : '',
        username : '',
        password:'',
        projectName:'',
       
      })
  }
  get_projectactive() {
    this.ticketService.getListOfActiveProject().subscribe((res) => {
      this.projectactive = res;
    });
  }
  get_IMAPLIST() {
    this.progressbar=false;
    this.emailservice.getImptp().subscribe((res) => {
      this.isLoading=false;
      this.IMAP_List = res;
      
    });
  }
  get_SMTPLISt() {
    this.emailservice.getSmptp().subscribe((res) => {
      this.SMTP_List = res;
      this.isLoading=false;
    });
  }
  editImtp(imtp:any)
  {
    this.header="Edit IMAP HOST"

    this.imaphost=true;
    this.imtpvalues={...imtp};
    console.log("imtp value is ",this.imtpvalues);
    this.labelproject=this.imtpvalues.projectName;
    this.imap_host_form.patchValue({
      id:this.imtpvalues.id,
      imap_host:this.imtpvalues.imap_host,
      password:this.imtpvalues.password,
      port:this.imtpvalues.port,
      projectId:this.imtpvalues.projectId,
      projectName:this.imtpvalues.projectName,
      username:this.imtpvalues.username
    });

  }
  editsmtp(smtp:any)
  {
    
    
    this.smtphost=true;
    this.header="Edit SMTP HOST";

    this.smtpvalues={...smtp};
    console.log("smtp value is ",this.smtpvalues);
    this.labelproject=this.smtpvalues.projectName;
    this.smtp_host_form.patchValue({
      id:this.smtpvalues.id,
      smtp_host:this.smtpvalues.smtp_host,
      password:this.smtpvalues.password,
      port:this.smtpvalues.port,
      projectId:this.smtpvalues.projectId,
      projectName:this.smtpvalues.projectName,
      username:this.smtpvalues.username
    });
  }
  deleteImtp(imtp:any)
  {

    console.log("imtp value is ",imtp);
    // this.progressbar=true;
    this.confirmationService.confirm({
      message: 'Do you want to Delete ',
      header:'Delete IMAP',
      
      accept: () => {
       
        this.emailservice.deleteIMAPbyId(imtp)
             .subscribe({
               next: (val: any) => {
              console.log("value of the sec",val)
         
                this.isLoading=false;
                 this.messageService.add(
                   {
                     severity : 'error',
                     summary : 'deleted',
                     detail : 'Deleted Successfully'
                   });
                   this.progressbar=false;
                   this.get_IMAPLIST(); 
                 
               },
                error : (err:any) => {
                this.messageService.add(
                  {
                    severity : 'success',
                    summary : 'Deleted',
                    detail :'Deleted Successfully'
                  });
                  this.progressbar=false;
                  this.get_IMAPLIST(); 
               }
               
             });
             this.get_IMAPLIST(); 
            
 
     },
     reject: () => {

      this.get_IMAPLIST();   
      this.isLoading=false;
      this.progressbar=false;
 

    }
 });
  }
  deleteSmtp(smtp:any)
  {
    // this.progressbar=true;
    console.log("smtp value is ",smtp);
    
    this.confirmationService.confirm({
      message: 'Do you want to Delete ',
      header:'Delete SMTP',
      
      accept: () => {
     
        this.emailservice.deleteSMTPbyId(smtp)
             .subscribe({
               next: (val: any) => {
                console.log("value",val);
                this.isLoading=false;
           
                 this.messageService.add(
                   {
                     severity : 'success',
                     summary : 'deleted',
                     detail : 'Deleted Successfully'
                   });
                   this.get_SMTPLISt();
                   this.progressbar=false;
               },
               error : (err:any) => {
                this.messageService.add(
                  {
                    severity : 'success',
                    summary : 'deleted',
                    detail :'Deleted Successfully'
                  });
                  this.get_SMTPLISt();
                  this.progressbar=false;
               }
               
             });
           
           
 
     },
     reject: () => {

      this.get_SMTPLISt();   
      this.isLoading=false;
      this.progressbar=false;
 

    }
 });
  
  }
  saveSmtp()
  {
    this.progressbar=true;
 if(this.smtp_host_form.projectName===null)
 {
 
this.projectname=this.projectlabelsmtp
 }else{
  this.projectname=this.smtp_host_form.value.projectName
 }
 console.log(this.smtp_host_form.value.projectName)
    let payload={
      
      "id":this.smtp_host_form.value.id,
       "smtp_host": this.smtp_host_form.value.smtp_host,
       "port": this.smtp_host_form.value.port,
       "username": this.smtp_host_form.value.username,
       "password": this.smtp_host_form.value.password,
       "projectName": this.projectlabelsmtp
     
   }
console.log(payload)
    this.emailservice.createSmptp(payload).subscribe(
      {
        
        next : (value:any) => {
        
          if(value === null)
              {
            
                this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                this.progressbar=false;
              }
              else
              {

                this.messageService.add({severity:'success', summary: 'Success', detail: 'SMTP Created Successfully'});
                this.imaphost=false;
                this.ngOnInit();
                this.smtphost=false;
                this.progressbar=false;
              }
            },
            error : (err:any) => {
              this.MailMessage = err.error.message;
              this.messageService.add({severity:'error', summary: 'Failure', detail: this.MailMessage});
              this.progressbar=false;
            }
          }
        )

  }
  saveImap()
  {
    this.progressbar=true;
 if(this.imap_host_form.projectName===null)
 {
  
this.projectname=this.projectlabel
 }else{
  this.projectname=this.imap_host_form.value.projectName
 }

   console.log(this.imap_host_form.value.projectName);
    if(this.imap_host_form.projectName===null)
    {
   this.projectname=this.imap_host_form.value.projectName
    }else{
     this.projectname=this.projectlabel
    }
    let payload={
      
       "id":this.imap_host_form.value.id,
        "imap_host": this.imap_host_form.value.imap_host,
        "port": this.imap_host_form.value.port,
        "username": this.imap_host_form.value.username,
        "password": this.imap_host_form.value.password,
        "projectName": this.projectlabel
      
    }
    this.emailservice.createImptp(payload).subscribe(
      {
        
        next : (value:any) => {
          if(value === null)
              {
            
                this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                this.progressbar=false;
                
              }
              else
              {

                this.messageService.add({severity:'success', summary: 'Success', detail: 'IMAP Created Successfully'});
                this.imaphost=false;
                this.progressbar=false;
                this.ngOnInit();
              }
            },
            error : (err:any) => {
              this.MailMessage = err.error.message;
              this.progressbar=false;
              this.messageService.add({severity:'error', summary: 'Failure', detail: this.MailMessage});
            }
          }
        )
  }
clickimaphost()
{
this.imaphost=true;
this.header="Add IMAP HOST"
this.labelproject="Select Project Name"
this.imap_host_form.reset();

}
clicksmtphost()
{
  this.smtphost=true;
  this.header="Add SMTP HOST"
  this.labelproject="Select Project Name"
this.smtp_host_form.reset();
}
onChangeproject(event: any,label:any) {
   
  this.projectlabel=label;

 console.log("ariab;",label);
 console.log("ariab;",event.value);
 this.projectCategoryId = event.value;

 this.ticketService.getProjectDetailsByIdservice(this.projectCategoryId ).subscribe((res:any) => {
  this.project_List = res;
  this.email_address=res.emailAddress;
  console.log("projectby id",this.email_address);
  this.imap_host_form.get('username')?.setValue(this.email_address);

  //this.smtp_host_form.get('username')?.setValue(this.email_address);
});

 
}
onChangeproject_smtp(event: any,label:any) {
   
  this.projectlabelsmtp=label;

 console.log("ariab;",label);
 console.log("ariab;",event.value);
 this.projectCategoryId = event.value;

 this.ticketService.getProjectDetailsByIdservice(this.projectCategoryId ).subscribe((res:any) => {
  this.project_List = res;
  this.email_address=res.emailAddress;
  console.log("projectby id",this.email_address);
  //this.imap_host_form.get('username')?.setValue(this.email_address);

  this.smtp_host_form.get('username')?.setValue(this.email_address);
});

 
}
getBusinessFunctionLOV() {
  this.ticketService.getListOfPMOValues().subscribe((res) => {
    this.projectlist = res;
  });
}
}
