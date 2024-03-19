import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private http: HttpClient) { }
  getListOfWorkFlow() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/WorkFlow/Service/getListOfWorkFlow`);
  }
  createWorkflow(payload: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/WorkFlow/Service/createOrUpdateWorkFlow`,
      payload
    );
  }
}
