import { MenuItem, MessageService } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordService } from './change-passwordService';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  items: MenuItem[];
  confrimpassword:any;
  newpassword:any;
  passwordmatch:boolean=false;
  passerrormsg:any;
  password:any
  home: MenuItem;
  constructor(
    private messageService: MessageService,
    private passwordService: PasswordService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.items = [
    
      {
        label: 'Change Password',
      
      },
      
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.passwordForm = this.fb.group({
      // 'oldpassword': new FormControl('', Validators.required),
      'newpassword': new FormControl('', Validators.required),
      'confirmpassword': new FormControl('', [Validators.required]),

    });
  }
  submitpass()
  {
    this.passwordmatch=false;
  }
submit()
{
  this.newpassword=this.passwordForm.controls['newpassword'].value;
  this.confrimpassword=this.passwordForm.controls['confirmpassword'].value;
  //alert(this.newpassword+this.confrimpassword);
  if(this.newpassword===this.confrimpassword)
  {
    // alert("correct password");
    this.password=this.newpassword;
    this.passerrormsg="Correct Password";
    this.passwordmatch=false;
  }else{
    // alert("incorrect password");
    this.passerrormsg="InCorrect Password"
    this.passwordmatch=true;
  }
}
  savePassword() {
    

this.newpassword=this.passwordForm.controls['newpassword'].value;
this.confrimpassword=this.passwordForm.controls['confirmpassword'].value;
if(this.newpassword===this.confrimpassword)
{
  // alert("correct password");
  this.password=this.newpassword;
  this.passerrormsg="Correct Password"
}else{
  // alert("incorrect password");
  this.passerrormsg="InCorrect Password"
}
let payload={
password:this.password,
}
    this.passwordService.ForgetPassword(payload)
      .subscribe(
        {
          next: (res: string) => {

            if(res != ''){

            this.messageService.add(
              {
                severity: "success", summary: "Change Password", detail: "Password  changed Successfully"
              })
            }
            else {
              this.messageService.add(
                {
                  severity: "error", summary: "Mandatory", detail: "Fill Mandatory Filed"
                })
            }

          }, 
          
          error: (err: any) => {
            this.messageService.add(
              {
                severity: "warn", summary: "Inavlid", detail: "Password Creation Failed"
              })
          }
        })
  }

}
