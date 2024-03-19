import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {

  constructor(private http: HttpClient) { }
  createAdvisoryUpdate(advisoryPayload :any) : Observable<any>
  {
    return this.http.post<any>(`/TicketManager/api/advisory/service/createOrUpdateAdvisory`, advisoryPayload);
  }
  getListofAdvisory() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/advisory/service/getListOfAdvisoryDetails`);
  }
  getListOfAdvisorybyid(id: number): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/advisory/service/getAdvisoryDetailsById?`+id
    );
  }
}
