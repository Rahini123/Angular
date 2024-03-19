import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { NewroleComponent } from '../newrole/newrole.component';
import { Role } from './modal/role';
import { RoleService } from './rolesservice';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [MessageService, RoleService, ConfirmationService],
})
export class RolesComponent implements OnInit {
  roles: any;
  roleform: FormGroup;
  data: any;
  isLoading: boolean = true;
  item:any;
  role: any;
  errors: any;
  formvaluesrow:any;
  rolename:any;
  roleDialog: boolean = false;
  selectedColumns:any;
  selectedRoles: any;
  projectNames:any;
  roleid: any;
  rolescomp:Role[]=[];
  items: MenuItem[];

  home: MenuItem;
  constructor(
    private roleService: RoleService,
    private fb : FormBuilder, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.projectNames=environment.outbound_project_name;
    this.isLoading = true;
    this.items = [
    
      {
        label: 'Admin',
        routerLink:'/dashboard/admin'
      },
      {
        label: 'Roles',
     
      },
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    let formvalues=new NewroleComponent(this.roleService,this.messageService,this.fb);
    this.roleform=this.fb.group({
      'id':new FormControl('',Validators.required),
      'name':new FormControl('',Validators.required),
      'description':new FormControl(''),

    });
    this.roleService.getAllRoles().subscribe(data=>{
      this.isLoading = false;
      this.data = data;
     // console.log(data);
    })
   
   this.selectedColumns = [
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },];

  }
 
  deleteSelectedRoles(role:Role) {
    alert("delete");

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Role?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //  this.roles = this.roles.filter(
        //  (val: any) => !this.selectedRoles.includes(val)
        // );
        this.roleid=role.id;
        // this.rolename=role.name;
        //  console.log(this.roleid);
        // console.log(this.roles);
         //this.roleService.deletegroups(this.roleid).subscribe();
         
         this.roleService.deleteRoleById(this.roleid).subscribe();
        this.selectedRoles = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Roles Deleted',
          life: 3000,
        });
      },
    });
  }

  editRole(role: Role) {

    this.roleDialog = true;
   // let formvalues=new NewroleComponent(this.fb,this.roleService);
    this.role = { ...role };
   console.log(this.role.name);

   this.roleform.setValue({
    id:this.role.id,
    name:this.role.name,
    description:this.role.description
   })
  //   this.formvaluesrow=formvalues.roleform.controls['name'].value;
    // formvalues.roleform.setValue({
    //   name:this.role.name
    // })
   // this.formvaluesrow=formvalues.roleform.controls['name'].setValue=this.role.name;
    //this.formvaluesrow=formvalues.roleform.controls['name'];
   // console.log(this.formvaluesrow);
    // this.roleService.populateform(this.role).subscribe({
    //   next:(value)=>{
    //     this.formvaluesrow=formvalues.roleform.setValue;
    //     console.log('the values'+value);
    //   }
    // });
   
    //console.log(formvalues);
  }
// editrolerow(role:any)
// {
//   let formvalues=new NewroleComponent(this.fb,this.roleService);
//   this.role = { ...role };
//   this.roleDialog = true;
//   this.roleService.populateform(this.role.id).subscribe();
//   this.formvaluesrow=formvalues.roleform.setValue(role);
//   console.log(this.formvaluesrow);
// }

  deleteRole(role: Role) {
    //alert('here');

    this.roleid=role.id;
    this.rolename=role.name;
    console.log(this.roleid);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + role.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.roles = this.roles.filter(
        //   (val: { id: string | undefined }) => val.id !== role.id
        // );
        
    this.roleService.deleteRoleById(this.roleid).subscribe();
        this.role = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'role Deleted',
          life: 3000,
        });
        setTimeout(() => {

          window.location.reload();

        }, 1000);
      },
    });
  }

  saveRole()
  {
   if(this.roleform.invalid)
   {
    
    this.messageService.add({severity: 'error',
    summary: 'Invalid',
    detail: 'role Deleted',})
    return;
   }
   else
   {
    this.roleService.createRoles(this.roleform.value).subscribe({
      next:(res)=>{
     
        console.log(res);
        this.roleDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'role Deleted',
          life: 3000,
        });
        setTimeout(() => {

          window.location.reload();

        }, 1000);
 
      },error:(err:any)=>{
        this.errors=err.error.error;
        this.messageService.add({severity: 'error',
        summary: 'Invalid',
        detail: 'role Deleted',})
      }
    })
   }
  }
}
