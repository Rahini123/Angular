import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentgroupService {

  constructor(
    private http : HttpClient
  ) { }

  createGroups(grouppayload : any) : Observable<any>
    {
        return this.http.post<any>(`/TicketManager/api/groupAgents/Service/createorUpdateGroup`, grouppayload)
    }
    getListOfprojectValues() : Observable<any>
    {
      return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getListOfProject`);
    }
    getListofProject_activeList() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getProjectActiveList`);
  }
    getAllGroups()
    {
       return this.http.get<any>(`/TicketManager/api/groupAgents/Service/getGroups`);
    }

    basicurl = '/TicketManager/api/groupAgents/Service';

    deleteGroupById(groupAgentId : number)
    {
        return this.http.delete<any>(this.basicurl + '/delete/' + groupAgentId);
    }

    getGroups(groupAgentId : number)
    {
        return this.http.get<any>(this.basicurl + '/get/' + groupAgentId);
    }
    getListOfProjectValues() : Observable<any>
    {
      return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getListOfProject`);
    }
  
    businessFunctions()
    {
        return this.http.get<any>(`/TicketManager/api/groupAgents/Service/getListofBusinessFunctions`);
    }

    unassignedTicketTimings()
    {
        return this.http.get<any>(`/TicketManager/api/groupAgents/Service/getListofUnassignedTicket`);
    }

    getListofGroupNames()
    {
      return this.http.get<any>(`/TicketManager/api/groupAgents/Service/getListofGroupNames`);
    }
    deleteSelectedGroups(ids : number[]) : Observable<any>
 {
 //console.log(this.arr);
 const data = {'ids' : ids};
 // localStorage.setItem("accessToken",value.accessToken);
 return this.http.post<any>(' '+ '/deleteMultipleAgents',data);
 }


}
