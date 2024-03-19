import { ClientComponent } from './client.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ClientComponentService {
  constructor(private http: HttpClient) {}
  getListOfClient_activelist() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Client/Service/getClientActiveList`);
  }
  getListOfClient() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Client/Service/getListOfClient`);
  }
  getListOfTimezone() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Ticket/Service/timezones`);
  }
  activeClient(clientpayload :any) : Observable<any>

  {
  
    return this.http.post<any>(`/TicketManager/api/Client/Service/deleteClient`, clientpayload);
  
  }

createClient(errorpayload :any) : Observable<any>
{
  return this.http.post<any>(`/TicketManager/api/Client/Service/createOrUpdateClient`, errorpayload);
}

deleteClientbyId(clientId : number)
{
  return this.http.delete<any>(`/TicketManager/api/Client/Service/delete/` + clientId);
}

}
