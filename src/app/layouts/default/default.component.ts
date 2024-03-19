import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit 
{

  public isLoading$ : Observable<boolean> | undefined;
  public sidebaropen = true;
  mobileQuery : MediaQueryList;

  private _mobileQueryListener : () => void;

  constructor(
    changeDetectorRef : ChangeDetectorRef,
    media : MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width : 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

}
