import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AgentService } from 'src/app/modules/admin/agents/components/general/agentservice';
import { Activeuser } from './activeuser';
import { User } from './model/user';
import { UserService } from './userservice';
import { TicketService } from 'src/app/modules/tickets/components/ticket/ticketservice';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService, 
    UserService, ConfirmationService,
    AgentService , TicketService, ],
})
export class UserComponent implements OnInit {
  users: any;
  showagentlist:boolean=false;
  showprojectlist1:boolean=false;
  showprojectlist:boolean=false;
  showprojectlist2:boolean=false;
    isLoading: boolean = true;
    groupTickets: any;

  user: any;
  butDisabled: boolean = true;  
  value: any;
  color = 'accent';
  bonusChecked :any;
  show_red: boolean = false;
  checked1: boolean = false;
  inpSwitchVal: any;
  checked2: boolean = true;
  userDialog: boolean = false;
  display: boolean = false;
  selectedUsers: any;
  show_green: boolean = false;
  userForm: FormGroup;
  showMainContent: any;
  errorMessage: any;
  listCategory: any;
  groupbased:any;
  active:any;
  inactive:any;
  UserprojectName:any;
  progressbar:boolean=false;
  roles: any;
  setvalue: any;
  emailbyagent:any;
  Listboxgroupname:any;
  projectlabel:any;
  uservalue:any;
  values:any;
  delMuser: User;
  items: MenuItem[];
  agents:any;
  UserGroupName:any;
  home: MenuItem;
  emailTickets: any;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private agentService : AgentService,
    
  ) { }

  ngOnInit() {
this.getrolelistLOV();
this.getAgentList();
this.getGroupNameLov();
this.getBusinessFunctionLOV();
this.showprojectlist=false;

this.showprojectlist1=false
this.showprojectlist2=false;
    this.show_red = false;
    this.show_green = false;
    this.isLoading = true;

    // this.userService.getUsers().then((data) => (this.users = data));
    this.userService.getListOfusers().subscribe((res) => {
      this.isLoading = false;
      this.users = res;

      const values = this.users.values();
      for (const arr of values) {
        this.listCategory = arr.is_Active;
        console.log('values of ', this.listCategory);

        if (this.listCategory === 'Y') {
        
          this.active='Y'
          console.log(this.active);

        } else {
        
          this.inactive='N'
          console.log(this.inactive);


        }

      }

    }

    );

    // this.roles = [
    //   { name: 'ROLE_USER', code: 'RU' },
    //   { name: 'ROLE_ADMIN', code: 'RA' },
    //   { name: 'ROLE_SUPPLIER', code: 'RS' },
    // ];

    this.userForm = this.fb.group(
      {
        id:'',
         username:'',
         name:'',
         email:'',
         password:'',
         userRoles:'',
         projectName:'',
         groupName:'',
      })

    this.items = [

      { label: 'User Management', },

    ];

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem' };


  }

  // deleteSelectedUsers(user : User) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected User?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {

  //       this.userService.deleteSelectedUser(user.id).subscribe((result) => 
  //             {
  //               console.log(result);
  //               console.log('Ids',user.id);
  //             }
  //               );

  //       this.selectedUsers = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Users Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }\\

  

  handleChange(e: any) {
    var isChecked = e.checked;
    console.log(isChecked);

  }
  getuserlist()
  {
    this.userService.getListOfusers().subscribe((res) => {
      this.isLoading = false;
      this.users = res;
    });
  }
  getAgentList()
  {
 
    this.agentService.getListOfAgents().subscribe((data) =>
     {
  
      this.agents = data;
    })
     ;
  }
   getrolelistLOV() 
  {
    this.userService.roleslist().subscribe((res) => 
    {this.roles = res
    console.log(this.roles);
    });
  }
  onAccountSelect_client(event:any) {
    //alert(event);
   
    if(event==='ROLE_AGENT')
    {
      this.showagentlist=true; 
  
    }
    else
    {
      this.showagentlist=false; 
    }
    console.log('event :' + event);
    console.log(event.value);
    console.log(this.roles);
}
onAccountSelect_projectname(event:any) {
  //alert(event);
 
  if(event==='ROLE_USER')
  {
    this.showprojectlist=true; 

  }
  else
  {
    this.showprojectlist=false; 
  }
  console.log('event :' + event);
  console.log(event.value);
  console.log(this.roles);
}

getGroupNameLov() 
{
 
  this.userService.getListOfGroups().subscribe((res) => 
  {
   
    this.groupTickets = res
  });
}

