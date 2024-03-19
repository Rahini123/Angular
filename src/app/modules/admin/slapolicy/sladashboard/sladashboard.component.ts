import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sladashboard',
  templateUrl: './sladashboard.component.html',
  styleUrls: ['./sladashboard.component.scss']
})
export class SladashboardComponent implements OnInit {
  projectNames:any;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.projectNames = environment.outbound_project_name;
  }
  slaservice()
  {
    this.router.navigate(['/dashboard/slapolicy']);
  }
  slaincident()
  {
    this.router.navigate(['/dashboard/slaincident']);
    
    
  }
}
