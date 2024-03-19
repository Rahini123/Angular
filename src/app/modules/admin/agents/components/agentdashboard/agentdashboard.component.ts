import { Component, OnInit } from '@angular/core';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-agentdashboard',
  templateUrl: './agentdashboard.component.html',
  styleUrls: ['./agentdashboard.component.scss'],
})
export class AgentdashboardComponent implements OnInit {
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
        label: 'Agent',
        url: '',
      },
      {
        label: 'Agents',
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
          label: 'Agent',
          url: '',
        },
        {
          label: 'Agents',
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
          label: 'Agent',
          url: '',
        },
        {
          label: 'New Agents',
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
          label: 'Agent',
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
