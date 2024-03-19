import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class forgotPasswordservice {
  constructor(private http: HttpClient) {}

forgetPassword(forgetpayload :any) : Observable<any>
{
  return this.http.post<any>(`/TicketManager/api/auth/forgetPassword`, forgetpayload);
}

updatePassword(forgetpayload :any) : Observable<any>
{
  return this.http.post<any>(`/TicketManager/api/auth/updateNewPassword`, forgetpayload);
}


}
