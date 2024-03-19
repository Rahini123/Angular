import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import {ConfirmationService, MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ ConfirmationService],
})
export class SidebarComponent implements OnInit {
  private previousTrigger: MatMenuTrigger;
  constructor(  private authService : AuthService,
    private confirmationService: ConfirmationService,
    private router: Router) { }
  showFiller = false;
  iconItems : MenuItem[] = [];
  activeItem : MenuItem;
  items : MenuItem[] = [];
  display = true;
  togglePanel : boolean = true;
  opened = false;
  username: any;
  iconItems2:any;
  roleuser:any;
  authtoken:any;
  userDisplayName: any;
  projectNames:any;
  changepassword:any;
  ngOnInit(): void {
    this.roleuser=this.authService.getrole();
    this.authtoken=this.authService.getauthtoken();
    this.username=this.authService.getUsername();
    console.log("roleuser",this.roleuser);
    console.log("authtoken",this.authtoken);
    this.userDisplayName= this.username;

  
    this.projectNames=environment.outbound_project_name;
    this.changepassword = [
      {
      icon: 'pi pi-lock',
      routerLink:'/dashboard/changepassword',
      label:'Change Password',
    },
    {
      icon: 'pi pi-sign-out',
      // onClick:this.logOutr(),
      command: () => {
        this.logOutr();
    },
      label:'Logout',
    }
  
  ],
  this.activeItem = this.iconItems[0];
  this.items = [
    {
      icon: 'pi pi-calendar-plus',
      routerLink: '/dashboard/data',
      routerLinkActiveOptions: { exact: true },
      label : 'Allocation Process',
      tooltipOptions: { tooltipLabel: 'Allocation Process' },
      id : '1',
    },
 
  ],
 
    this.iconItems2 = [
 
      // {
      //   icon: 'pi pi-th-large',
      //   routerLink: '/dashboard/dashboarditem',
      //   label:'Dashboard Item',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'Dashboard Item' }
      // },
      // {
      //   icon: 'pi pi-ticket',
      //   routerLink: '/dashboard/tickets',
      //   label:'Tickets',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'Tickets' }
      // },
      // {
      //   icon: 'pi pi-fw pi-ticket',
      //   routerLink: '/dashboard/projects',
      //   label:'Projects',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'Projects' }
      // },
      // {
      //   icon: 'pi pi-exclamation-triangle',
      //   routerLink: '/dashboard/errorcode',
      //   label:'Errorcode',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'Errorcode' }
      // },
      //   {
      //   icon: 'pi pi-user',
      //   routerLink: '/dashboard/usermanagement',
      //   label:'UserManagement',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'UserManagement' }
      // },
      // {
      //   icon: 'pi pi-users',
      //   routerLink: '/dashboard/client',
      //   label:'Client',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'ClientComponent' }
      // },
      // {
      //   icon: 'pi pi-cog',
      //   routerLink: '/dashboard/admin',
      //   label:'admin',
      //   routerLinkActiveOptions: { exact: true },
      //   tooltipOptions: { tooltipLabel: 'admin' }
      // },
     
      
    ];
 
  

   
   if (this.roleuser === 'ROLE_USER') {
      this.iconItems = [
        {
          icon: 'pi pi-home',
          routerLink: '/dashboard/dashboarditem',
          label:'Home',
          routerLinkActiveOptions: { exact: true },
        },
 
      
        {
          icon: 'pi pi-th-large',
          routerLink: '/dashboard/dashboarditem',
          label:'Dashboard',
          routerLinkActiveOptions: { exact: true },
        },
 
        {
          icon: 'pi pi-ticket',
          routerLink: '/dashboard/tickets',
          label:'Tickets',
          routerLinkActiveOptions: { exact: true },
        },
     
      
      ];

    } else if(this.roleuser==='ROLE_PMO' || this.roleuser==='ROLE_ADMIN')
    {
      this.iconItems = [
        {
          icon: 'pi pi-home',
          routerLink: '/dashboard/dashboarditem',
          label:'Home',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-th-large',
          routerLink: '/dashboard/dashboard',
          label:'Dashboard',
          routerLinkActiveOptions: { exact: true },
        },
 
           {
          icon: 'pi pi-ticket',
          routerLink: '/dashboard/tickets',
          label:'Tickets',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-exclamation-triangle',
          routerLink: '/dashboard/errorcode',
          label:'Error code',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-clone',
          routerLink: '/dashboard/projects',
          label:'Projects',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-users',
          routerLink: '/dashboard/clients',
          label:'Clients',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-file',
          routerLink: '/dashboard/reports',
          label:'Report',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-users',
          routerLink: '/dashboard/admin/roles',
          label:'Roles',
          routerLinkActiveOptions: { exact: true },
        },
   
          {
          icon: 'pi pi-user',
          routerLink: '/dashboard/usermanagement',
          label:'User Management',
          routerLinkActiveOptions: { exact: true },
        },
        
        {
          icon: 'pi pi-cog',
          routerLink: '/dashboard/admin',
          label:'Admin',
          routerLinkActiveOptions: { exact: true },
        },
        
        // {
        //   icon: 'pi pi-cog',
        //   routerLink: '/dashboard/Advisory',
        //   label:'Advisory',
        //   routerLinkActiveOptions: { exact: true },
        // },
        
      ];
    }  else if(this.roleuser==='ROLE_AGENT'|| this.roleuser==='ROLE_GROUP'||
    this.roleuser==='ROLE_SUPERAGENT') {
      this.iconItems = [
        {
          icon: 'pi pi-home',
          routerLink: '/dashboard/dashboarditem',
          label:'Home',
          routerLinkActiveOptions: { exact: true },
        },
      
        {
          icon: 'pi pi-th-large',
          routerLink: '/dashboard/dashboard',
          label:'Dashboard',
          routerLinkActiveOptions: { exact: true },
        },
       {
          icon: 'pi pi-ticket',
          routerLink: '/dashboard/tickets',
          label:'Tickets',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-exclamation-triangle',
          routerLink: '/dashboard/errorcode',
          label:'Error code',
          routerLinkActiveOptions: { exact: true },
        },
        {
          icon: 'pi pi-file',
          routerLink: '/dashboard/reports',
          label:'Report',
          routerLinkActiveOptions: { exact: true },
        },
      ]
    }
  }

  panelClick()
  {
    this.opened = true;
    this.togglePanel = false;
  }

  menuPanelclose() {
    this.opened = false;
    this.togglePanel = true;
  }

  openTab() {
    this.opened = true;
  }
  clickBack() {
    if (this.previousTrigger) { this.previousTrigger.closeMenu() }
  }
  logOutr()
  {
    
    this.confirmationService.confirm({
      message: 'Are you sure you want to Logout?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       
        this.authService.signOut();
      },
    });
   
  }
  openSubMenu(trigger: MatMenuTrigger) {
    if(this.previousTrigger && this.previousTrigger.menuOpen) {
      this.previousTrigger.closeMenu();     
    } 
    trigger.openMenu();
    this.previousTrigger = trigger;
  }
  
}
