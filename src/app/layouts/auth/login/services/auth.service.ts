import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  roleAs: any;
  authtoken: any;
  username: any;
  projectid: any;
  groupName: any;
  projectName:any;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private route: Router
  ) {}

  public isAuthenticated(): boolean {
    let token: any;

    token = localStorage.getItem('accessToken');
    if (this.jwtHelper.isTokenExpired(token)) {
      // session expired
      // toastr msg

      this.signOut();
    }
    //return !this.jwtHelper.isTokenExpired(token);
    return true;
  }

  public signOut(): void {
    // localStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('sub');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('SuperUser');
    localStorage.removeItem('groupName');
    localStorage.removeItem('projectId');
    localStorage.removeItem('projectName');
    localStorage.removeItem('historyValue');
    console.log(localStorage.getItem('accessToken'));
    this.route.navigate(['']);
  }

  getrole() {
    this.roleAs = localStorage.getItem('role') || '{}';
    return this.roleAs;
  }
  getauthtoken() {
    this.authtoken = localStorage.getItem('accessToken') || '{}';
    return this.authtoken;
  }
  getUsername() {
    this.username = localStorage.getItem('username') || '{}';
    return this.username;
  }
  getprojectid() {
    this.projectid = localStorage.getItem('projectId') || '{}';
    return this.projectid;
  }
  getprojectName() {
    this.projectName = localStorage.getItem('ProjectName') || '{}';
    return this.projectName;
  }
  getgroupname() {
    this.groupName = localStorage.getItem('groupName') || '{}';
    return this.groupName;
  }
  public login(loginpayload: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/auth/signin`, loginpayload)
      .pipe(
        map((token) => {
          localStorage.setItem(
            'accessToken',
            token.tokenType + ' ' + token.accessToken
          );

          const helper = new JwtHelperService();
          const decodeToken = helper.decodeToken(token.accessToken);
console.log("values of ",decodeToken);
          localStorage.setItem('username', decodeToken.username);
          localStorage.setItem('role', decodeToken.role);
          localStorage.setItem('tokenExpiration', decodeToken.exp);
          localStorage.setItem('projectId', decodeToken.projectId);
          localStorage.setItem('ProjectName',token.projectName);
          localStorage.setItem('groupName', decodeToken.groupName);
          console.log('Role', decodeToken.role);
          console.log(decodeToken.sub);
          console.log('ProjectName',token.projectName);
          console.log('Projectid', decodeToken.projectId);
          console.log('GroupName', decodeToken.groupName);

          return decodeToken.accessToken;
        })
      );
  }
}
