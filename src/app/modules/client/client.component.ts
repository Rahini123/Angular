import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Client } from './model/cln';
import { ClientComponentService } from './client.service';
import { ActiveClient } from './ActiveClient';
import { DatePipe } from '@angular/common';
import { last } from 'rxjs';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ClientComponentService, MessageService, ConfirmationService]
})
export class ClientComponent implements OnInit {
  isLoading: boolean = true;
  constructor(
    private ClientComponentService: ClientComponentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private datepipe: DatePipe

  ) { }

  items: MenuItem[];
  countvalue: any;
  home: MenuItem;
  weekdays: any;
  ehours: any;
  valarray: any[] = [];
  check: boolean;
  checked: [] = [];
  checkvalue: boolean;
  shours: any;
  checkedvalue: boolean = false;
  progressbar:boolean=false;
  checkbox: boolean = true;
  weekdayslist: any[] = [];
  rvmduplicate: any[] = [];
  clientarr: any[] = [];
  clientdayarray:any[]=[];
  clients: any;
  last_element: any;
  weekdayslistformat: any[] = [];
  starthours: any;
  endHours: any;
  blurstart: any;
  blurend: any;
  clientstring: any;
  clienttxt: any;
  clientLeaveDays:any;
  temp: any;
  clientworkhoursget: any;
  bonusChecked: any;
  clientworkhoursarray: any[] = [];
  clientMessage: any;
  starthourdis: boolean = false;
  display: boolean = false;
  tablespace: boolean = false;
  clientDialog: any;
  clientweekendsedit: any;
  checkedbox: boolean = false;
  clienthoursarray: any[] = [];
  client: any;
  errorMessage: any;
  timezoneupdate: any[] = [];
  timezonestring: any;
  timezonestrings: any;
  fieldArray: Array<any> = [];
  weekformat: any
  newAttribute: any = {};
  timezone: any;
  timezoneplaceholder = "TimeZone"
  isEditItems: boolean;
  selectedClient: any;
  isDisabled: boolean = false;
  clientweekends: any;
  clientForm: FormGroup;
  formGroup_leave_days:FormGroup;
  arr_days: FormArray;
  formGroup: FormGroup;
  arr: FormArray;
  epForm: FormGroup;
  timezonevalue: any;
  data: boolean = false;
  ngAfterViewInit() {
    this.addItem();
  }
  ngOnInit(): void {
    this.isLoading = true;
    
    this.checkedbox = false;
    this.getListOfClient();
    this.getListOfTimeZone();
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem' };
    this.items = [

      { label: 'Clients' },

    ];
    this.clientweekends = [

      { id: '1', day: 'Monday', selected: 'false' },
      { id: '2', day: 'Tuesday', selected: 'false' },
      { id: '3', day: 'Wednesday', selected: 'false' },
      { id: '4', day: 'Thursday', selected: 'false' },
      { id: '5', day: 'Friday', selected: 'false' },
      { id: '6', day: 'Saturday', selected: 'false' },
      { id: '7', day: 'Sunday', selected: 'false' }

    ];
    this.clientweekendsedit = [

      { id: '1', day: 'Monday' },
      { id: '2', day: 'Tuesday' },
      { id: '3', day: 'Wednesday' },
      { id: '4', day: 'Thursday' },
      { id: '5', day: 'Friday' },
      { id: '6', day: 'Saturday' },
      { id: '7', day: 'Sunday' }

    ];

    this.weekformat = [
      {
        day: 'Monday',
        startHours: '0',
        endHours: '0',
      },
      {
        day: 'Tuesday',
        startHours: '0',
        endHours: '0',
      },
      {
        day: 'Wednesday',
        startHours: '0',
        endHours: '0',
      },
      {
        day: 'Thursday',
        startHours: '0',
        endHours: '0',
      },
      {
        day: 'Friday',
        startHours: '0',
        endHours: '0',
      },
      {
        day: 'Saturday',
        startHours: '0',
        endHours: '0',
      },
      {
        day: 'Sunday',
        startHours: '0',
        endHours: '0',
      },
    ];
    this.formGroup = this.fb.group({
      clientWorkingHours: this.fb.array([this.createItem()]),
    });
    this.formGroup_leave_days = this.fb.group({
      arr_days: this.fb.array([this.createItem_leavedays()]),
    });
    this.clientForm = this.fb.group({
      'clientId': new FormControl('', Validators.required),
      'clientName': new FormControl('', Validators.required),
      'clientDescription': new FormControl('', Validators.required),
      'day': new FormControl('', Validators.required),
      'startHours': new FormControl('', Validators.required),
      'endHours': new FormControl('', Validators.required),
      // 'startHoursedit': new FormControl('', Validators.required),
      // 'endHoursedit': new FormControl('', Validators.required),
      "timezone": new FormControl('')

      //  'LeaveName':new FormControl('',Validators.required),
      //  'date':new FormControl('',Validators.required),
    });
    this.shours = this.datepipe.transform(this.clientForm.get('startHours')?.value, 'dd/MM/yyyy');
    this.ehours = this.datepipe.transform(this.clientForm.get('endHours')?.value, 'dd/MM/yyyy');

    this.checkbox = false;
  }
  get leave_days() {
    return this.formGroup_leave_days.controls;
  }
  get f() {
    return this.formGroup.controls;
  }
  createItem_leavedays() {
    return this.fb.group({
      leaveId:['',Validators.required],
      leaveName: ['', Validators.required],
      date: ['', Validators.required],
      // endHours: ['', Validators.required],
    });
  }
  addItem_leavedays() {
    this.arr_days = this.leave_days['arr_days'] as FormArray;
    this.arr_days.push(this.createItem_leavedays());
    // this.arr_days.removeAt(0);
   
  }

