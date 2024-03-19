import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { environment } from 'src/environments/environment';
import { LoginPayload } from './login';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers : [MessageService]
})
export class LoginComponent {
  loginFormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  projectNames:any;
  hasUnitNumber = false;
  currentUser : any;
  errorMessage : any;
  // isLoading = new BehaviorSubject<false>();

  constructor(private fb: FormBuilder,
    private messageService : MessageService,
    private router : Router,
    private authService : AuthService,
    private bnIdle: BnNgIdleService) {}
    ngOnInit(): void {
      this.projectNames=environment.outbound_project_name;
      // this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
      //   if (isTimedOut) {
      //     console.log('session expired');       
      //     localStorage.removeItem('accessToken');
      //     localStorage.removeItem('username');
      //     localStorage.removeItem('role');
      //     localStorage.removeItem('sub');
      //     localStorage.removeItem('tokenExpiration');
      //     //this.router.navigate(['/']);
      //     window.location.reload();
          
      //   }
      // });
    }
    loginData : LoginPayload = new LoginPayload();  
  login(payload : any)
  {

    

    this.authService.login(this.loginData).subscribe(
      {
        next : (value:any) => {
          if(value)
          {
            // Swal.fire(
            //   '',
            //   'Login Sucess',
            //   'success',
              
              
            // );
            //this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Login Success'});
          } else {
            // Swal.fire(
            //   '',
            //   'Login Sucess',
            //   'success'
            // );
          //  this.messageService.add({severity:'warn', summary: 'Invalid', detail: 'Invalid Credentials'});
          }
          this.router.navigate(['/dashboard/dashboarditem']);

        },
        error : (err:any) => {
          this.errorMessage = err.error.message;
         // this.messageService.add({severity:'error', summary: 'Failure', detail: 'Login Failed'});
          console.log(this.errorMessage);
          Swal.fire({
            icon: 'error',
          
            text: 'Login Failed',
          
          })
        }
      }
    )
  }
}
