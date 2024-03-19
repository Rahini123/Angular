import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ ConfirmationService],
})
export class HeaderComponent implements OnInit {
  projectNames:any;
  constructor( private authService : AuthService,
    private confirmationService: ConfirmationService,) { }

  items : MenuItem[];

  ngOnInit(): void {
    this.projectNames=environment.outbound_project_name;
    {
      this.items = [
        {
          icon : 'pi pi-fw pi-user',
          items : [
            {
              label : 'Profile Settings',
              routerLink : [''],
              routerLinkActiveOptions : { exact : true},
            },
            {
              separator : true,
            },
            {
              label: 'Documentation', icon: 'pi pi-fw pi-file',
            },
          ]
        }
      ];
    }
    
  }
  logOutr()
  {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Logout ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.authService.signOut();
       
      },
    });
   
  }
}
