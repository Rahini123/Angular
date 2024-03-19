import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[];
  projectNames:any;
    home: MenuItem;
  constructor(private primengConfig: PrimeNGConfig,
    private router: Router) { }

  ngOnInit(): void {
    this.projectNames = environment.outbound_project_name;
    this.primengConfig.ripple = true;
    this.items = [
    
      {label: 'Admin',
    },
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
  }
  clickagentlink()
  {
    this.router.navigate(['/dashboard/admin/agents']);
}
clickScheduleslink()
{
  
  this.router.navigate(['/dashboard/admin/Schedules']);
}
clickroleslink()
{
  this.router.navigate(['/dashboard/admin/roles']);
}
clickEmaillink()
{
  this.router.navigate(['/dashboard/emailsetting'])
}
clickgrouplink()
{
  this.router.navigate(['/dashboard/admin/groups']);
}
clickrequestorslink()
{
  this.router.navigate(['/dashboard/admin/requester']);
}
clickslalink()
{
  this.router.navigate(['/dashboard/sladashboard']);
}
clickformbuilder()
{
  this.router.navigate(['/dashboard/formbuilder']);
}
clickworkflow()
{
  this.router.navigate(['/dashboard/workflow']);
}
clickAdvisory()
{
  this.router.navigate(['/dashboard/Advisory']);
}
over(){
  console.log("Mouseover called");
 
}

out(){
  console.log("Mouseout called");
}
}