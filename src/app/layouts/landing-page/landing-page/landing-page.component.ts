
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,AfterViewInit {

  projectNames:any;
  loginbutton:any;
  progressbar_detail:boolean=true;
  path = '{{ projectNames }}/assets/analytics.jpg'
  constructor(
    private route :Router,
    private logoutsec:AppComponent,
    private renderer: Renderer2
  ) { }
  ngAfterViewInit():void{
    this.progressbar_detail=false;
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }
  ngOnInit(): void { this.logoutsec.showMsg=false;
    this.projectNames = environment.outbound_project_name;
    this.loginbutton=localStorage.getItem('accessToken');
    console.log(this.loginbutton);
    if(this.loginbutton===null)
    {
      this.logoutsec.showMsg=false;
      console.log(this.logoutsec.showMsg);
    }
    else
    {
      this.logoutsec.showMsg=true;
      console.log(this.logoutsec.showMsg);
    }
  
  }

  loginNavigation(){
   this.route.navigate(['/login']);
  }
}

