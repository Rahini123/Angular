import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailsettingService {

  constructor(private http: HttpClient) { }
  createSmptp(smtp:any):Observable<any>
  {
    return this.http.post<any>(`/TicketManager/api/EmailDetails/Service/SMTP/CreateOrUpdate`, smtp);
  }
  createImptp(Imtp:any):Observable<any>
  {
    return this.http.post<any>(`/TicketManager/api/ReceiveEmailDetails/Service/IMAP/CreateOrUpdate`, Imtp);
  }
  getSmptp():Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/EmailDetails/Service/SMTP/All`);
  }
  getImptp():Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/ReceiveEmailDetails/Service/IMAP/All`);
  }
  deleteIMAPbyId(IMAPid : number)
{
  return this.http.delete<any>(`/TicketManager/api/ReceiveEmailDetails/Service/delete/`+IMAPid).pipe(
    map((res:any) => {
      console.log('Email Details', res);
    })
  );;
}
deleteSMTPbyId(SMTPid : number)
{
  return this.http.delete<any>(`/TicketManager/api/EmailDetails/Service/delete/`+SMTPid) .pipe(
    map((res:any) => {
      console.log('Email Details', res);
    })
  );
}
}
