import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }
  ForgetPassword(userpayload : any) : Observable<any>
  {
    return this.http.put<any>(`/TicketManager/api/auth/updateNewPasswordForUser`,userpayload);
  }
}
