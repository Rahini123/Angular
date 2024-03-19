import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { RequesterService } from './requesterservice';
import { Requester } from './modal/requesters';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { CssSyntaxError } from 'postcss';

@Component({
  selector: 'app-requestergeneral',
  templateUrl: './requestergeneral.component.html',
  styleUrls: ['./requestergeneral.component.scss'],
  providers: [MessageService, RequesterService, ConfirmationService],
})
export class RequestergeneralComponent implements OnInit {
  requesters: any;
  phone:'';
  requester: any;
  isLoading: boolean = true;
  RequestersForm : FormGroup;

  timeZone: any;

  language: any;

  timeFormat: any;

  requestorMessage: any;

  requestorDialog: boolean = false;
  display: boolean = false;
  requesterDialog: boolean = false;

  selectedRequesters: any;
  items: MenuItem[];

    home: MenuItem;
  constructor(
    private fb : FormBuilder, 
    private router: Router,
    private requesterService: RequesterService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.items = [
    
      {
        label: 'Admin',
        url:'/dashboard/admin'
      },
      {
        label: 'Requester',
     
      },
   
  ];

  this.home = {icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem'};
    this.isLoading = true;
    this.timeZone = [
      { Zone: '(GMT-09:00) Gambier Islands', code: 'Ca Hrs' },
      {
        Zone: '[UTC + 5:30] Indian Standard Time, Sri Lanka Time',
        code: 'Ca Hrs',
      },
      { Zone: '(GMT-07:00) Mountain Time (US & Canada)', code: 'Bss Hrs' },
    ];

    this.language = [
      {
        language: 'English',
        
      },
      { language: 'English', code: 'EN' },
      { language: 'English', code: 'EN' },
    ];

    this.timeFormat = [
      {
        Format: '12-hour',
        code: 'EN',
      },
      { Format: '24-hour', code: 'EN' },
    ];



    this.getListOfRequests();

    this.RequestersForm = this.fb.group({
      'phone' : new FormControl('',Validators.required),
      'requesterId' : new FormControl('',Validators.required),
      'firstName' : new FormControl('',Validators.required),
      'lastName' : new FormControl(''),
      'email' : new FormControl('',Validators.required),
      'title' : new FormControl('',Validators.required),
      'workPhoneNumber' : new FormControl('',Validators.required),
      'department' : new FormControl('',Validators.required),
      'profileUrl' : new FormControl('',Validators.required),
      'manager' : new FormControl('',Validators.required),
      'location' : new FormControl('',Validators.required),
      'language' : new FormControl('',Validators.required),
      'address' : new FormControl('',Validators.required),
      'backgroundInformation' : new FormControl('',Validators.required),
      'timeZone' : new FormControl('',Validators.required),
    });

  }

  getListOfRequests()
  {
    this.requesterService.getListOfRequests()
        .subscribe(
          (result) => 
          {
            this.isLoading = false;
            this.requesters = result;
          })
  }

  deleteMultipleRequests() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Requester?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requesters = this.requesters.filter(
          (val: any) => !this.selectedRequesters.includes(val)
        );
        this.selectedRequesters = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Requesters Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteRequester(requester : Requester)
  {
    console.log('Group',requester.requesterId);
    this.requesterService.deleteRequesterById(requester.requesterId)
              .subscribe();
              this.messageService.add(
                {
                  severity : 'error',
                  summary : 'deleted',
                  detail : 'Deleted Successfully'
                });
                setTimeout(() => {

                  window.location.reload();

                }, 1000);
    
  }


  editRequestor(requester : Requester)
  {
    this.requestorDialog = true;
    this.requester = {...requester};

    this.RequestersForm.setValue(
      {
      requesterId : this.requester.requesterId,
      firstName : this.requester.firstName,
      lastName : this.requester.lastName,
      email : this.requester.email,
      title : this.requester.title,
      workPhoneNumber : this.requester.workPhoneNumber,
      department : this.requester.department,
      profileUrl : this.requester.profileUrl,
      manager : this.requester.manager,
      location : this.requester.location,
      language : this.requester.language,
      address : this.requester.address,
      backgroundInformation : this.requester.backgroundInformation,
      timeZone : this.requester.timeZone,
      })
  }

  updateRequestor()
  {
    this.requesterService.createOrUpdateRequest(this.RequestersForm.value)
          .subscribe(
            {
              next : (value) => {
                if(value === null)
                {
                  this.messageService.add({severity:'warn', summary: 'Required', detail: 'Fill All Mandatory Fields'});
                }
                else
              {
                this.messageService.add({severity:'success', summary: 'Suceess', detail: 'Requestor Updated Successfully'});
              }
              },
              error : (err) => {
                this.requestorMessage = err.error.message;
                this.messageService.add({severity:'error', summary: 'Failure', detail: 'Requestor Creation Failed'});
              }
            }
          )
  }



  // editRequester(requester: Requester) {
  //   this.requester = { ...requester };
  //   this.requesterDialog = true;
  // }

  // deleteRequester(requester: Requester) {
  //   alert('here');
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + requester.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.requesters = this.requesters.filter(
  //         (val: { id: string | undefined }) => val.id !== requester.id
  //       );
  //       this.requester = {};
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'requester Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.requesters.length; i++) {
      if (this.requesters[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.requesters);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'requesters');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  editRequesterDetail(requester: any) {
    // this.editTicketScreen = true;
    this.requester = requester.id;
    this.router.navigate(['/dashboard/admin/requesters', requester.id]);
  }
   ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {
    if (control.value && control.value.length != 10) {
      return { 'phoneNumberInvalid': true };
    }
    return null;
  }
  showDialog() {
    this.display = true;
}
}
