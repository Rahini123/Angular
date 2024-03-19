import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  data:any;
  statustxt:any;

  private dataofservice = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}

dashboardStatus(projectid:number) : Observable<any>
{
  //return this.http.get<any>(`/TicketManager/api/DashBoard/StatusView`);
  return this.http.get<any>(`/TicketManager/api/DashBoard/StatusView/`+projectid);
}

dashboardStatusby(projectid: number) : Observable<any>
{
  return this.http.get<any>(`/TicketManager/api/Ticket/Service/ListReceivedMails/`+projectid);

}
dashboardStatusbyOpen(projectid: number,groupid:any) : Observable<any>
{
  return this.http.get<any>(`/TicketManager/api/DashBoard/ProjectGroupwiseTickets?`+'projectId='+projectid+'&groupName='+groupid);

}
dashboardStatusforgroup(projectId:number, groupid:any) : Observable<any>
{
  return this.http.get<any>(`/TicketManager/api/Ticket/Service/GroupListReceivedMails?`+'&projectId='+projectId +'&groupName='+groupid)
  .pipe(map((res) => {
    
    console.log("Value is", res);
    this.data=res;
  
    return this.data;
    
 
  }));
}
ticketDashboard(projectId:number, status: string,groupid:any) : Observable<any>{
if(status==='Open')
{
this.statustxt='Open';
}else if(status==='Closed')
{
  this.statustxt='Closed';
}else if(status=='Assigned')
{
  this.statustxt='Assigned';
}else if(status=='UnAssigned')
{
  this.statustxt='UnAssigned';
}
  return this.http.get<any>(`/TicketManager/api/DashBoard/ProjectGroupwise?`+'&projectId='+projectId +'&status='+this.statustxt+'&groupname='+groupid)
  .pipe(map((res) => {
    console.log("Value is", res);
    this.data=res;
    return this.data;
    
 
  }));
}
ticketDashboardbyopen(projectId:number, groupid:any) : Observable<any>{
 
    return this.http.get<any>(`/TicketManager/api/DashBoard/ProjectGroupwiseTickets?`+'projectId='+projectId+'&groupname='+groupid)
    .pipe(map((res) => {
      console.log("Value is", res);
      this.data=res;
      return this.data;
      
   
    }));
  }
ticketDashboardbyprojectAll(projectId:number) : Observable<any>{
  return this.http.get<any>(`/TicketManager/api/DashBoard/ProjectWiseTotalTickets?`+'&projectId='+projectId )
  .pipe(map((res) => {
    console.log("Value is are", res);
    this.data=res;
    return this.data;
 
  }));}

  ticketDashboardbyprojectgroup(projectId:number,groupName :any) : Observable<any>{
    return this.http.get<any>(`/TicketManager/api/DashBoard/ProjectWiseTotalTickets?`+'&projectId='+projectId +'&groupName= '+ groupName )
    .pipe(map((res) => {
      console.log("Value is are", res);
      this.data=res;
      return this.data;
   
    }));}


ticketDashboardbyproject(projectId:number, status: string) : Observable<any>{
  console.log("value",status);
  if(status==='Open')
  {
    
  this.statustxt='Open';
  }else if(status==='Closed')
  {
    this.statustxt='Closed';
  }else if(status=='Assigned')
  {
    this.statustxt='Assigned';
  }else if(status=='UnAssigned')
  {
    this.statustxt='UnAssigned';
  }
  
    return this.http.get<any>(`/TicketManager/api/DashBoard/ProjectWise?`+'&projectId='+projectId +'&status='+this.statustxt)
    .pipe(map((res) => {
      console.log("Value is are", res,status);
      this.data=res;
      return this.data;
   
    }));
  }
  
}

