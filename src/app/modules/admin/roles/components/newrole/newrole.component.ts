import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoleService } from '../roles/rolesservice';

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.scss'],
  providers : [RoleService,MessageService]
})
export class NewroleComponent implements OnInit {

  constructor(
    private roleService : RoleService,
    private messageService : MessageService,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void 
  {
    this.roleForm = this.fb.group(
      {
        id : '',
        name : '',
        description : ''
      })
  }

  roleForm : FormGroup;
  errorMessage : any;
  roles : any;

  saveroles()
  {
    this.roleService.createRoles(this.roleForm.value)
        .subscribe(
          {
            next : (value) => 
            {
              if(value === null)
              {
                this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
              }
              else
              {
                this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Roles Created Successfully'});
                
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


 

}
