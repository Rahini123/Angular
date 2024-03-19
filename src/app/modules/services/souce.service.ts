import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SouceService {

  constructor(
    private http : HttpClient
  ) { }

  getLoanDetails()
  {
// this.http.get<any>(`http://secure.focusrtech.com:5050/LoanProfitPortal/api/auth/getBand1Details`).pipe((map((res)=> console.log(res))));

let url = `http://secure.focusrtech.com:5050/LoanProfitPortal/api/auth/getBand1Details`;
    console.log(url);
    return this.http.get(url);

  }
  getListOfEmails_select() : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Ticket/Service/ListReceivedMails`);
  }
}
