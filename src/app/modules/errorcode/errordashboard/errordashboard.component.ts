import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-errordashboard',
  templateUrl: './errordashboard.component.html',
  styleUrls: ['./errordashboard.component.scss']
})
export class ErrordashboardComponent implements OnInit {
  breadcrumb: any;
  showdivgeneral:boolean=true;
  showdivuser:boolean=false


  constructor(
    private ngDynamicBreadcrumbService : NgDynamicBreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        label: 'Error Code',
        url: '',
      },
      {
        label: 'Error Codes',
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
          label: 'Error Code',
          url: '',
        },
        {
          label: 'Error Codes',
          url: '',
        },
      ];
    } else if (e.index == 1) {
      this.showdivuser=true;
      this.showdivgeneral=false;
      this.breadcrumb = [
        {
          label: 'Error Code',
          url: '',
        },
        {
          label: 'New Error code',
          url: '',
        },
      ];
    } else {
      this.breadcrumb = [
        {
          label: 'Error Code',
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
