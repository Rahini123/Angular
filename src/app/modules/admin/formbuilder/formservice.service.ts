import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormserviceService {

  constructor(private http: HttpClient) { }
  createformfields(payload:any) : Observable<any>
{
    return this.http.post<any>(`/TicketManager/api/CustomFeilds/Service/submit`,payload);
}
deleteSelectedarray(payload : any):Observable<any>
 {
   return this.http.post<any>(`/TicketManager/api/CustomFeilds/Service/delete`,payload);
 }
  getformfields() : Observable<any>
{
  return this.http.get<any>(`/TicketManager/api/fields/getFields`);
}
getlistalready(projectname:any): Observable<any>
{
  return this.http.get<any>(`/TicketManager/api/CustomFeilds/Service/getProjectField/`+projectname);
}
getlistalready_formfields(projectname:any): Observable<any>
{
  return this.http.get<any>(`/TicketManager/api/CustomFeilds/Service/getProjectLOVField/`+projectname);
}
// deleteSelectedarray(payload : any)
//  {
//  //console.log(this.arr);

//  // localStorage.setItem("accessToken",value.accessToken);
//  return this.http.delete<any>('/TicketManager/api/CustomFeilds/Service/delete',payload);
//  }
 
}
