import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss']
})
export class GroupDashboardComponent implements OnInit {
  breadcrumb : any;
  showdivgeneral:boolean=true;
  showdivuser:boolean=false

  constructor(
    private ngDynamicBreadcrumbService : NgDynamicBreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        label: 'Admin',
        url: '',
      },
      {
        label: 'Group',
        url: '',
      },
      {
        label: 'Groups',
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
          label: 'Admin',
          url: '',
        },
        {
          label: 'Group',
          url: '',
        },
        {
          label: 'Groups',
          url: '',
        },
      ];
    } else if (e.index == 1) {
      this.showdivuser=true;
      this.showdivgeneral=false;
      this.breadcrumb = [ 
        {
          label: 'Admin',
          url: '',
        },
        {
          label: 'Group',
          url: '',
        },
        {
          label: 'New Groups',
          url: '',
        },
      ];
    } else {
      this.breadcrumb = [
        {
          label: 'Admin',
          url: '',
        },
        {
          label: 'Groups',
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
