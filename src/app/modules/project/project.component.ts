import { MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { projectService } from './project.service';
import { Project } from './modal/proj'
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { Activeproj } from './Activeproj';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss', './projectform.css'],
  providers: [projectService, MessageService,ConfirmationService],
})
export class ProjectComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  isLoading: boolean = true;
  ProgressSpinnerDlg:boolean=false;
  activity:any;
  progressbar:boolean=false;
  displayBasic: boolean;
  PmoListLov: any;
  inpSwitchVal:any;
  date_period_year: Date;
  showResults: boolean = true;
  date_period_year2: Date;
  ClientListLov:any;
  breadcrumb:any;
  showdisplay:boolean=false;
  dateformat:boolean=false;
  today:any;
  fromdatechange:any;
  items: MenuItem[];

    home: MenuItem;
  showBasicDialog() {
   // alert("hi");
    this.display = false;
}

  constructor(
    private fb : FormBuilder, 
    public datepipe: DatePipe,
    private activatedRoute : ActivatedRoute,
    private messageService: MessageService,
    private projectService: projectService,
    private router : Router,
    private confirmationService : ConfirmationService

 
  ) { }

  ngOnInit(): void {
    this. today = new Date().toISOString().split('T')[0];
    console.log(this.today);
this.closedialog();
this.projectService.setvalue(true);
this. today = new Date().toISOString().split('T')[0];
console.log(this.today);
    this.projectService.pmosListFunctions().subscribe((res) => 
    {

      console.log('values values of tickets are', res);
      this.PmoListLov = res;
    
    }
    )
    
    this.isLoading = true;
    this.ProgressSpinnerDlg=false;
    moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD');
    this.inpSwitchVal = 'N';
    var date_period_year=this.datepipe.transform(this.date_period_year, 'yyyy-MM-dd');
    console.log(date_period_year);
    this.getListofProject();
    this.getClientListFunctionLOV();
    this.getClientListactive();
    this.items = [
    
      {label: 'Projects',},
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.projectForm = this.fb.group(
      {
        projectId: '',
        projectName : '',
        clientName : '',
        emailAddress : '',
        pmo : '',
        from_date:'',
        end_date:'',
        projectActivity:''
      })

    const res = this.activatedRoute.snapshot.params['projectCategoryId'];


  }

  projectForm: FormGroup;
  date_period_year_yy_from: any;
  projects: any;
  date_period_year_yy_end:any;
  projectCategory: any;
  display: boolean = false;
  project: any;
  time_fromdate:any;
  time_todate:any;
  bonusChecked:any;
  projectMessage: any;

  selectedProject: any;

  projectDialog: boolean = false;
  ClientListLov_active:any;

  getClientListFunctionLOV() 
  {
    this.projectService.ClientListFunctions().subscribe((res) => 
    {this.ClientListLov = res});
  }
  getClientListactive() 
  {
    this.projectService.getListofClient_activeList().subscribe((res) => 
    {this.ClientListLov_active = res});
  }
  getListofProject()
  {
    // this.projectService.getListofProject()
    this.projectService.getListofProject()
        .subscribe(
          (result) => 
          {
            this.isLoading = false;
            this.projects = result;
            // const values =this.projects.values();
            // for(const arr of values)
            // {
            //   this.time_fromdate=moment(arr.from_date).utc().format('YYYY-MM-DD');
            //   this.time_todate=moment(arr.end_date).utc().format('YYYY-MM-DD');
            //   console.log(this.time_fromdate);
              
            // }
          })
  }

  deleteProject(project : Project)
  {
    console.log('Group',project.projectId);
    this.projectService.deleteProjectById(project.projectId)
              .subscribe();
              this.messageService.add(
                {
                  severity : 'error',
                  summary : 'deleted',
                  detail : 'Deleted Successfully'
                });
                setTimeout(() => {

                  window.location.reload();

                }, 1000);
    
  }

  getPmosListFunctionLOV() 
  {
    this.projectService.pmosListFunctions().subscribe((res) => 
    {this.PmoListLov = res});
  }

  setDate(e:any){
    console.log("from date value",e.target.value);
    this.fromdatechange=e.target.value;
    this.dateformat=true;
    
    }
  editProject(project1 : Project)
  {
   this.date_period_year_yy_from=this.datepipe.transform(this.date_period_year, 'yyyy-MM-dd');
   this. date_period_year_yy_end=this.datepipe.transform(this.date_period_year2, 'yyyy-MM-dd');
    this.projectDialog = true;
    this.project = {...project1};
console.log("value of projects",this.datepipe.transform(this.project.end_date, 'yyyy-MM-dd'));
var fromdate=this.datepipe.transform(this.project.from_date, 'yyyy-MM-dd');
var enddate=this.datepipe.transform(this.project.end_date, 'yyyy-MM-dd');

    this.projectForm.patchValue(
      {
        projectId : this.project.projectId,
        projectName : this.project.projectName,
        clientName : this.project.clientName,
        emailAddress : this.project.emailAddress,
        pmo : this.project.pmo,
        from_date:fromdate,
        end_date:enddate,
        projectActivity:this.project.projectActivity
        // projectCategoryId : this.project.projectCategoryId,
        // projectDescription : this.project.projectDescription,
        // projectActivity : this.project.projectActivity
      })
  }
  activeProj(activeProj: Activeproj,e:any) {

    this.bonusChecked = e.checked;

    //alert(this.bonusChecked);


    let delbasepayload = {




      projectId: activeProj.projectId,




      projectActivity: this.bonusChecked




    }


    this.confirmationService.confirm({


      message: 'Are you sure do u want to ' + `${activeProj.projectActivity==="Y"?"Active the ":"In Active the "} ` + activeProj.projectName + ' Project?',


      header: 'Confirm',


      icon: 'pi pi-exclamation-triangle',


      accept: () => {


        this.projectService.activeProject(delbasepayload).subscribe(




          {

           

            next: (val: any) => {

              console.log("value outside", val);

           

 console.log(delbasepayload.projectActivity);

              this.messageService.add({ severity: 'success', summary: `${activeProj.projectActivity==="Y"?"Active":"InActive"}`, detail: `${activeProj.projectActivity==="Y"?"Project is Active":"Project is InActive"}`, life: 3000 });

              this.ngOnInit();

            },


            error: (err: any) => {


              this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Failed to Active Project', life: 3000 });


              this.ngOnInit();

            }

          })


      },reject: () => {


        this.ngOnInit();

      }

    });

  }
  updateProject()
  {
    
  this.progressbar=true;
    var date_period_year_yy_from=this.datepipe.transform(this.date_period_year, 'yyyy-MM-dd');
    var date_period_year_yy_end=this.datepipe.transform(this.date_period_year2, 'yyyy-MM-dd');
    console.log("update value",this.projectForm.value);

    this.projectService.createProjectCode(this.projectForm.value)
          .subscribe(
            {
              
              
              next : (value) => {
                this.ProgressSpinnerDlg=true;
                if(value === null)
                {
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                 // window.location.reload();
                }
                else
              {
                this.ProgressSpinnerDlg=false;
                this.messageService.add({severity:'success', summary: 'Success', detail: 'Project Updated Successfully'});
                
               this.progressbar=false;
                // setTimeout(() => {

                //   window.location.reload();

                // }, 1000);
               // window.location.reload();
           
              //  this.ngOnInit();
              this.getListofProject();
               this.projectDialog = false;
              }
              },
              error : (err) => {
                this.progressbar=false;
                this.projectMessage = err.error.message;
                this.messageService.add({severity:'error', summary: 'Failure', detail: this.projectMessage});
              }
            }
          )
  }
  addproject()
  {
    this.router.navigate(['/dashboard/addproject']);
  }
  showDialog() {
    this.display = true;
    this.projectForm.reset();
    this.dateformat=false;
}
closedialog()
{
 // alert("hi");
  this.display=false;
}
changeShowResults(event: boolean) {
  console.log('this is not getting called')
  if (event) {
    this.showResults = false;
  }
}
saveProjects()
{
  this.progressbar=true;
  var date_period_year_yy_from=this.datepipe.transform(this.date_period_year, 'yyyy-MM-dd');
  var date_period_year_yy_end=this.datepipe.transform(this.date_period_year2, 'yyyy-MM-dd');

let payload={
projectName :this.projectForm.value.projectName,
clientName : this.projectForm.value.clientName,
emailAddress : this.projectForm.value.emailAddress,
pmo : this.projectForm.value.pmo,
from_date:date_period_year_yy_from,
end_date:date_period_year_yy_end,
projectActivity:this.projectForm.value.projectActivity
}

console.log("save date value",date_period_year_yy_from);
this.display = true;
if(payload.end_date===null)
{
  this.messageService.add({severity:'error', summary: 'Failure', detail: 'Should fill the mandatory field: To Date'});
  this.progressbar=false;
}
else
{
  this.projectService.createProjectCode(payload).subscribe(
    {
      
      next : (value) => {
        if(value === null)
            {
             
              this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
            }
          
            else
            {
              console.log(payload.from_date);
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Project Created Successfully'});
              this.getListofProject();
              this.display = false;
              this.progressbar=false;
            }
          },
          error : (err:any) => {
            this.progressbar=false;
            this.projectMessage = err.error.message;
            this.messageService.add({severity:'error', summary: 'Failure', detail: this.projectMessage});
          }
        }
      )
}

}
}
