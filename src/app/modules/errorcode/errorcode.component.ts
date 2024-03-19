import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Error } from './model/err';
import { OverlayPanel } from 'primeng/overlaypanel';
import { NewErrorCodeComponend } from '../errorcode/newerror/newerror.component';
import { errorcodeservice } from './errorcodeservice';
import { TicketService } from '../tickets/components/ticket/ticketservice';

@Component({
  selector: 'app-errorcode',
  templateUrl: './errorcode.component.html',
  styleUrls: ['./errorcode.component.scss'],
  providers: [errorcodeservice, MessageService, ConfirmationService,TicketService],
})
export class ErrorcodeComponent implements OnInit {
  isLoading: boolean = true;
  constructor(
    private fb : FormBuilder, 
    private router: Router,
    private errorcodeservice: errorcodeservice,
    private activatedRoute : ActivatedRoute,
    private ticketService: TicketService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  timeformat : any;
  items: MenuItem[];

    home: MenuItem;
  errors : any;
  display: boolean = false;
  selectedError : any;
  header:any;
  ticket:any;
  errorCode: any;
  tickets:any;
  groupForm : FormGroup;
  error : any;
  errorDialog : boolean = false;
  errorMessage : any;
  selectedvalue: any;
  error_id : any;

  agentDetails : any;

  ngOnInit(): void {
    this.isLoading = true;
    this.getListOfEmail_select();
    this.getListOfErrorCode();
    this.items = [
    
      {label: 'Error Code',},
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};

    this.groupForm = this.fb.group({
      'error_id' : new FormControl('',Validators.required),
      'error_code' : new FormControl('',Validators.required),
      'error_name' : new FormControl(''),
      'error_description' : new FormControl('',Validators.required),
    });

    const res = this.activatedRoute.snapshot.params['projectCategoryId'];

    this.errorcodeservice.getRoleById(res)
            .subscribe((result) => {
              console.log('values are', result);

              this.errorCode = result;

            }
            )

  }

  getListOfEmail_select() {
    this.ticketService.getListOfEmails_select().subscribe((res) => {

      this.tickets = res;

      console.log(this.tickets);
     
      this.isLoading = false;
    })
  }


  getListOfErrorCode()
  {
    this.errorcodeservice.getListOfErrorCode()
        .subscribe(
          (result) => 
          {
            this.isLoading = false;
            this.errors = result;
          })
  }
  editTickets(error1 : Error) {

    // this.editTicketScreen = true;

    this.ticket = { ...error1 };

    console.log(error1.error_code);

    //alert(this.header);

   this.router.navigate(['/dashboard/ticketshistory',error1.error_code]);

  }

  deleteErrorById(error : Error)
  {
    console.log('Error', error.error_id);
    this.errorcodeservice.deleteErrorById(error.error_id)
              .subscribe();
              this.messageService.add(
                {
                  severity : 'error',
                  summary : 'deleted',
                  detail : 'Deleted Successfully'
                })
                setTimeout(() => {

                  window.location.reload();

                }, 1000);
    
  }

  editError(error1 : Error)
  {
    this.errorDialog = true;
    this.error = {...error1};

    this.groupForm.setValue(
      {
        error_id : this.error.error_id,
        error_code : this.error.error_code,
        error_name : this.error.error_name,
        error_description : this.error.error_description
      })
  }

  updateError()
  {
    this.errorcodeservice.createErrorCode(this.groupForm.value)
          .subscribe(
            {
              next : (value) => {
                if(value === null)
                {
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                }
                else
              {
                this.messageService.add(
                  {severity:'success', summary: 'Suceess', detail: 'Error Code Updated Successfully'}
                  );
                  setTimeout(() => {

                    window.location.reload();

                  }, 1000);
              }
              },
              error : (err) => {
                this.errorMessage = err.error.message;
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Error Code Creation Failed'});
              }
            }
          )
  }
  showDialog() {
    this.display = true;
}

}
