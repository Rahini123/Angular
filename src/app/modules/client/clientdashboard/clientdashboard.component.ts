import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.scss']
})
export class ClientdashboardComponent implements OnInit {
  breadcrumb: any;
  showdivgeneral:boolean=true;
  showdivuser:boolean=false

  constructor(
    private ngDynamicBreadcrumbService : NgDynamicBreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        label: 'Client',
        url: '',
      },
      {
        label: 'Clients',
        url: '',
      },
  
    ];
  }
  handleChange(e: any) {
    if (e.index == 0) {
      this.showdivuser=false;
      this.showdivgeneral=true;
      this.breadcrumb = [
        {
          label: 'Client',
          url: '',
        },
        {
          label: 'Clients',
          url: '',
        },
      ];
    } else if (e.index == 1) {
      this.showdivuser=true;
      this.showdivgeneral=false;
      this.breadcrumb = [
        {
          label: 'Client',
          url: '',
        },
        {
          label: 'New Clients',
          url: '',
        },
      ];
    } else {
      this.breadcrumb = [
        {
          label: 'Client ',
          url: '',
        },
        {
          label: 'Import',
          url: '',
        },
      ];
    }
    this.ngDynamicBreadcrumbService.updateBreadcrumb(this.breadcrumb);
  }


}
