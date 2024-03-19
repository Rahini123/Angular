import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AgentService } from './agentservice';
import { Agent } from './modal/agent';
import * as FileSaver from 'file-saver';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers: [MessageService, AgentService, ConfirmationService],
})
export class GeneralComponent implements OnInit {
  agents: any;
  isLoading: boolean = true;
  agent: any;
  progressbar:boolean=false;
  canSubmit: boolean;
  items_menu: MenuItem[];

  home: MenuItem;
  arr:number[]=[];

  agentDialog: boolean = false;
  selectedColumns:any;
  selectedAgents: any;
  display: boolean = false;
  constructor(
    private agentService: AgentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb : FormBuilder
  ) {}

  items : any;
  timeformat : any;
  lang : any;
  level : any;
  projectNames:any;
  ngOnInit() {
    this.projectNames=environment.outbound_project_name;
    this.isLoading = true;
    this.getAgentList();
    this.items_menu = [
    
      {
        label: 'Admin',
        routerLink:'/dashboard/admin'
      },
      {
        label: 'Agent',
     
      },
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.items = [ { field: 'agent_id', header: 'agent_id' }, 
    { field: 'firstName', header: 'firstName' }, 
    { field: 'lastName', header: 'lastName' }, 
    { field: 'email', header: 'email' },
    { field: 'title', header: 'title' },
    { field: 'mobileNumber', header: 'mobileNumber' },
    { field: 'landNumber', header: 'landNumber' },
   ];
   this.selectedColumns = [
    { field: 'firstName', header: 'firstName' }, 
    { field: 'lastName', header: 'lastName' }, 
    { field: 'email', header: 'email' },
    { field: 'title', header: 'title' },];
   this.level = [
    { level: 'Beginner' },
    { level: 'Intermediate'},
    // { name: 'Requester', code: 'LDN' },
  ];
  this.timeformat=[
    { timeformat:'12'},
   { timeformat:'24'},
   { timeformat:'42'},
   { timeformat:'34'}
  ];
  this.lang = [
    { lang: 'Afrikaans' },
    { lang: 'Albanian'},
    { lang: 'Arabic'},
    { lang: 'Armenian'},
    { lang: 'Basque'},
    { lang: 'Bengali'},
    { lang: 'Catalan'},
    { lang: 'Cambodian'},
    { lang: 'Chinese (Mandarin)'},
    { lang: 'Croatian'},
    { lang: 'Czech'},
    { lang: 'Danish'},
    { lang: 'Dutch'},
    { lang: 'English'},
    { lang: 'Estonian'},
    { lang: 'Fiji'},
    { lang: 'Finnish'},
    { lang: 'French'},
    { lang: 'Georgian'},
    { lang: 'German'},
    { lang: 'Greek'},
    { lang: 'Gujarati'},
    { lang: 'Hebrew'},
    { lang: 'Hindi'},
    { lang: 'Hungarian'},
    { lang: 'Icelandic'},
    { lang: 'Indonesian'},
    { lang: 'Irish'},
    { lang: 'Italian'},
    { lang: 'Japanese'},
    { lang: 'Javanese'},
    { lang: 'Korean'},
    { lang: 'Latin'},
    { lang: 'Latvian'},
    { lang: 'Lithuanian'},
    { lang: 'Macedonian'},
    { lang: 'Malay'},
    { lang: 'Malayalam'},
    { lang: 'Maltese'},
    { lang: 'Maori'},
    { lang: 'Marathi'},
    { lang: 'Mongolian'},
    { lang: 'Nepali'},
    { lang: 'Norwegian'},
    { lang: 'Persian'},
    { lang: 'Polish'},
    { lang: 'Portuguese'},
    { lang: 'Punjabi'},
    { lang: 'Quechua'},
    { lang: 'Romanian'},
    { lang: 'Russian'},
    { lang: 'Samoan'},
    { lang: 'Serbian'},
    { lang: 'Slovak'},
    { lang: 'Slovenian'},
    { lang: 'Spanish'},
    { lang: 'Swahili'},
    { lang: 'Swedish '},
    { lang: 'Tamil '},
    { lang: 'Telugu '},
    { lang: 'Thai '},
    { lang: 'Tibetan '},
    { lang: 'Tonga '},
    { lang: 'Turkish '},
    { lang: 'Ukrainian '},
    { lang: 'Urdu '},
    { lang: 'Uzbek '},
    { lang: 'Welsh '},
    { lang: 'Xhosa '},


 
  ];
  this.agentForm = this.fb.group({
    'agent_id':new FormControl('',Validators.required),
    'firstName':new FormControl('',Validators.required),
    'lastName':new FormControl('',Validators.required),
    'email':new FormControl('', [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    'title':new FormControl('', [Validators.required]),
    'mobileNumber':new FormControl('',Validators.required),
    'agentName':new FormControl('',Validators.required),
          
    });
  }
  get f() { return this.agentForm.controls; }
  saveAgents() {
    this.progressbar=true;
    this.agentService.createAgents(this.agentForm.value)
      .subscribe(
        {
          next: (res) => {

            if(res != ''){

            this.messageService.add(
              {
                severity: "success", summary: "Created", detail: "Agent Created Successfully"
              })
          this.getAgentList();
          this.display=false;
          this.progressbar=false;
            }
            else {
              this.messageService.add(
                {
                  severity: "error", summary: "Mandatory", detail: "Fill Mandatory Filed"
                });
                this.progressbar=false;
            }

          },
          error: (err: any) => {
            this.errorMessage = err.error.message;
            this.messageService.add(
              {
                severity: "error", summary: "Invalid", detail: this.errorMessage
              });
              this.progressbar=false;
          }
        })
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
  deleteSelectedAgents2() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Agent?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.agents = this.agents.filter(
          (val: any) => !this.selectedAgents.includes(val)
        );
        this.selectedAgents = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Agents Deleted',
          life: 3000,
        });
       
      },
    });
  }


