import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { errorcodeservice } from '../errorcodeservice';

@Component({
  selector: 'app-newerror',
  templateUrl: './newerror.component.html',
  styleUrls: ['./newerror.component.scss'],
  providers : [errorcodeservice,MessageService]
})
export class NewErrorCodeComponend implements OnInit {

  constructor(
    private roleService : errorcodeservice,
    private messageService : MessageService,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.errorForm = this.fb.group(
      {
        error_code : '',
        error_name : '',
        error_description : ''

      })
  }

  errorForm : FormGroup;
  errorMessage : any;
  errors : any;

  saveErrors()
  {
    this.roleService.createErrorCode(this.errorForm.value).subscribe(
      {
        next : (value) => {
          if(value === null)
              {
                this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
              }
              else
              {
                this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Error Code Created Successfully'});
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

  method(){
    alert("Control");
  }

}