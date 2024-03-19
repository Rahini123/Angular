import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class projectService {
  constructor(private http: HttpClient) {}
private booleanvalue =false;
getvalue()
{
  return this.booleanvalue;
}
setvalue(value:boolean)
{
  this.booleanvalue=value;
}
getListofClient_activeList() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Client/Service/getClientActiveList`);
  }
getListofProject_activeList() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getProjectActiveList`);
  }
  getListofProject() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getListOfProject`);
  }
  ClientListFunctions() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Client/Service/getListOfClient`);
  }
  createProjectCode(projectpayload :any) : Observable<any>
{
  return this.http.post<any>(`/TicketManager/api/ProjectCategory/Service/createOrUpdateProject`, projectpayload);
}

deleteProjectById(projectId : number)
{
  return this.http.delete<any>(`/TicketManager/api/ProjectCategory/Service/delete/` + projectId);
}

  activeProject(projectpayload :any) : Observable<any>

  {

    return this.http.post<any>(`/TicketManager/api/ProjectCategory/Service/deleteProject`, projectpayload);

  }

   pmosListFunctions() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Users/Service/getListOfPmos`);
  }

  getprojectsByClientId(clientid:any):Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/ListOfProjects/`+clientid);
  }
  getprojectsByClientName(clientName:any):Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/ListOfProject/`+clientName);
  }
}
