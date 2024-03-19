import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-projectdashboard',
  templateUrl: './projectdashboard.component.html',
  styleUrls: ['./projectdashboard.component.scss']
})
export class ProjectdashboardComponent implements OnInit {
  breadcrumb: any;
  showdivgeneral:boolean=true;
  showdivuser:boolean=false

  constructor(
    private ngDynamicBreadcrumbService : NgDynamicBreadcrumbService
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        label: 'Project',
        url: '',
      },
      {
        label: 'Projects',
        url: '',
      },
  
    ];
  }
  handleChange(e: any) {
    this.showdivuser=false;
    this.showdivgeneral=true;
    if (e.index == 0) {
      this.breadcrumb = [
        {
          label: 'Project',
          url: '',
        },
        {
          label: 'Projects',
          url: '',
        },
      ];
    } else if (e.index == 1) {
      this.showdivuser=true;
      this.showdivgeneral=false;
      this.breadcrumb = [
        {
          label: 'Project',
          url: '',
        },
        {
          label: 'New Projects',
          url: '',
        },
      ];
    } else {
      this.breadcrumb = [
        {
          label: 'Project',
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