  addItem() {
    let sum = 0;
  
    for (let i = 0; i < this.weekformat.length; i++) {
      this.arr = this.f['clientWorkingHours'] as FormArray;
      this.arr.push(this.createItem());
      this.arr.at(i).get('day').setValue(this.weekformat[i].day);
      this.arr.at(i).get('startHours').setValue(this.weekformat[i].startHours=='');
      this.arr.at(i).get('endHours').setValue(this.weekformat[i].endHours=='');
      var sum2 = sum + 1;

      console.log("value of arr",this.arr);
      sum = sum + 1;
      console.log('Count', sum2);
      console.log('Count', sum);
      this.arr.removeAt(sum);
    }
    // this.ngOnInit();
    console.log("values of clientWorkingHours",this.formGroup.value);
    console.log("Client day array in add item",this.clienthoursarray);
    
    (this.leave_days['arr_days'] as FormArray).removeAt(0);
  }
  
  onSubmit_leavedays() {
    // this.formGroup.markAllAsTouched();
    // console.log(this.formGroup_leave_days.value);
    console.log(this.arr_days.value);
  }
  removeItem_leavedays(idx: number): void {
    (this.leave_days['arr_days'] as FormArray).removeAt(idx);
  }

  onBlurMethodstart(client: any) {
    // alert(event.value);
    console.log("eventvalue onstart", this.datepipe.transform(client, "HH:mm"));
    this.blurstart = this.datepipe.transform(client, "HH:mm");
  }
  onBlurMethodend(client: any) {
    // alert(event.value);
    console.log("eventvalue onend", this.datepipe.transform(client, "HH:mm"));
    this.blurend = this.datepipe.transform(client, "HH:mm");
  }

  
  createItem() {
    return this.fb.group({
      workingId: ['', Validators.required],
      day: ['', Validators.required],
      startHours: ['', Validators.required],
      endHours: ['', Validators.required],
    });
  }
  