getgroupbasedproject() {
  
  this.ticketService
    .getgroupbasedproject(this.values)
    .subscribe((res) => {
     
      this.groupbased = res;
      console.log("value of groupbased",this.groupbased);
   
   
    });
   
}
createUser()
{

  this.progressbar=true;
    // alert(this.userForm.value.password.length())
    // alert("others")
    let userpayload={ 
      username :this.userForm.value.username,
      email : this.userForm.value.email,
      name : this.userForm.value.name,
      password : this.userForm.value.password,
      userRoles : this.userForm.value.userRoles,
      projectName: this.projectlabel,
      groupName: this.userForm.value.groupName
     
    }
   console.log(userpayload);
    this.userService.CreateUser(userpayload)
          .subscribe(
            {
             
              next : (value) => {
          
                if(value)
                {
                 
                  this.messageService.add({severity:'success', summary: 'Success', detail: 'User Created Successfully'});
                 this.getuserlist();
                 this.display=false;
                 this.progressbar=false;
  
                }
                else
                {
              
                  this.messageService.add({severity:'warn', summary: 'Invalid', detail: this.errorMessage});
                  this.progressbar=false;
                }
              },
              error :(err) => {
              if(err.error.username=='size must be between 3 and 15')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'User Name size must be between 3 and 15'});
                this.progressbar=false;
              }else if(err.error.name=='size must be between 4 and 40')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Name size must be between 4 and 40'});
                this.progressbar=false;
              }else if(err.error.email=='must not be blank')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Email must not be blank'});
                this.progressbar=false;
              }else if(err.error.name=='must not be blank')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Name must not be blank'});
                this.progressbar=false;
              }else if(err.error.password=='must not be blank')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Name must not be blank'});
                this.progressbar=false;
              }
              else if(err.error.username=='must not be blank')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'UserName must not be blank'});
                this.progressbar=false;
              }else if(err.error.userRoles=='must not be blank')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'User Roles must not be blank'});
                this.progressbar=false;
              }else if(err.error.email=='must be a well-formed email address')
              {
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Email must be a well-formed email address'});
                this.progressbar=false;
              }
              else{  
                 this.errorMessage=err.error.message;
                
                this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
                this.progressbar=false;
              }
             
              }
            }
          )



//   if(this.userForm.value.userRoles===null)
//   {
//     this.messageService.add({severity:'warn', summary: 'UserRoles', detail:'UserRoles Cant be blank' });
//   }

//  else if(this.userForm.value.userRoles=='ROLE_ADMIN')
//   {
//     if(this.userForm.value.username===null)
//     {
//       this.messageService.add({severity:'warn', summary: 'UserName', detail:'Username Cant be blank' });
//     }else if(this.userForm.value.name===null)
//     {
//       this.messageService.add({severity:'warn', summary: 'UserName', detail:'Name Cant be blank' });
//     }else if(this.userForm.value.password===null)
//     {
//       this.messageService.add({severity:'warn', summary: 'Password', detail:'Password Cant be blank' });
      
//     }
//     else if(this.userForm.value.email===null)
//     {
//       this.messageService.add({severity:'warn', summary: 'UserName', detail:'Email Cant be blank' });
//     } else
//     {
//       this.progressbar=true;

//       let userpayload={ 
//         username :this.userForm.value.username,
//         email : this.userForm.value.email,
//         name : this.userForm.value.name,
//         password : this.userForm.value.password,
//         userRoles : this.userForm.value.userRoles,
//         projectName: this.projectlabel,
//         groupName: this.userForm.value.groupName
       
//       }
//      console.log(userpayload);
//       this.userService.CreateUser(userpayload)
//             .subscribe(
//               {
               
//                 next : (value) => {
            
//                   if(value)
//                   {
                   
//                     this.messageService.add({severity:'Success', summary: 'success', detail: 'User Created Successfully'});
//                    this.getuserlist();
//                    this.display=false;
//                    this.progressbar=false;
    
//                   }
//                   else
//                   {
                
//                     this.messageService.add({severity:'warn', summary: 'Invalid', detail: this.errorMessage});
//                     this.progressbar=false;
//                   }
//                 },
//                 error :(err) => {
                
//                   this.errorMessage=err.error.message;
//                   this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
//                   this.progressbar=false;
//                 }
//               }
//             )
//     }
//   }
 
 
}
onAccountSelect_projectname1(event:any) {
  //alert(event);
 
  if(event==='ROLE_SUPERAGENT')
  {
    this.showprojectlist1=true; 

  }
  else
  {
    this.showprojectlist1=false; 
  }
  console.log('event :' + event);
  console.log(event.value);
  console.log(this.roles);
}
onAccountSelect_projectname2(event:any) {
  //alert(event);
 
  if(event==='ROLE_GROUP')
  {
    this.showprojectlist2=true; 

  }
  else
  {
    this.showprojectlist2=false; 
  }
  console.log('event :' + event);
  console.log(event.value);
  console.log(this.roles);
}

