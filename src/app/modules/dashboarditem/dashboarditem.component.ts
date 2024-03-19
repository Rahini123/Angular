import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboarditem',
  templateUrl: './dashboarditem.component.html',
  styleUrls: ['./dashboarditem.component.scss']
})
export class DashboarditemComponent implements OnInit {
  dashboard:boolean=false;
  Tickets:boolean=false;
  Profile:boolean=false;
  Errorcode:boolean=false;
  Projects:boolean=false;
  EmailSettings:boolean=false;
  ClientDetails:boolean=false;
  Roles:boolean=false;
  User:boolean=false;
  Agent:boolean=false;
  projectNames:any;
  Groups:boolean=false;
  roleuser:any;
  cardsec:any;
  authtoken:any;
  constructor(
    private authService : AuthService,
      private router: Router
  ){
    
  }

  ngOnInit(): void {
    this.dashboard=false;
    this.Tickets=false;
    this.Profile=false;
    this.Errorcode=false;
    this.cardsec=false;
    this.ClientDetails=false;
    this.EmailSettings=false;
    this.User=false;
    this.Agent=false;
    this.Groups=false;
    this.Projects=false;
    this.projectNames = environment.outbound_project_name;
    this.roleuser=this.authService.getrole();
    this.authtoken=this.authService.getauthtoken();
    console.log("roleuser",this.roleuser);
    console.log("authtoken",this.authtoken);
    if(this.roleuser=='ROLE_AGENT'||this.roleuser=='ROLE_GROUP'||this.roleuser=='ROLE_SUPERAGENT')
    {
      this.dashboard=true;
      this.Tickets=true;
      this.Profile=true;
      this.Errorcode=true;
      

    }else if(this.roleuser=='ROLE_USER')
    {
      this.dashboard=true;
      this.Tickets=true;
      this.Profile=true;
    
    }else{
      this.dashboard=true;
      this.Tickets=true;
      this.Profile=true;
      this.Errorcode=true;
      this.cardsec=true;
      this.ClientDetails=true;
      this.EmailSettings=true;
      this.User=true;
      this.Agent=true;
      this.Projects=true;
      this.Groups=true;

    }
    
  }

}
