import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-rolesdashboard',
  templateUrl: './rolesdashboard.component.html',
  styleUrls: ['./rolesdashboard.component.scss'],
})
export class RolesdashboardComponent implements OnInit {
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
        label: 'Roles',
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
          label: 'Roles',
          url: '',
        },
        {
          label: 'Roles',
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
          label: 'Roles',
          url: '',
        },
        {
          label: 'New Role',
          url: '',
        },
      ];
    }
    this.ngDynamicBreadcrumbService.updateBreadcrumb(this.breadcrumb);
  }
}
