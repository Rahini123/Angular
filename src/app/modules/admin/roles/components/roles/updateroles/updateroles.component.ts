import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from '../modal/role';
import { RoleService } from '../rolesservice';

@Component({
  selector: 'app-updateroles',
  templateUrl: './updateroles.component.html',
  styleUrls: ['./updateroles.component.scss'],
  providers :[RoleService,MessageService]
})
export class UpdaterolesComponent implements OnInit {
  role: any;
  roleDialog: boolean;

  constructor(
    private roleService : RoleService,
    private fb : FormBuilder,
    private messageService : MessageService,
    private router : ActivatedRoute
  ) { }

  roleForm : FormGroup;
  errorMessage : any;

  ngOnInit(): void 
  {
    this.roleForm = this.fb.group(
      {
        id : '',
        name : '',
        description : ''
      });

      const res = this.router.snapshot.params['id'];

      this.roleService.getRoleById(res)
            .subscribe((result) => 
            {
              this.roleForm = this.fb.group(
                {
                  id : new FormControl(result['id']),
                  name : new FormControl(result['name']),
                  description : new FormControl(result['description']),
                });
            });
  }


  editRoles(role : Role)
  {
    this.role = { ...role };
    this.roleDialog = true;
    console.log(role.name);
    this.roleForm = this.fb.group(
      {
        id : this.role.id,
        name:this.role.name,
        description:this.role.description
      })
  }

  updateRoles(role : Role)
  {
    this.roleService.createRoles(this.roleForm.value)
          .subscribe(
            { next : (value) => 
              {
                if(value === null)
              {
                this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
              }
              else
              {
                this.roleForm.setValue({
                  id:this.role.id,
                  name:this.role.name,
                  description:this.role.description
                 })
                this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Roles Updated Successfully'});
              }
              }, error : (err) => {
                this.errorMessage = err.error.message;
              this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
              }}
          )
  }

}
