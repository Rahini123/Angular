import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-requesterdashboard',
  templateUrl: './requesterdashboard.component.html',
  styleUrls: ['./requesterdashboard.component.scss'],
})
export class RequesterdashboardComponent implements OnInit {
  breadcrumb: any;
  showdivgeneral:boolean=true;
  showdivuser:boolean=false

  constructor(private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumb = [
      {
        label: 'Admin',
        url: '',
      },
      {
        label: 'User',
        url: '',
      },
      {
        label: 'Requester',
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
          label: 'Requester',
          url: '',
        },
        {
          label: 'Requesters',
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
          label: 'Requester',
          url: '',
        },
        {
          label: 'New Requesters',
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
          label: 'Requesters',
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
