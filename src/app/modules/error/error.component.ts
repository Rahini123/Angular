import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  projectNames: any;


  constructor() { }

  ngOnInit(): void {
    this.projectNames = environment.outbound_project_name;

  }

}
