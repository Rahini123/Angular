import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ticket } from './modal/ticket';

@Injectable()
export class TicketService {
  projectid: any;
  groupname: any;
  data:any;
  constructor(private http: HttpClient) {}

  // getTickets() {
  //   return this.http
  //     .get<any>('assets/tickets.json')
  //     .toPromise()
  //     .then((res) => <Ticket[]>res.data)
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     });
  // }

  // generateId() {
  //   let text = '';
  //   let possible =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  //   for (var i = 0; i < 5; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }

  //   return text;
  // }
  getprojectid() {
    this.groupname = localStorage.getItem('groupName') || '{}';
    return this.groupname;
  }
  getListOfPMOValues(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/ProjectCategory/Service/getListOfProject`
    );
  }
  getListOfActiveProject(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/ProjectCategory/Service/getProjectActiveList`
    );
  }
  getListOfPMOValues_formfield(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/CustomFeilds/Service/getProjectLOVField`
    );
  }
  getListOfProjectbyid(projectId: number): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/ListReceivedMails/` + projectId
    );
  }
  getListOfProjectbyidgroupbyid(
    projectId: number,
    groupid: number
  ): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/GroupListReceivedMails?` +
        '&projectId=' +
        projectId +
        '&groupName=' +
        groupid
    );
  }
  customapi(payload: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/CustomFeilds/Service/updateCustomTicketDetails`, payload)
      .pipe(
        map((res) => {
          console.log('Email Details', res);
        })
      );
  }
  getProjectDetailsByIdservice(projectId: number ): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/ProjectCategory/Service/getProjectDetailsById?projectId=`+projectId);
  }
  getListOfEmails_select(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/ListReceivedMails`
    );
  }
  getListOfGroup_select(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/GroupListReceivedMails`
    );
  }
  getListOfEmails(id: number): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/ListReceivedMails/` + id
    );
  }
  getgroupbasedproject(id:number): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/groupAgents/Service/getGroupByProject?projectId=`+id);
  }
  getgroupbasedprojectbyProjectName(id:any): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/groupAgents/Service/getGroupByProjectName?projectName=`+id);
  }
  getListOfGroup(id:number) : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/Ticket/Service/GroupListReceivedMails?`+'&groupName='+id);
  }
  getListOfAproval(projectname:any,ticketStatus:any) : Observable<any>
  {
    return this.http.get<any>(`/TicketManager/api/approval/service/getProjectApprovalTickets?projectName=`+projectname+'&ticketStatus='+ticketStatus);
  }

  getEmailDetailById(id: number) {
    return this.http.get<any>(`/TicketManager/api/Ticket/Service/getId/` + id);
  }
  getformfieldapi(id: number) {
    return this.http.get<any>(`/TicketManager/api/CustomFeilds/Service/getSingleTicketNo/`+ id);
  }
  
  getHistoryDetailById(tkid: number) {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/getHistory/` + tkid
    );
  }
  getApprovalStatus(tkNo: number) {
    return this.http.get<any>(
      `/TicketManager/api/approval/service/getApprovalTicket/`+ tkNo);
  }
  sendMail(emailpayload: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/Ticket/Service/sendMail`, emailpayload)
      .pipe(
        map((res) => {
          console.log('Email Details', res);
        })
      );
  }
  upload(uploadpayload:any,file:File): Observable<any> {
console.log("tsfile",file);
  const formData : FormData = new FormData();
 formData.append('file',file);
 formData.append('ticketNo',uploadpayload);
 const req = new HttpRequest('post',`/TicketManager/api/Ticket/Service/UploadFile`, formData, {
   reportProgress : true,   
   responseType : 'text' as 'text'
 

 });
  return this.http.request(req);
 
  }


    // MULTIPLA UPLOAD

  multipleUPload(payload  : any, file  : File[]) : Observable<any> {
    console.info('Multiple Upload', payload + 'File ame' + file);
    
    const formData : FormData = new FormData();
    formData.append('ticketNo',payload);
    file.forEach(f => {
      console.info('File Names', f.name)
 formData.append('file',f, f.name);
 
    })

    console.info('Form Data', formData);

    const req = new HttpRequest('post',`/TicketManager/api/Ticket/Service/UploadFile`, formData, {
      reportProgress : true,   
      responseType : 'blob'
    });

    return this.http.request(req);
  }


  replymail(replymail: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/Ticket/Service/sendMail`, replymail)
      
  }
  createmanualTicket2(manualticket: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/Ticket/Service/ManualTicketGeneration`, manualticket)
      .pipe(
        map((res) => {
          console.log('send Manual ticket details', res);
        })
      );
  }
  createmanualTicket(manualticket: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/Ticket/Service/ManualTicketGeneration`,
      manualticket
    );
  }
  sendRequestApproval(approvalrequest: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/approval/service/createOrUpdateApproval`,
      approvalrequest    );
  }
  createTicketType(tickettype: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/Ticket/Service/TicketType`,
      tickettype
    );
  }
  sendnote(replymail: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/Ticket/Service/AddNote`, replymail)
      .pipe(
        map((res) => {
          console.log('send Email Details', res);
        })
      );
  }
  // forwardmail

  forwardmail(forwardmail: any): Observable<any> {
    return this.http
      .post<any>(`/TicketManager/api/Ticket/Service/ForwardMail`, forwardmail)
      .pipe(
        map((res) => {
          console.log('send Email Details', res);
        })
      );
  }

  assignTo(grouppayload: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/Ticket/Service/assignGroup`,
      grouppayload
    );
  }

  activeStatus(statuspayload: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/Ticket/Service/TicketStatus`,
      statuspayload
    );
  }
  mergeticket(statuspayload: any): Observable<any> {
    return this.http.post<any>(
      `/TicketManager/api/Ticket/Service/MergeTicket`,
      statuspayload
    );
  }


  getListOfGroups(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/groupAgents/Service/getGroups`
    );
  }

  getListOfStatus(): Observable<any> {
    return this.http.get<any>(
      `/TicketManager/api/Ticket/Service/getListOfStatus`
    );
  }
  //  GET TICKETS

  // ROLE_SUPER_AGENT

  getTicketsForSuperAgent(id: number) {
    return this.http.get<any>(
      `TicketManager/api/Ticket/Service/ListReceivedMails/` + id
    );
  }

  // ROLE GROUP

  getTicketsForGroup(project: number, group: any) {
    return this.http.get<any>(
      `TicketManager/api/Ticket/Service/GroupListReceivedMails?projectId=${project}&groupName=${group}`
    );
  }
  //cc for reply mail
    // ROLE GROUP

    getGroupsccMails(groupname: any) {
      return this.http.get<any>(
        `TicketManager/api/groupAgents/Service/getGroupsListccMails/${groupname}`
      ).pipe(
        map((res:any) => {
          console.log('send Email Details', res);
          this.data=res;
          return this.data;
        
        })
      );
    }
// APPROVAL PROJECT AND GROUP

getTicketsForApprovalGroup(project: number, status:any,group: any) {
  
  return this.http.get<any>(
    `TicketManager/api/approval/service/getGroupApprovalTickets?projectName=${project}&ticketStatus=${status}&groupName=${group}`
  );
}
  // ROLE USER

  getTicketsForUser(id: number) {
    return this.http.get<any>(
      `TicketManager/api/Ticket/Service/ListReceivedMails/` + id
    );
  }


  getGroupByProject(id : number) {
    return this.http.get<any>(`TicketManager/api/groupAgents/Service/getGroupByProject?projectId=${id}`)
  }

 
}
