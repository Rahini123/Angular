import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { forgotPasswordservice } from './forgot-pass-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers : [forgotPasswordservice]
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private forgotPasswordservice : forgotPasswordservice,
    private messageService : MessageService,
    private route :Router,
    private fb : FormBuilder,

  ) { }

  forgetForm: FormGroup;
  errorMessage: any;
 projectNames: any; 
  url:any;

  ngOnInit(): void {
    this.projectNames=environment.outbound_project_name;
    this.forgetForm = this.fb.group(
      {
        email : ['', Validators.required],
        forgetPasswordUrl: '',
      })
  }

  // routerLink = '/TicketManager/api/auth/updateNewPassword';

  forgotPwd()
  {
    let forgotpay = {
      email : this.forgetForm.value.email,
      forgetPasswordUrl : 'http://localhost:4200/TicketManager/auth/forgetPassword',
    }
    this.forgotPasswordservice.forgetPassword(forgotpay).subscribe(
      {
        next : (value: null) => {
          if(value === null)
              {
                this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
              }
              else
              {
                this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Mail Send Successfully'});
                setTimeout(() => {

                  window.location.reload();

                }, 1000);
              }
            },
            error : (err: { error: { message: any; }; }) => {
              this.errorMessage = err.error.message;
              this.messageService.add({severity:'error', summary: 'Failure', detail: this.errorMessage});
            }
          }
        )
  }
  
  loginNavigation(){
    this.route.navigate(['/login']);
   }

}
