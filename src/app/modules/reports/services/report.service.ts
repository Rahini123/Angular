import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http : HttpClient) 
  { 

  }

  DownloadSampleFile(payload:any)
  {
    let options: any = {
      observe: 'response',
      responseType: 'blob',
    };
    return this.http.post<Blob>
      (`/TicketManager/api/Ticket/Service/getDailyReviewReport`,payload,options)
      .pipe(map(
        (response) => response));
  }

  SchedulerDownload(payload:any)
  {
    // let options: any = {
    //   observe: 'response',
    //   responseType: 'blob',
    // };
    // return this.http.post<Blob>
    // (`/TicketManager/api/Scheduler/createOrUpdateSchedulerDetails`,payload)
    // .pipe(map(
    //   (response) => response));
    return this.http
    .post<any>(`/TicketManager/api/Scheduler/createOrUpdateSchedulerDetails`, payload)
    .pipe(
      map((res) => {
        console.log('Email Details', res);
      }))}
  
  getSchedilerlist(): Observable<any>
  {
    return this.http.get<any>(
      `/TicketManager/api/Scheduler/getSchedulerList`
    );
  }
  deleteScedulerById(projectId : number)
{
  return this.http.delete<any>(`/TicketManager/api/Scheduler/deleteSchedulerbyid/` + projectId);
}
}
