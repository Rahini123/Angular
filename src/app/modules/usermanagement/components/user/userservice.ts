import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<any>('assets/users.json')
      .toPromise()
      .then((res) => <User[]>res.data)
      .then((data) => {
        return data;
      });
  }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
  clientnamelist() 
  {
    return this.http.get<any>(`/TicketManager/api/Client/Service/getListOfClient`);
  }
  
  roleslist()
  {
    return this.http.get<any>(`/TicketManager/api/Role/Service/getRoles`);
  }
  CreateUser(userpayload : any) : Observable<any>
  {
    return this.http.post<any>(`/TicketManager/api/auth/signup`,userpayload);
  }
  getAgentEmailByNames(agentName : any): Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Agent/groupAgents/getAgentEmailByNames/`+agentName);
  }
  getListOfProjectId(id : any): Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/ListOfProjects/`+id);
  }
  getListOfusers()
  {
    return this.http.get<any>(`/TicketManager/api/Users/Service/getListOfUsers`);
  }

  url = '/TicketManager/api/Users/Service';

  deleteUser(userId : number) : Observable<any>
  {
    return this.http.delete<any>(this.url + '/delete/' + userId);
  }
  activeStatus(userPayload : any) : Observable<any>

  {

    return this.http.post<any>(`/TicketManager/api/Users/Service/deleteUser`,userPayload)

  }
  deleteSelectedUser(userpayload : any) : Observable<any>
  {
    return this.http.post<any>(this.url + '/deleteMultipleUsers',userpayload);
  }

  userUrl = '/TicketManager/api/Users/Service/'

  getUserByUsername(username : string) : Observable<any>
  {
    return this.http.get<any>(this.userUrl + 'users/' + username);
  }

  updateUser(userPayload : any) : Observable<any>
  {
    return this.http.put<any>(`/TicketManager/api/Users/Service/updateUserDetails`,userPayload)
  }

  getListOfPMOValues() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getListOfProject`);
  }
  getListofProject_activeList() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getProjectActiveList`);
  }

  getListOfGroups() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/groupAgents/Service/getGroups`);
  }

}