getAgent(e:any,data:any){
console.log(this.arr);
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

 deleteSelectedAgents(){

   this.confirmationService.confirm({
     message: 'Do you want to Delete ',
     header:'Delete Agent',
     
     accept: () => {
       //
       this.agentService.deleteSelectedAgents(this.arr)
            .subscribe({
              next: (val: any) => {
                this.getAgentList();
                this.messageService.add(
                  {
                    severity : 'error',
                    summary : 'deleted',
                    detail : 'Deleted Successfully'
                  });
                                  
              },error:(val:any)=>{
                this.messageService.add(
                  {
                    severity : 'error',
                    summary : 'deleted',
                    detail :val.message
                  });
              }
            });
            this.ngOnInit();  

    }
});
        //  .subscribe((res) => {
        // //   console.log('Id',this.delMuser.ids[this.delMuser.id]);

        //  });

 }



  editAgent(agent: Agent) {
    this.agentDialog = true;
    this.agent = {...agent};
    this.agentForm.setValue(
      {
        agent_id : this.agent.agent_id,
        firstName : this.agent.firstName,
        lastName : this.agent.lastName,
        email : this.agent.email,
        title : this.agent.title,
        mobileNumber : this.agent.mobileNumber,
        agentName : this.agent.agentName,
      })

  }



  deleteAgentById(agent : Agent)
  {
  //  alert("hi");
  
    console.log('Agent', agent.agent_id);
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Record?',
      header:'Delete Agent',

      accept: () => {
        //
        this.progressbar=true;
        this.agentService.deleteAgentById(agent.agent_id)
              .subscribe({
                next: (val: any) => {
                  this.progressbar=false;
                  this.messageService.add(
                    {
                      severity : 'error',
                      summary : 'deleted',
                      detail : 'Deleted Successfully'
                    });
                    this.getAgentList();
                }, error : (err:any) => {
                  this.progressbar=false;
                  this.messageService.add(
                    {
                      severity : 'success',
                      summary : 'Deleted',
                      detail :'Agent Deleted Successfully'
                    });
                    this.getAgentList(); 
                 }
              });
              // this.ngOnInit();
              
               

      }
  });
    
               
    
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.agents.length; i++) {
      if (this.agents[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.agents);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'agents');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }


  getAgentList()
  {
 
    this.agentService.getListOfAgents().subscribe((data) =>
     {
      this.isLoading = false;
      this.agents = data;
    })
     ;
  }

  agentForm : FormGroup;
  errorMessage : any;

  updateAgents()
  {  this.progressbar=true;
    this.agentService.createAgents(this.agentForm.value)
          .subscribe(
            {
              next : (value) => {
                if(value === null)
                {
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                }
                else
              {
                this.progressbar=false;
                this.messageService.add({severity:'success', summary: 'Success', detail: 'Agents Updated Successfully'});
                 this.getAgentList();
                 this.agentDialog=false;
             
              }
              },
              error : (err) => {
                this.progressbar=false;
                this.errorMessage = err.error.message;
                this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
              }
            }
          )
  }
  showDialog() {
    this.display = true;
    this.agentForm.reset();
}
 
}
