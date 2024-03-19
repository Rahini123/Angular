import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class errorcodeservice {
  constructor(private http: HttpClient) {}

  getListOfErrorCode() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ErrorCode/Service/getListOfErrors`);
  }

//   baseUrl = '/TicketManager/api/TicketController/get/';

createErrorCode(errorpayload :any) : Observable<any>
{
  return this.http.post<any>(`/TicketManager/api/ErrorCode/Service/createOrUpdateErrorCode`, errorpayload);
}

deleteErrorById(error_id : number)
{
  return this.http.delete<any>(` /TicketManager/api/ErrorCode/Service/delete/` + error_id);
}

getRoleById(error_id : number)
  {
    return this.http.get<any>(`/TicketManager/api/ErrorCode/Service/getErrorId/` + error_id);
  }

}
