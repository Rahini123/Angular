import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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
        label: 'User',
        url: '',
      },
      {
        label: 'Users',
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
          label: 'User Management',
          url: '',
        },
        {
          label: 'User',
          url: '',
        },
        {
          label: 'Users',
          url: '',
        },
      ];
    } else if (e.index == 1) {
      this.showdivuser=true;
      this.showdivgeneral=false;
      this.breadcrumb = [
        {
          label: 'User Management',
          url: '',
        },
        {
          label: 'User',
          url: '',
        },
        {
          label: 'New User',
          url: '',
        },
      ];
    } 
    this.ngDynamicBreadcrumbService.updateBreadcrumb(this.breadcrumb);
  }

}
