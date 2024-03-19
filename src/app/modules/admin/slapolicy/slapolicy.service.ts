import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SlapolicyService {

  constructor(
    private http: HttpClient
  ) { }
  getListOfslapolicy_incident() : Observable<any>
{
    return this.http.get<any>(`/TicketManager/api/SlaPolicy/Service/getSlaPolicyList`);
}
getListOfslapolicy_Service() : Observable<any>
{
    return this.http.get<any>(`/TicketManager/api/SlaPolicy/Service/getServiceSlaPolicyList`);
}
  createslapolicy(createslapolicy :any) : Observable<any>
{
  return this.http.post<any>(`/TicketManager/api/SlaPolicy/Service/createOrUpdateSLA`, createslapolicy).pipe(map((res) => res));
}
deleteSlaById(slaId : number)
{
  return this.http.delete<any>(`/TicketManager/api/SlaPolicy/Service/delete/`+ slaId);
}

deleteSlaServiceById(sla_Id : number)
{
  return this.http.delete<any>(`/TicketManager/api/SlaPolicy/Service/deleteSLAService/`+ sla_Id);
}
}
