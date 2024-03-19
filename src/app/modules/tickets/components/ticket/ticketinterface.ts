import { DatePipe } from '@angular/common';
import { DateFormatPipe } from 'angular2-moment';
export interface ticket {
    id: number;
    ticketNo: number;
    from_Address : string;
    to_Address: string;
    subject: string;
    status: string;
    mailBody : any;
    comments : any;
    projectId : number;
    mail_flag :number;
    createdAt: string;
    }