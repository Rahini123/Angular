import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from './modal/agent';

@Injectable()
export class AgentService {
  constructor(private http: HttpClient) {}

  getAgents() {
    return this.http
      .get<any>('assets/agents.json')
      .toPromise()
      .then((res) => <Agent[]>res.data)
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

  createAgents(groupPayload : any): Observable<any>
  {
    return this.http.post<any>(`/TicketManager/api/Agent/groupAgents/createOrUpdateAgentDetails`, groupPayload);
  }

  getListOfAgents()
  {
    return this.http.get<any>(`/TicketManager/api/Agent/groupAgents/getListOfAgents`);
  }
  getListOfPMOValues() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ProjectCategory/Service/getListOfProject`);
  }
  getListOfAgentNames()
  {
    return this.http.get<any>(`/TicketManager/api/Agent/getListofAgentNames`);
  }

  // By Id
  url = '/TicketManager/api'

  getAgentById(agent_id : number)
  {
    return this.http.get<any>(this.url + '/agent/' + agent_id);
  }

  deleteAgentById(agent_id : number)
{
  return this.http.delete<any>(` /TicketManager/api/Agent/groupAgents/deleteagentbyid/ ` +agent_id);
}


deleteSelectedAgents(ids : number[]) : Observable<any>
 {
 //console.log(this.arr);
 const data = {'ids' : ids};
 // localStorage.setItem("accessToken",value.accessToken);
 return this.http.post<any>(this.url + '/Agent/groupAgents/deleteMultipleAgents',data);
 }



}