  removeItem(idx: number): void {
    (this.f['clientWorkingHours'] as FormArray).removeAt(3);
  }
  onSubmit() {
    // this.formGroup.markAllAsTouched();
    console.log(this.arr.value);
  }
  onclick(client: any) {
    // this.shours=this.datepipe.transform(this.weekdays.startHours,"HH:mm");


    let editpayload = {
      day: client.day,
      startHours: this.blurstart,
      endHours: this.blurend
    }
    console.log("edit payload", editpayload);
    // alert(this.clientForm.get('startHours')?.value+this.clientForm.get('endHours')?.value+
    // this.clientForm.get('day')?.value);

  }
  addFieldValue(index: any) {

    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    console.log(this.fieldArray);

  }
  addFieldValueedit(index: any) {

    this.clienthoursarray.push(this.newAttribute);
    this.newAttribute = {};
    console.log(this.clienthoursarray);

  }
  deleteFieldValueedit(index: any) {

    this.clienthoursarray.splice(index, 1);
  }
  deleteFieldValue(index: any) {
    this.fieldArray.splice(index, 1);
  }

  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;

  }

  onChange(event: any, timezone: any) {
    console.log(event.value);
    this.timezonevalue = event.value;
  }
  getListOfClient() {
    this.ClientComponentService.getListOfClient()
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.clients = result;
        })
  }
  getListOfTimeZone() {
    this.ClientComponentService.getListOfTimezone()
      .subscribe(
        (result) => {

          this.timezone = result;
          console.log("timezone", this.timezone);
        })
  }
  activeClient(activeClient: ActiveClient, e: any) {

    this.bonusChecked = e.checked;
    //alert(this.bonusChecked);
    let delbasepayload = {
      clientId: activeClient.clientId,
      clientActivity: this.bonusChecked
    }


    this.confirmationService.confirm({


      message: 'Are you sure do u want to ' + ` ${activeClient.clientActivity === "Y" ? "Active the " : "Inactive the "} ` + activeClient.clientName + '?',


      header: 'Confirm',


      icon: 'pi pi-exclamation-triangle',


      accept: () => {


        this.ClientComponentService.activeClient(delbasepayload).subscribe(




          {



            next: (val) => {


              this.messageService.add({ severity: 'success', summary: `${activeClient.clientActivity === "Y" ? "Active" : "Inactive"}`, detail: `${activeClient.clientActivity === "Y" ? "Client is Active" : "Client is Inactive"}`, life: 3000 });

  this.getListOfClient();
            //  this.ngOnInit();


            },


            error: (err) => {


              this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Failed to Active Project', life: 3000 });
        this.getListOfClient();

             // this.ngOnInit();


            }




          })


      }, reject: () => {

        this.getListOfClient();
      //  this.ngOnInit();

      }


    });


  }

  getClientCalender(isChecked: boolean, Client: any, value: any) {

    console.log("value of check box " + value)
    this.check = isChecked

    this.data = !this.data;
    this.weekdays = { ...Client }

    if (isChecked === true) {
      this.tablespace = true;
      // this.onfocus(this.weekdays);
      // if(isChecked===true&&this.client.day=='Monday')
      // {
      //   alert('monday');
      // }

      console.log(isChecked, Client.id);
      console.log("client values", this.weekdays.endHours);
      console.log("client values", this.weekdays.startHours);
      this.starthours = this.datepipe.transform(this.weekdays.startHours, "HH:mm");
      this.endHours = this.datepipe.transform(this.weekdays.endHours, "HH:mm");
      let weekdaylistformat = {
        day: this.weekdays.day,
        startHours: this.starthours,
        endHours: this.endHours

      }
      let lastvalue: any;
      let lastvalue2: any;
      console.log(weekdaylistformat)
      this.weekdayslist.push(weekdaylistformat);


      this.weekdayslist.filter((val: any) => {
        console.log("Values", val.day);
        this.valarray.push(val);

        if (val.day === 'Monday') {
          // alert(val.day);
          lastvalue = this.valarray[this.valarray.length - 1];
          console.log("lastvalue monday", lastvalue);

        } else if (val.day === 'Tuesday') {
          lastvalue2 = this.valarray[this.valarray.length - 1];
          console.log("lastvalue tuesday", lastvalue2);
          this.rvmduplicate.push(lastvalue2);
          console.log("tuesdayarray", this.rvmduplicate);
        } else if (val.day === 'Wednesday') {
          lastvalue = this.valarray[this.valarray.length - 1];
          console.log("lastvalue wednesday", lastvalue);

        } else if (val.day === 'Thursday') {
          lastvalue = this.valarray[this.valarray.length - 1];
          console.log("lastvalue Thursday", lastvalue);

        } else if (val.day === 'Friday') {
          lastvalue = this.valarray[this.valarray.length - 1];
          console.log("lastvalue Friday", lastvalue);

        } else if (val.day === 'Saturday') {
          lastvalue = this.valarray[this.valarray.length - 1];
          console.log("lastvalue Saturday", lastvalue);

        } else if (val.day === 'Sunday') {
          lastvalue = this.valarray[this.valarray.length - 1];
          console.log("lastvalue Sunday", lastvalue);

        }

      })


      console.log("lastvalue2 tuesday", this.rvmduplicate);

      //     let weekdaylistformatdays={
      //       day:lastvalue.day,
      //       startHours: lastvalue.startHours,
      //       endHours:lastvalue.endHours

      //     }
      // console.log("last day formart",weekdaylistformatdays);
      // this.weekdayslistformat.push(weekdaylistformatdays);


      console.log("weekdayslistformat", this.weekdayslistformat);
      // let last:any = this.weekdayslist[this.weekdayslist.length-1];
      // console.log("lastvalue",last);
      // this.weekdayslist.push(this.weekdays);
      // this.weekdayslist.push(this.weekdays);
      // console.log("weekdaylist", this.weekdayslist);


    } else {
      // this.clientForm.get('startHours').setValue(null);
      // this.clientForm.get('endHours').setValue(null);
      console.log(isChecked, Client.id);
      let removeIndex = this.weekdayslist.findIndex(itm => itm.day === Client.day);
      console.log("value of removed index", removeIndex);
      if (removeIndex !== -1)
        this.weekdayslist.splice(removeIndex, 1);

      // console.log("value is ",this.weekdayslist.find(this.findday));


    }
    if (this.weekdayslist.length === 0) {
      this.tablespace = false;
    }
    console.log("clientWorkingHours", this.weekdayslist);


  }
  removeduolicate(data: any) {
    return data.filter((value: any, index: any) => data.indexOf(value) === index)
  }
  uncheckIfAlreadyChecked(i: any, client: any) {
    let removeIndex = this.weekdayslist.filter(itm => itm.i === client.id);
    console.log(removeIndex);
    // alert(i);
    // if(i==='1' && client.day==='Monday')
    // {
    //   this.check=false;
    // }else if(i==='2'  && client.day==='Tuesday')
    // {
    //   this.check=false;

    // }else if(i==='3')
    // {
    //   this.check=false;

    // }else if(i==='4')
    // {
    //   this.check=false;

    // }


  }
  onfocus(weekdays: any) {

    //  alert(weekdays.id);
    // alert("hi"+weekdays);
    console.log(weekdays);
    // console.log("inside focus",this.weekdayslist);
    // let removeIndex = this.weekdayslist.findIndex(itm=> itm.day === weekdays.day);
    // console.log("value of removed index",removeIndex);    

    // console.log("Checkbox value",this.check);


    // if (removeIndex !== -1)
    // {

    //   this.weekdayslist.splice(removeIndex, 1);


    // }

    // this.getClientCalender(this.check,weekdays);

  }
  cancel()
  {
    // this.clientLeaveDays.length=0;
this.arr_days.clear();

    // this.getListOfClient();
  }
  moveDate(client: any) {
    console.log(client.id);

    // this.clientForm.get('startHours').setValue(null);
    //     if(pos==='Monday')
    //     {
    // alert("monday" );
    //     }
  }
  findday(value: any) {
    return value.day === "Monday";
  }
  saveClient() {
    this.progressbar=true;
    var j = JSON.stringify(this.clientForm.value);
    // console.log("arr value",this.arr.value);
    // console.log("arr_days value",this.arr_days);
   console.log( j);
  
 if(this.clientForm.controls['clientName'].value===null)
{
  this.messageService.add({ severity: 'error', summary: 'Required', detail: 'CustomerName is required' });
  this.progressbar=false;
}else if(this.clientForm.controls['clientDescription'].value===null){
  this.progressbar=false;
  this.messageService.add({ severity: 'error', summary: 'Required', detail: 'Customer Description is required' });
 }
 //else if(this.clientForm.controls['timeZone'].value===null){
//   this.messageService.add({ severity: 'error', summary: 'Required', detail: 'Time Zone is required' });
// }
else{

  let clientpayload = {
    clientName: this.clientForm.controls['clientName'].value,
    clientDescription: this.clientForm.controls['clientDescription'].value,
    timeZone: this.timezonevalue,
    clientWorkingHours: this.arr.value,
    clientLeaveDays: this.arr_days.value
  }
  
  this.ClientComponentService.createClient(clientpayload).subscribe(
    {
      next: (value) => {
        if (value === null) {
          this.progressbar=false;
          this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
        }
        else {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Created Successfully' });
          // setTimeout(() => {

          //   window.location.reload();

          // }, 1000);
         //  this.ngOnInit();
         this.progressbar=false;
          this.display = false;
          this.getListOfClient();
        }
      },
      error: (err) => {
        this.progressbar=false;
        this.clientMessage = err.error.message;
        this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.clientMessage });
      }
    }
  );
}
  
  }
  editClient(client: Client) {
// this.ngOnInit();
// this.ngOnInit() ;

    this.clienthoursarray.length = 0;
    this.timezoneupdate.length = 0;
    this.clientworkhoursarray.length = 0;

    this.weekdayslist.length = 0;
    this.clientDialog = true;
 
  
 
    this.client = { ...client };
    console.log("value of ",this.client);
    this.clientworkhoursget = this.client.clientWorkingHours;
    this.clientLeaveDays=this.client.clientLeaveDays;
    console.log("clinet working hours length",this.clientworkhoursget);
    console.log("client leave days length",this.clientLeaveDays);
    for(let i=0;i<this.clientworkhoursget.length;i++)
    {
    this.arr = this.f['clientWorkingHours'] as FormArray;
    this.arr.at(i).get('workingId').setValue(this.clientworkhoursget[i].workingId);
      this.arr.at(i).get('day').setValue(this.clientworkhoursget[i].day);
      this.arr.at(i).get('startHours').setValue(this.clientworkhoursget[i].startHours);
      this.arr.at(i).get('endHours').setValue(this.clientworkhoursget[i].endHours);
    }

let sum=0;
for(let j=0;j<this.clientLeaveDays.length;j++)
{
   console.log(j);
  this.arr_days = this.leave_days['arr_days'] as FormArray;
 this.arr_days.push(this.createItem_leavedays());
 this.arr_days.at(j).get('leaveId').setValue(this.clientLeaveDays[j].leaveId);
 this.arr_days.at(j).get('leaveName').setValue(this.clientLeaveDays[j].leaveName);
 this.arr_days.at(j).get('date').setValue(this.datepipe.transform(this.clientLeaveDays[j].date, 'yyyy-MM-dd'));
sum=sum+1;
this.arr_days.removeAt(sum);
// this.clientLeaveDays.length=0;
}

// console.log(  "the length of this.arr_days", this.arr_days.length);
// this.ngOnInit();
//  this.getListOfClient();
    // this.clientworkhoursget.forEach((x: any) => {

    //   this.clientForm.addControl(x.day, new FormControl('', Validators.required));
    // });
    this.timezoneupdate.push(this.client.timeZone);
    this.client.clientLeaveDays.forEach((element: any) => {
      console.log(element.date);
      this.temp = this.datepipe.transform(element.date, "yyyy-mm-dd");
      console.log(this.temp);
      console.log(element.leaveName);

      let clienthours = {
        leaveName: element.leaveName,
        date: this.temp
      }
      // console.log(clienthours);
      this.clienthoursarray.push(clienthours);
    });
    this.client.clientWorkingHours.forEach((element: any) => {
      // console.log("Clienthours", element.day);
      // console.log("Clienthours", element.startHours);
      // console.log("Clienthours", element.endHours);
      let clientworkhours = {
        day: element.day,
        startHours: element.startHours,
        endHours: element.endHours
      }
      this.clientworkhoursarray.push(clientworkhours);

    })

    // console.log("clientworkhour", this.clienthoursarray);
    // console.log("clientworkhoursarray", this.clientworkhoursarray);
    // console.log("Array Time Zone", this.timezoneupdate);
    this.timezonestring = JSON.stringify(this.timezoneupdate);
    this.timezonestrings = this.timezonestring.replace(/^\["(.+)\"]$/, '$1');
    // string.replace(/^\[(.+)\]$/,'$1')
    // console.log(this.timezonestrings);
    //     this.clientarr.push(this.client.timeZone);
    //     console.log(this.clientarr);
    // this.clientstring=JSON.stringify(this.clientarr);

    this.clientForm.patchValue(
      {
        clientId: this.client.clientId,
        clientName: this.client.clientName,
        clientDescription: this.client.clientDescription,
        timeZone: this.timezoneupdate,
        clientWorkingHours: '',
        clientLeaveDays: this.clienthoursarray

      });
    //  console.log("client details edit", this.client.clientWorkingHours);
     this.clientdayarray.push(this.client.clientWorkingHours);

  }

  deleteClient(client: Client) {
    console.log('Group', client.clientId);
    this.ClientComponentService.deleteClientbyId(client.clientId)
      .subscribe();
    this.messageService.add(
      {
        severity: 'error',
        summary: 'deleted',
        detail: 'Deleted Successfully'
      });
    setTimeout(() => {

      window.location.reload();

    }, 1000);

  }

  updateClient() {
    this.progressbar=true;

    let clientpayload = {
      clientId: this.clientForm.controls['clientId'].value,
      clientName: this.clientForm.controls['clientName'].value,
      clientDescription: this.clientForm.controls['clientDescription'].value,
      timeZone: this.timezonestrings,
      clientWorkingHours: this.arr.value,
      clientLeaveDays: this.arr_days.value
    }
    if(clientpayload.clientName=='')
    {
      this.messageService.add({ severity: 'error', summary: 'Required', detail: 'Customer Name is required' });
    }else if (clientpayload.clientDescription=='')
    {
      this.messageService.add({ severity: 'error', summary: 'Required', detail: 'Customer Describtion is required' });
    }else{
      this.ClientComponentService.createClient(clientpayload)
      .subscribe(
        {
          next: (value) => {
            if (value === null) {
              this.progressbar=false;
              this.clientDialog=false;
              this.messageService.add({ severity: 'warn', summary: 'Required', detail: 'Fill All Mandatory Fields' });
            }
            else {
              this.progressbar=false;
              this.clientDialog=false;
              
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Updated Successfully' });
              // setTimeout(() => {

              //   window.location.reload();

              // }, 1000);
              // this.ngOnInit();
              this.clientDialog = false;
              this.getListOfClient();
            }
          },
          error: (err) => {
            this.progressbar=false;
            
            this.errorMessage = err.error.message;
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
          }
        }
      )
    }
   
  }
  showDialog() {
  
  //  this.ngOnInit();
    this.display = true;
    this.clientForm.reset();
    // this.arr.clear();
    let sum = 0;
  
    for (let i = 0; i < this.weekformat.length; i++) {
      
      this.arr = this.f['clientWorkingHours'] as FormArray;
      this.arr.push(this.createItem());
      this.arr.at(i).get('day').setValue(this.weekformat[i].day);
      this.arr.at(i).get('startHours').setValue(this.weekformat[i].startHours);
      this.arr.at(i).get('endHours').setValue(this.weekformat[i].endHours);
      var sum2 = sum + 1;

      console.log("value of hours",this.arr);
      sum = sum + 1;
      console.log('Count', sum2);
      console.log('Count', sum);
      this.arr.removeAt(sum);
    }
    // this.ngOnInit();
    console.log("values of clientWorkingHours",this.formGroup.value);
    console.log("Client day array in add item",this.clienthoursarray);
  
    this.arr_days.clear();

    
  }
}