getBusinessFunctionLOV() {

  this.userService.getListofProject_activeList().subscribe((res) => {

    this.emailTickets = res;
  });
  // this.getgroupbasedproject();
}

   clickBonusChecked(e:any) {
    var bonusChecked = e.checked;
    alert(bonusChecked);
   }
  onChange($event: MatSlideToggleChange) {
    console.log($event);
  }
  activeUser(activeuser: Activeuser,e:any) {


    this.bonusChecked = e.checked;
    //alert(this.bonusChecked);

    let delbasepayload = {


      id: activeuser.id,


      is_Active: this.bonusChecked


    }

    this.confirmationService.confirm({

      message: 'Are you sure do u want to ' 
      + `${activeuser.is_Active==="Y"?"Active the ":"InActive the "}` + activeuser.name + '?',

      header: 'Confirm',

      icon: 'pi pi-exclamation-triangle',

      accept: () => {

        this.userService.activeStatus(delbasepayload).subscribe(


          {
            
            next: (val: any) => {
              // console.log("value outside", val);
           
              console.log(delbasepayload.is_Active);



              this.messageService.add({ severity: 'success', summary: `${activeuser.is_Active==="Y"?"Active":"InActive"}`, detail: `${activeuser.is_Active==="Y"?"User is Active":"User is InActive"}`, life: 3000 });


   


              this.ngOnInit();

            },

            error: (err: any) => {

              this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Failed to Active User', life: 3000 });

              this.ngOnInit();

            }


          })

      }, reject: () => {
        this.ngOnInit();
      }

    });

  }
  


  deleteSelectedUsers() {
    // console.log('user id',this.delMuser.ids);
    this.userService.deleteSelectedUser(this.delMuser.ids)
      .subscribe((res) => {
        console.log(res);
        // console.log('Id',this.delMuser.ids[this.delMuser.id]);
      });
  }

  editUser(user: User) {
    this.userDialog = true;
    this.user = { ...user };
    // console.log('Roles',user.roles.name);
    console.log('edit list', user);
    this.uservalue=this.user.roles[0].name;
    this.UserprojectName=this.user.projectName;
    this.UserGroupName=this.user.groupName;
    console.log('edit list', this.UserprojectName);
    this.userForm.patchValue(
      {
        id: this.user.id,
        username: this.user.username,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
         userRoles : this.user.userRoles,
         projectName : this.user.projectName,
         groupName : this.user.groupName
      });
if(this.user.roles[0].name==='ROLE_GROUP')
{
this.showprojectlist=true;
this.showprojectlist2=true;
}else if(this.user.roles[0].name==='ROLE_SUPERAGENT' || this.user.roles[0].name==='ROLE_USER')
{
  this.showprojectlist=true;
  this.showprojectlist2=false;
}
else{
  this.showprojectlist=false;
this.showprojectlist2=false;
}
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.userService.deleteUser(user.id)
          .subscribe((result: any) => { console.log(result) });

        this.user = {};
        this.messageService.add({
          severity: 'Success',
          summary: 'Successfully',
          detail: 'user Deleted',
          life: 3000,
        });
        setTimeout(() => {

          window.location.reload();

        }, 1000);
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'users');
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
  onChangelist(newvalue: any,event:any) {
  
    // if(event.value.checked==true)
    // {
    //   alert("hi");
    // }else
    // {
    //   alert("nt selected");
    // }
    console.log("project name",newvalue);
    this.projectlabel=newvalue;
   this.Listboxgroupname = newvalue.agentName;
  //   this.localArray.push(this.Listboxgroupname);;
   console.log(this.Listboxgroupname);

   this.values=event.value;
  
 //  this.Listboxgroupname=event.value.agentName;
    console.log('clicked event :' +this.values);
    // if(event==='ROLE_AGENT')
    // {
    //  this.onroleagent();
    // }
    //console.log(this.localArray.push(this.values));

    this.userService.getAgentEmailByNames(this.values).subscribe((res) => 
    {
      
      this.emailbyagent = res;
      // console.log("outside",this.emailbyagent.email);
      this.userForm.get('email')?.setValue(this.emailbyagent.email);
     // 
    });
this.getgroupbasedproject();
    // this.value=this.emailbyagent.email;

  }

  UpdateUser() {
    this.progressbar=true;
    console.log("update user",this.userForm.value);
    this.userService.updateUser(this.userForm.value)
      .subscribe(
        {
          next: (value) => {

            if (value) {

              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Updated Successfully' });
              this.userDialog=false;
               this.getuserlist();
               this.progressbar=false;
            }
            else {

              this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });
              this.userDialog=false;
              this.progressbar=false;
            }
          },
          error: (err) => {
            this.progressbar=false;
            this.errorMessage = err.error.message;
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
          }
        }
      )
  }

  showDialog() {
    this.display = true;
    this.userForm.reset();
  }
}
