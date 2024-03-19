import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '../ticket/ticketservice';
import { sendReplyMail } from '../ticket/modal/tt';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ticket } from './ticket';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { ViewportScroller } from "@angular/common";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TicketComponent } from '../ticket/ticket.component';
import { errorcodeservice } from 'src/app/modules/errorcode/errorcodeservice';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import { AgentgroupService } from 'src/app/modules/admin/groups/services/agentgroup.service';
import { AuthState, selectTicketNo } from 'src/app/layouts/auth/state/auth.reducer';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { ConnectableObservable, Observable } from 'rxjs';

import { animate, state, style, transition, trigger } from '@angular/animations';

import * as XLSX from 'xlsx';



import { Editor } from 'primeng/editor';

declare function myMethod():any;
export declare function test1():any;

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
  providers: [
    MessageService,
    TicketService,
    errorcodeservice
   
  ],
  animations:[
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [ style({ opacity: 0 }), animate(1000) ]),
      transition(':leave', animate(1000, style({ opacity: 0 })))
    ])
  ]
})
export class TicketDetailComponent implements OnInit {
  content: string;
  
  // insertTable() {
  //   const quill = this.quillEditor.quill;
  //   const range = quill.getSelection(true);

  //   // Insert a table at the current cursor position
  //   quill.insertTable(range, { rows: 2, cols: 2 });
  // }
  @ViewChild('contentContainer', { static: true }) contentContainerRef: ElementRef;
  @ViewChild('richTextField') richTextField: ElementRef;
  // @ViewChild('contentContainer', { static: true }) editor: ElementRef;
  @ViewChild('editor', {static: false}) editor: any;
  // @ViewChild('editor') editor: Editor;
  items: MenuItem[];
  approvalitems:MenuItem[];
  formdata: FormArray;
  home: MenuItem;
  showdivgeneral: boolean = true;
  htmlString = '';
  primaryhtmlString = '';
  visible_reply:boolean;
  data: any = `<p>Hello, world!</p>`;
  reply_flag:any;
  priority:any;
  closedhtmlString = '';
  url_array:any[]=[];
tickets:any;
  grouplist:any;

  emailcc:any;
  hoursformat:any;
  ccemail:any;
  progressbartab:boolean;
  dataformarray:any[]=[];
  filename_history:any[]=[];
    statuslistApproval:any[]=[];
  dataset:any[]=[];
  unquie:any[]=[];
  uploadtxt_fwd:boolean=false;

  text: string = '';
  selectedProject:any;
  showdivuser: boolean = false;
  checked:boolean=true;
  @ViewChild('calendar', { static: false })
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  replyitems: any;
  priorityvalue:any;
  moreitems: any;
  emailTickets_Emailcc:any[]=[];
  ampm:any;
  file: any;
  groupname_reply:any;
  emailaddress_Project:any[]=[];
  isloading: boolean = false;
  display: any;
  timetracker:any;
  manualticketsec:boolean=false;
  manualticketsecdisplay:boolean=false;
  dueDates: any;
  manualtickets:any;
  priorityname: any;
  prioritylists:any;
  requester: any;
  statusApprovalList:any;
  from_Address:any;
  statusdiv:boolean=false;
  arrayrandom:any[]=[];
  formgetdata:any;
  imageextenstioncheck:any;
  groupname:any;
  formvaluelabel:any;
  RequestApproval:FormGroup;
  statusname:any;
  datavaluesform:any;
  prioritystatus:any;
  mailBodysection:any;
  projecgettname:any;
  labelelement:any;
  emailTicketsprimary:any;
  bccdiv: boolean = false;
  ccdiv: boolean = false;
  replydiv: boolean = false;
  updateticket:boolean;
  forwarddiv: boolean = false;
  pseudoReplyDiv: boolean = true;
  cleanText:any;
  urlShow: boolean = true;
  noteShow: boolean = true;
  editTicketSidebar: boolean = false;
  calendardiv: boolean = false;
  displaynote: boolean = false;
  displaycc: boolean = false;
  displayticketview:boolean=false;
  ticketNumber:any;
  date_format:any;
  selectedfile: any;
  result:any;
  pro:any
  getemailtickets:any;
  calendarDropdowndiv: boolean = true;
  private calendar: Calendar | any;
  emailHistoryTickets: any;
  mailbody: '';
  selectedfilesitem: File;
    form: FormGroup;
   regForm:FormGroup;
   ticketupdate:FormGroup;
   firstName:FormControl;

  arr: any[];
  dataList: any[] = [];
  updatelistlabel: any[] = [];
  updatelistvalue: any[] = [];
  update:any[]=[];
  listlabel:any;
  listvalue:any;
  updatevalue:any[]=[];
  listvaluepost:any[]=[];
  filepath: any
  uploadtxt:boolean=false;
  departments: any;
  ticketedit: any;
  emailTickets: any;
  message: any;
  angular: any;
  breadcrumb: any;
  errorMessage: any;
  htmlData: any;
  public loading = false;
  selectfilename: File;
  emailgroup:any;
  emailtk_cc:any;
  mailBody: any;
  sendreply: FormGroup;
  forwardreply:FormGroup;
  address:any;
  payLoad: any;
  errorForm: FormGroup;
  FormData: any;
  DataForm: FormGroup = new FormGroup({});
  sendnote: FormGroup;
  projectNames: any;
  projectlist:any;
  priorityboolean:boolean=true;
  progressbar: boolean = false;
  progressbar_detail:boolean=true
  statusboolean:boolean=true;
  groupnameboolean:boolean=true;
  arrlink: any; 
  statuslistarray:any;
  temp: any;
  selectedCity="select";
  private showingSourceCode = false;
  private isInEditMode = true;
  groupagentId:any;
  required:boolean=true;
  mailbodyarr:any[]=[];
  filesarray:any[]=[];
  isloadingicon: boolean = false;
  ClosePrimaryHistory: any;
  reportlabel:any;
  reportvalue:any;
  primaryticketid: any;
  ticketprojectname:any;
  closedticketid: any;
  mergeticketid: any;
  sum: any;
  statusvalue:any;
  projectname="projectname";
  ticketNo: any;
  groupbased:any;
  fields:any;
  mail_flag:any;
  Listboxgroupname:any;

  prioritylist:any
  tempmail:any;
  projectsid:any;
  groupPlaceholderText="Select Group Based"
  person:any;
  selectedCountryValue:any;
  ticketnoselect: Observable<string | null> | undefined;
  slamessage:any;
  statuschange:any;
  personProps:any[]=[];
  projectid:any[]=[];
  form2 = new FormGroup({});
  statusplaceholder:"Select Placeholder"
  statuslist:any;
  fromgetaddress:any;
  togetaddress:any;
  res:any
  getemailsubject:any;
  toMTGaddress:any;
  statusemail:any;
  groupnamepayload:any;
  prioritypayload:any;
  files: File[] = [];
  projectvalue:any;
  statuspayload:any;
  duedatehours:any;
  duedateMinutes:any;
  duedateseconds:any;
  blobData:any;
  timetrackerpayload:any;
  send_approval:boolean=false;
  TicketDialog: boolean = false;
  request_roast:boolean=false
  status:boolean=false;
  duedate:any;
  
  safeImageURL: SafeUrl;
  storageService: any;
  img: SafeUrl;
  editorContent: string;
  editorContent2: string = '';
  ckconfig:any;
  @Input()
  inputString: string;
  constructor(
    private router: Router,
    private messageService: MessageService,
   private activatedRoute: ActivatedRoute,
   private ticketService: TicketService,
   private sanitizer: DomSanitizer,
   private fb: FormBuilder,
   private scroller: ViewportScroller,
   private datepipe: DatePipe,
   private roleService: errorcodeservice,
   private renderer: Renderer2,
   private cdr: ChangeDetectorRef
  
 
  ) {
    // console.log(test1());
  }
  
  @ViewChild("scrollElement_reply")
  scrollEl: ElementRef;
 
  ngAfterViewInit():void{
    this.progressbar_detail=false;
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
 
    // tinymce.init(require('../tinymce.config.ts').default);
    this.enableEditMode();
    
  }
  ngOnInit(): void {

    
//  this.progressbartab=true;
    //this.displayticketview=false;
    // const objectURL = URL.createObjectURL(this.blobData);
    // const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    // this.img = img;
    // console.log("image blob",this.img);
    this.listvaluepost.length=0;
  
    this.arrayrandom=[
      "#AF1FAD",
      "#B716B6",
      "#0A7209",
      "#25DD4F",
      "#90D85A",
      "#B4D475",
      "#C26BDF",
      "#B2E11C",
      "#CB1825"
  ]
    // this.ticketnoselect = this.store.select(selectTicketNo); 
    // this.ticketnoselect.subscribe((res: any) => { 
    //   this.ticketNo = res ? res.ticketNo : null; 
    //   console.log("Ticketnosel", this.ticketNo);
    // });
    
    // this.projectvalue=JSON.parse(localStorage.getItem('projectnames'));
    
    // console.log("values of projectname another page",     this.projectvalue);
 
    // let myCompOneObj = new TicketComponent(this.fb, this.roleService,
    //   this.router, this.ticketService, this.messageService,
    //   this.shareservice, this.groupService,
    //   this.datepipe);
    this.primaryticketid= this.activatedRoute.snapshot.params['id'];
    this.getprimaryticketbyid();

    // this.getgroupbasedprojectTk();
    this.getformfieldapi();
    console.log("Update frield",this.update);
    this.fields=[{id:'one',label:'one',value:1},{id:'two',label:'two',value:2}];
   
    this.closedticketid=this.activatedRoute.snapshot.params['closedticket'];

    console.log("primary ticket",this.primaryticketid);
    console.log("closedticket id",this.closedticketid);
   
    //  this.getprojectlist();
    //  this.getListStatus();
    this.displaycc = false;

    // this.DataForm = this.generateFormControls(this.updatevalue);
    // console.log("values of data form" ,this.update);
    this.items = [
      {
        label: 'Tickets',
        routerLink: '/dashboard/tickets'
      },
      {
        label: 'Ticket Details',

      },
    ];
    this.approvalitems=[
      {
        label: 'Tickets',
        routerLink: '/dashboard/tickets'
      },
      {
        label: 'Approval',

      },
    ];
    this.priority = [
      { priority: 'Low' },
      { priority: 'High' },
      { priority: 'Medium' },
      { priority: 'Urgent' },
 
 
    
    
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard/dashboarditem' };
    this.projectNames = environment.outbound_project_name;
    this.ClosePrimaryHistory = localStorage.getItem('ticketmerge');
    console.log("ticket merge sec comp", this.ClosePrimaryHistory);
    this.sendreply = this.fb.group(
      {
        // 'id': new FormControl('', Validators.required),
        // 'from_Address': new FormControl('', Validators.required),
        // 'emailCC': new FormControl('', Validators.required),
        // 'to_Address': new FormControl(),
        // 'subject': new FormControl('', Validators.required),
        // 'ticketNo': new FormControl('', Validators.required),        
        // 'mailBody': new FormControl('', Validators.required),
        // 'status': new FormControl('', Validators.required),
        // 'projectId': new FormControl('', Validators.required),
        //  'url':new FormControl('', Validators.required)
        id: '',
        from_Address: '',
        emailCC: '',
        to_Address: '',
        subject: '',
        ticketNo: '',
        mailBody: '',
        status: '',
        projectId: '',
        url: ''
      });
      this.forwardreply = this.fb.group(
        {
          // 'id': new FormControl('', Validators.required),
          // 'from_Address': new FormControl('', Validators.required),
          // 'emailCC': new FormControl('', Validators.required),
          // 'to_Address': new FormControl(),
          // 'subject': new FormControl('', Validators.required),
          // 'ticketNo': new FormControl('', Validators.required),        
          // 'mailBody': new FormControl('', Validators.required),
          // 'status': new FormControl('', Validators.required),
          // 'projectId': new FormControl('', Validators.required),
          //  'url':new FormControl('', Validators.required)
          id: '',
          from_Address: '',
          emailCC: '',
          to_Address: '',
          subject: '',
          ticketNo: '',
          mailBody: '',
          status: '',
          projectId: '',
          url: ''
        });
    this.sendnote = this.fb.group(
      {
        ticketNo: '',
        addnote: ''

      });
      this.ticketupdate=this.fb.group({
        Priority:'',
        timetracker:'',
        statusname:'',
        GroupAgentName:''

      });
      this.RequestApproval = this.fb.group({
      //  ticketNo: '',
      //  from_Address: '',
        to_Address:'',
      //  subject:'',
      //  status:'',
      //  projectName:'',
      //  priorityStatus:'',
        mailBody:'',
        cc_Address:''

      });
     
      // this.DataForm= this.fb.group(
      //   {
        
      //     'Comments':new FormControl('',Validators.required),
      //     'Name':new FormControl('',Validators.required),          
      //     customFields: new FormArray([])
  
      //   });
    this.dueDates = [
      { name: 'Today', code: 'NY' },
      { name: 'Tomorrow', code: 'RM' },
      { name: 'This Week', code: 'LDN' },
      { name: 'Next week', code: 'IST' },
    ];
    this.errorForm = this.fb.group({
      error_code: '',
      error_name: '',
      error_description: '',
    });
    // this.priority = [
    //   { name: 'Low', code: 'NY' },
    //   { name: 'High', code: 'RM' },
    //   { name: 'Medium', code: 'LDN' },
    //   { name: 'Urgent', code: 'IST' },
    // ];
this.selectedCountryValue={
  "groupAgentName" :"ggg"
}
    this.departments = [
      { name: 'Development', code: 'NY' },
      { name: 'Finance', code: 'RM' },
      { name: 'HR', code: 'LDN' },
      { name: 'IT', code: 'IST' },
      { name: 'Marketing', code: 'PRS' },
    ];
    this.replyitems = [
      {
        label: 'Reply',
        icon: 'pi pi-reply',
      },
      {
        label: 'Forward',
        icon: 'pi pi-forward',
      },
      {
        label: 'Add Note',
      },
    ];
    this.moreitems = [
      {
        label: 'Delete',
      },
      {
        label: ' Execute Scenario',
      },
      {
        label: 'Merge',
      },
      {
        label: 'Print',
      },

      {
        label: 'Mark as spam',
      },
    ];

    this. res = this.activatedRoute.snapshot.params['id'];

  
  this.getticketbyID();
  this.getHistoryApi();
  this.getListStatus();
    // this.getprimaryhistory();
    this.getticketdetails();
    this.getRandomColor();
    
    this.statuslistApproval.length=0;

  }
  // executeCommand(command : string){
    
  //   document.execCommand(command, false, '');

  //   this.highlightEditorButtons();
  // }
  
 
  enableEditMode(): void {
    const richTextFieldElement = this.richTextField.nativeElement;
    richTextFieldElement.contentEditable = 'true';
  }
 

  onInput(): void {
    localStorage.setItem('dataSource', this.richTextField.nativeElement.innerHTML);
    
  }
  onFontSizeChange(event:any): void {
    console.log("ddd",event);
    // const selection = window.getSelection();
    // const range = selection.getRangeAt(0);
    // document.execCommand('fontSize', false, event);
    // selection.removeAllRanges();
    // selection.addRange(range);
   
  }

  toggleBold(): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('bold', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  toggleItalic(): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('italic', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  toggleUnderline(): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('underline', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  toggleOL(): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('insertorderedList', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  allignLeft()
  {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('justifyLeft', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  alligncenter()
  {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('justifyCenter', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  allignRight()
  {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('justifyRight', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  allignFull()
  {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('justifyFull', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  alignUndo()
  {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('undo', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  alignRedo()
  {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('redo', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  toggleUL(): void {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand('insertUnorderedList', false, null);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  toggleSource_align(): void {
    const richTextFieldElement = this.richTextField.nativeElement;
    //richTextFieldElement.textContent = richTextFieldElement.innerHTML;
    const richTextField = document.querySelector('.texteditor');
    const tables = richTextField.querySelectorAll('table');
   
    // Loop through each table and add the desired styles
tables.forEach((table:any) => {
  const divBeforeTable = document.createElement('div');
  divBeforeTable.classList.add('custom-div');
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.style.border = '1px solid #000000';
      const thCells = table.querySelectorAll('th');
      const tdCells = table.querySelectorAll('td');

      thCells.forEach((th:any) => {
        th.style.border = '1px solid #000000';
        th.style.padding = '8px';
        // Add more styles as needed for th
      });

      tdCells.forEach((td:any) => {
        td.style.border = '1px solid #000000';
        td.style.padding = '8px';
        // Add more styles as needed for td
      });
      divBeforeTable.appendChild(table);
      richTextField.appendChild(divBeforeTable);
      // You can add more styles as needed
      // divBeforeTable.appendChild(table);
      // document.body.appendChild(divBeforeTable); 
    });
    
   
    // alert(richTextFieldElement.textContent );
  }
  toggleSource(): void {
  
    const richTextFieldElement = this.richTextField.nativeElement;

    if (this.showingSourceCode) {
      richTextFieldElement.innerHTML = richTextFieldElement.textContent;
      this.showingSourceCode = false;
      console.log(" richtextbox",   richTextFieldElement.textContent);
    } else {
      richTextFieldElement.textContent = richTextFieldElement.innerHTML;
      this.showingSourceCode = true;
    
      console.log(" richtextbox",   richTextFieldElement.textContent);
    }
  }

  toggleEdit(): void {
    const richTextFieldElement = this.richTextField.nativeElement;

    if (this.isInEditMode) {
      richTextFieldElement.contentEditable = 'false';
      this.isInEditMode = false;
    } else {
      richTextFieldElement.contentEditable = 'true';
      this.isInEditMode = true;
    }
  }

  toggleDarkLight(): void {
    const element = document.body;
    element.classList.toggle("dark-mode");
  }
  // executeCommand(command: string): void {
  //   const element = this.richTextField.nativeElement;
  //   this.execCmd(command, element);
  // }
  onHeadingChange(selectedValue: string): void {
    document.execCommand('formatBlock', false, selectedValue);
  }
  onFontChange(selectedValue: string): void {
    document.execCommand('fontSize', false, selectedValue);
  }
  onFontFamily(selectedValue: string): void {
    document.execCommand('fontName', false, selectedValue);
  }
  keydown(){
    this.highlightEditorButtons();
   }
   highlightEditorButtons(){
    const isBold = document.queryCommandValue("bold");
    const isItalic = document.queryCommandValue("italic");
    const isUnderline = document.queryCommandValue("underline");
    
    const btnBold = document.getElementById('btnBold');
    const btnItalic = document.getElementById('btnItalic');
    const btnUnderline = document.getElementById('btnUnderline');

    if (isBold === 'true') {
      btnBold.style.backgroundColor = "gray";
    } else {
      btnBold.style.backgroundColor = "lightgray";
    }
    
    if (isItalic === 'true') {
        btnItalic.style.backgroundColor = "gray";
    } else {
       btnItalic.style.backgroundColor = "lightgray";
    }

    if (isUnderline === 'true') {
       btnUnderline.style.backgroundColor = "gray";
    } else {
        btnUnderline.style.backgroundColor = "lightgray";
    }
  }
  handlePaste3(event: ClipboardEvent): void {
    event.preventDefault();

    const clipboardData = event.clipboardData;
    if (clipboardData) {
      // const items = clipboardData.items;
      const items: any[] = Array.from(clipboardData.items);

      for (const item of items) {
        if (item.type === 'text/plain') {
          // Handle plain text content
          item.getAsString((text:any) => {
            // Process the text as needed
            this.editorContent2 = text;
          });
        } else if (item.type === 'text/html') {
          // Handle HTML content
          item.getAsString((html:any) => {
            // Process the HTML as needed
            this.editorContent2 = html;
          });
        } else if (item.type === 'text/uri-list') {
          // Handle URI content
          item.getAsString((uri:any )=> {
            // Process the URI as needed
            this.editorContent2 = uri;
          });
        } else if (item.type === 'text/csv') {
          // Handle CSV content
          item.getAsString((csv:any )=> {
            // Process the CSV as needed
            this.editorContent2 = csv;
          });
        } else if (item.type === 'application/vnd.ms-excel') {
          // Handle Excel content using SheetJS
          item.getAsString(async (uri:any )=> {
       
            const response = await fetch(uri);
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });

            // Process the Excel data as needed
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const excelData= XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const typedExcelData: any[][] = excelData as any[][];
            // Convert Excel data to HTML table
           this.editorContent = this.formatExcelDataToHTMLTable(typedExcelData);
          });
        }
      }
    }
  }

  private formatExcelDataToHTMLTable(excelData: any[][]): string {
    // Format the Excel data into an HTML table
    const tableRows = excelData.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`);
    return `<table>${tableRows.join('')}</table>`;
  }
  
  // handlePaste(event: ClipboardEvent): void {
  //   event.preventDefault();
  //   const clipboardData = event.clipboardData;
  //   if (clipboardData) {
  //     const pastedText = clipboardData.getData('text/plain');
  //     // Process the pastedText as needed
  //     // Insert the processed content into yourContent
  //     this.editor.nativeElement.innerHTML += pastedText;
  //   }
  // }
 
 
  downloadFile(value:any)
  {
    console.log("url link",value);
    const fileUrl = value; // Replace this with your file URL

    // Create a temporary anchor element
    const link = document.createElement('a');
    console.log("url link",link);
    link.setAttribute('href', fileUrl);
  //  link.setAttribute('target', '_blank'); // Optional: Opens in a new tab
    link.setAttribute('download', ''); // Sets the download attribute

    // Simulate a click to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  }
  localstorage_data()
  {
console.log("localstorage data",localStorage.getItem('dataSource'));
  }
  getticketbyID()
  {
    const res = this.activatedRoute.snapshot.params['id'];
    this.progressbar=true;
    this.ticketService.getEmailDetailById(res).subscribe((result:any) => {
      this.progressbar=false;
      console.log("value of id ",result);
      console.log("value od group",result.groupName);
    
 

      this.htmlString = result.mailBody;
    
      this.emailTickets = result;
      console.log("email tickets",this.emailTickets);
      this.emailTickets_Emailcc.push(this.emailTickets.emailCC);
     
      this.manualtickets=result.mail_flag;
      this.reply_flag=result.reply_Flag;
      if(this.reply_flag===null)
      {
        this.updateticket=false;
        
      }else{
        this.updateticket=true;
      }
      console.log("updateticket ",this.updateticket);
      this. getGroup_cc(result.groupName);
      if(this.manualtickets=='MTG')
      {
        this.progressbar=false;
   this.manualticketsecdisplay=true;
   this.manualticketsec=false;
      }else
      {
        this.progressbar=false;

        this.manualticketsec=true;
this.manualticketsecdisplay=false;
      }
      console.log("value of tickets",this.manualtickets);

      this.cdr.detectChanges();

    }

    );
  }
  show()
  {
   //this.statusboolean=true;
  }
  showPriority()
  {
    this.priorityboolean=true;
  }
  showgroupname()
  {
  this.groupnameboolean=true;
  }
  generateFormControls(formData: any)
    {
      console.log("formdata",formData);
        let tempGroup: FormGroup = new FormGroup({});
         formData.forEach((element:any)=>{
            tempGroup.addControl(element.value, new FormControl(''));
            console.log("tempgroup loop",tempGroup);
        });
        return tempGroup;
    }
    PreviewData() 
    {
      // alert("hi");
         this.payLoad = JSON.stringify(this.form2.value);
         console.log(this.form2.value);
    }
    goDown1() {
      this.router.navigate([], { fragment: "targetRed" });
      this.scroller.scrollToAnchor("targetRed");
    }
    toTop($event:any) {
       
      document.getElementById("content").scrollIntoView();
     
    }
    onChangelist(event:any) {

      // this.getformfields();

      this.grouplist = event.value;
     
       console.log("grouplist value",this.grouplist.toString());
      this.Listboxgroupname=this.grouplist.toString();
      //console.log(event.key);
      // this.values=event.target.value;
      // console.log('event :' +this.values);
    }
    getListStatus() {
      this.ticketService.getListOfStatus()
        .subscribe((result) => {
  console.log("result of status",result);
  this.statusvalue=result;
          // console.log('values are of', result.mailBody);
          // this.htmlString = result.mailBody;
          // console.log(this.htmlString);
          // this.emailTickets = result;
  
  
  
  
        }
  
        )
    }
 
   
    sendrequest_approval()
    {
      // alert("hi");
     
      this.  send_approval=true;
     console.log("mail flag",this.mail_flag);
      if(this.mail_flag=='MTG')
      {
        this.address=this.fromgetaddress;
        console.log(this.address);
      }else
      {
        this.address=this.togetaddress;
        console.log(this.address);
      }
    if(this.RequestApproval.controls['cc_Address'].value=='')
    {

this.ccemail=null;
// alert("value not have"+this.ccemail);
    }else
    {
     
      this.ccemail=this.RequestApproval.controls['cc_Address'].value;
      // alert("value have " +  this.ccemail);
    }
      let payLoad={
        ticketNo:this.primaryticketid,
        from_Address:this.address,
        to_Address:this.RequestApproval.controls['to_Address'].value,
        subject:this.getemailsubject,
        status:this.statusemail,
        cc_Address: this.ccemail,
        projectName:this.projecgettname,
        priorityStatus:this.prioritystatus,        
        mailBody:this.RequestApproval.controls['mailBody'].value
      }
      this.progressbar=true;
      this.ticketService.sendRequestApproval(payLoad)
      .subscribe({

        next: (value: any) => {
          this.displayticketview=false;
          if (value === null) {       
            this.progressbar=false; 
            this.send_approval=false;
            
            this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });
          }else{
           this.displayticketview=false;
           this.progressbar=false; 
           this.send_approval=false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Approval Send Successfully' });
           this.ngOnInit();
   
            
        
          }
      }, error: (err: any) => {
        this.errorMessage=err.error.message
        this.progressbar=false; 
        this.send_approval=false;
       // this.displayticketview=false;
        this.messageService.add({ severity: 'error', summary: 'Invalid', detail:  this.errorMessage });
      }
    });
   
    }
    getticketdetails()
    {
      this.progressbartab=true;
      this.ticketService.getApprovalStatus(this.primaryticketid)
      .subscribe((result) => {
        this.progressbartab=false;
          this.statusApprovalList=result;
         this.statuslistApproval.push(this.statusApprovalList);
       
      });
  
      console.log("getlist",this.statusApprovalList)
    }
getapproval()
{
  this.displayticketview=true;
  this.RequestApproval.get('to_Address').reset();
  this.RequestApproval.get('mailBody').reset();
 
}
    onChangesprioritylist(newvalue:any , event:any)
    {
     
       this.prioritylists=event.value;
      
       this.prioritylist=this.prioritylists;
       console.log("prioritylist List",this.prioritylists);
    }
    onChangestatuslist(newvalue: any,event:any) {
  
      // if(event.value.checked==true)
      // {
      //   alert("hi");
      // }else
      // {
      //   alert("nt selected");
      // }
    //  this.Listboxgroupname = newvalue.groupAgentName;
    //  this.localArray.push(this.Listboxgroupname);;
    //  console.log("listname",this.Listboxgroupname);
    //  console.log("arraypush",this.localArray);
  
     this.statuslistarray=event.value;
     this.statuslist=  this.statuslistarray.toString();
     console.log("Status List",this.statuslist);

  //this.statusboolean=false;
  //  this.Listboxgroupname=event.value.agentName;
  //     console.log('clicked event :' +this.groupreportlist);
  //     console.log(this.localArray.push(this.values));
  
    }
    getformfields()
    {
   
      console.log("insideingetformbuilderapi",this.projectsid);

      
 this.ticketService
 .getgroupbasedproject(this.projectsid)
 .subscribe((res) => {
 
   this.groupbased = res;
   console.log("groupbased",this.groupbased);

 });
    }
  getformbuilderapi()
  {
    console.log("priority name",this.priorityname);
   // alert(JSON.stringify(this.form2.value));
    // console.log("in post list",this.form2.value);
    this.progressbar=true;
  
   this.dataformarray.push(this.form2.value);
 
console.log("POsted value of list", this.dataformarray);
for (let obj of this.dataformarray) {
  console.log("object:", obj);
  
  for (let key in obj) {

    console.log("label",key);
  
    console.log("value",obj[key]);
     // console.log("      key:", key, "value:", obj[key]);
     if(obj[key]===null)
     {
      this.listvalue=
      {
        "label":key,
        "value":'',
 
      }
     }else{
      this.listvalue=
      {
        "label":key,
        "value":obj[key],
 
      }
     }
   
     this.listvaluepost.push(this.listvalue);

  }
  
}
console.log("value pair of key value",this.listvaluepost);




    let uploadpayload = {
      ticketNo:this.primaryticketid,
      projectName:this.ticketprojectname,    
      customFields:this.listvaluepost,
      groupName: this.Listboxgroupname,
      status:   this.statuslist,
      priority:this.prioritylists,
      timeTracker:this.timetracker
    };
    
    console.log("ticket value before",uploadpayload);
    if(uploadpayload.groupName==='undefined'||uploadpayload.groupName===''||uploadpayload.groupName==null)
    {
       this.groupnamepayload=this.groupname
    }else
    {
      this.groupnamepayload=this.Listboxgroupname
    }

    if(uploadpayload.priority===undefined||uploadpayload.priority===''||uploadpayload.priority===null)
    {
     
       this.prioritypayload=this.priorityname;
       console.log("value is priority undefined",    this.prioritypayload);
    }
   
    else
    {
      this.prioritypayload=this.prioritylists;
      console.log("value is priority list value", this.prioritypayload);
    }
    if(uploadpayload.status==='undefined'||uploadpayload.status===''||uploadpayload.status==null)
    {
       this.statuspayload=this.statusname
    }else
    {
      this.statuspayload=this.statuslist
    }
    if(uploadpayload.timeTracker==='undefined'||uploadpayload.timeTracker===''||uploadpayload.timeTracker==null||
    uploadpayload.timeTracker==="" ||uploadpayload.timeTracker==='0')
    {
    //  this.messageService.add({ severity: 'Timetracker', summary: 'Timetracker', detail: 'Fill  Timetracker Field' });
       this.timetrackerpayload=this.timetracker;
    }else
    {
      this.timetrackerpayload=this.ticketupdate.controls['timetracker'].value;
    }
    
    let payloadfinal={
      ticketNo:this.primaryticketid,
      projectName:this.ticketprojectname,    
      customFields:this.listvaluepost,

      groupName:this.groupnamepayload,
      priority:  this.prioritypayload,
      status:   this.statuspayload,    
      timeTracker:this.timetrackerpayload
    }
    console.log("ticket value final",payloadfinal);
    
    this.ticketService.customapi(payloadfinal).subscribe(
      {

        next: (value: any) => {

          
          if (value === null) {
            this.progressbar=false;
            this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });

          }
          else {
            if(payloadfinal.status==='Resolved')
          {
            this.TicketDialog = true;
            this.progressbar=false;
            this.errorForm.setValue({
              error_code: this.primaryticketid,
              error_name: this.emailTickets.subject,
              error_description: '',
            });

          }else{
            this.progressbar=false;
            this.listvaluepost.length=0;
            this.dataformarray.length=0;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ticket Properties Updated Successfully' });
            this.ngOnInit();
            this.displaynote=false;
            // window.location.reload();
          }
      
           
          }
        },
        error: (err: any) => {
          this.listvaluepost.length=0;
          this.dataformarray.length=0;
          // window.location.reload();
          this.ngOnInit();
          // this.listvaluepost.length=0;
          console.log("error message :", err);
          this.progressbar=false;
          this.isloadingicon = false;
          this.errorMessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
       //   window.location.reload();
            
        }
      }
    )
  }
  getprimaryhistory()
  {
   this.progressbartab=true;
    this.ticketService.getHistoryDetailById(this.closedticketid).subscribe(
      {
        next: (value: any) => {
          this.progressbartab=false;

          this.mailbodyarr.push(value[0].mailBody);
          // console.log(this.mailbodyarr);
        },
        error: (err) => {
          this.slamessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.slamessage });
        }
      }
    );
    // console.log("gethistory of ticket in array",this.mailbodyarr[0].toString());
  }
  onChange1(event:any)
  {
    this.groupagentId = event.value;
    console.log('group name', this.groupagentId);
  }
  getHistoryApi() {
    this.isloading = true;
    this.progressbar=true;
    const res2 = this.activatedRoute.snapshot.params['id'];
    console.log("gethistory", res2);
    console.log("first")
    localStorage.setItem('historyValue', res2)
    console.log(localStorage.getItem("historyValue"))
    this.ticketService.getHistoryDetailById(res2)
      .subscribe((result) => {
        this.progressbar=false;
        this.emailHistoryTickets = result;
        this.progressbar=false;
        console.log("value of before email history",result);
        console.log("value of before email history",result[0].dueDate);
        this.date_format =result[0].dueDate;
        console.log("dateformtdd",this.date_format);

        var d = new Date(this.date_format);
        console.log("date",d.getDate(),':',d.getMonth()+1,':');
        // this.duedatehours=d.getUTCHours();
          console.log("hours",d.getHours());
        this.duedatehours=d.getUTCHours();
        if (d.getHours() < 12)
        {       
         this.hoursformat = 'AM'
        }else{
          this.hoursformat = 'PM'
         }
        this.emailHistoryTickets.filter((val: any) => {
          console.log("date spring",val.dueDate); 
          console.log("value of email history URL",val);
            console.log("value of after email history filter",val);
            this.richTextField.nativeElement.innerHTML="";
            // val.attachmentUrls.filter((val: any) => {
             
            //   this.filename_history.push(val.downloadUrl);
            //   const lastUrlSegment = val.downloadUrl.split('?')[0].split('/').pop();
            //   console.log("lastseg",lastUrlSegment);
            //   this.url_array.push(lastUrlSegment);

            // });
          // const segmenturl=val.url;
          // const urlpath=segmenturl.split('?')[0].split('/').pop();
          // const urldot=urlpath.split(".");   
          // console.log("value of email history URL after split",urlpath);
          // console.log("value of email history URL after dot",urldot[1]);
          // this.imageextenstioncheck=urldot[1];
    
          this.from_Address=val.from_Address;
          this.date_format =val.dueDate;
          console.log("dateformt",this.date_format);
          // console.log("Hours", this.date_format.getUTCHours()); 
          // console.log("Minutes", this.date_format.getUTCMinutes());
          // console.log("seconds", this.date_format.getUTCSeconds());
          var d = new Date(this.date_format);
          console.log("date",d.getDate(),':',d.getMonth()+1,':');
          // this.duedatehours=d.getUTCHours();
            console.log("hours",d.getHours());
          this.duedatehours=d.getUTCHours();
          if (d.getHours() < 12)
          {       
           this.hoursformat = 'AM'
          }else{
            this.hoursformat = 'PM'
           }
          if (this.duedatehours < 12)
          {       
           this.ampm = 'AM'
          }else{
            this.ampm = 'PM'
           }

          if (this.duedatehours < 10)       
           this.duedatehours = '0'+  this.duedatehours;


          this.duedateMinutes=d.getUTCMinutes();
          if (this.duedateMinutes < 10)       
           this.duedateMinutes = '0'+  this.duedateMinutes;

          this.duedateseconds=d.getUTCSeconds();
          if (this.duedateseconds < 10)       
          this.duedateseconds = '0'+  this.duedateseconds;
          console.log("Hours",d.getUTCHours()); 
          console.log("Minutes",d.getUTCMinutes());
          console.log("seconds",d.getUTCSeconds());
          // DateTime date = DateTime.Now;
          this.duedate=this.datepipe.transform(val.dueDate, 'dd-MM-yyyy HH:MM:SS a');
          console.log(this.duedate);
          console.log("from_Address",this.from_Address);
          this.isloading = false;
          console.log("URL", val.addnote);
          if ((val.emailCC === null) && (val.url === null) ) {
            this.displaycc = false;
            this.urlShow = false;
            this.noteShow = false;
          }
          else {
            this.displaycc = true;
            this.urlShow = true;
            this.noteShow = true;
          }
          this.temp = this.datepipe.transform(val.clientCreationDate, 'dd-MMM-yyyy hh:mm:ss a');
          val.clientCreationDate = this.temp;
        
        });

      }
      )
      console.log("filename",this.filename_history);
  }
  getSelectedValue(value:any){
  
    // Prints selected value
    console.log("value is ",value);
  }
    //formfieldgetapi
    getformfieldapi() {
      this.progressbartab=true;
      this.ticketService.getformfieldapi(this.primaryticketid)
        .subscribe((result) => {
       
          this.progressbartab=false;
          this.formgetdata = result;    
          this.formgetdata.forEach((x:any)=> {
            this.form2.addControl(x.label, new FormControl('',Validators.required));          

          });
          for (let index = 0; index<this.formgetdata.length; index++) {
            //console.log("value of index ",this.formgetdata.at(index).get());
          }
          console.log("values in get list",this.form2.value);
          this.update.push(this.formgetdata);  
          console.log("value of dataform",this.formgetdata);    
          //this.projectname=this.formgetdata[0].projectName;
         // this.ticketNumber=this.formgetdata[0].ticketNo;
       
          this.formgetdata.forEach((element:any)=>{
           console.log("values of form builder",element);
     
  this.listvalue=
  {
    "label":element.label,
    "value":element.value,
    
    
  }

 console.log("listvalue",this.listvalue.value);
  this.updatevalue.push(this.listvalue);

  // const formDataObj:any= {};


  //   for (const arr of Object.keys(this.listvalue)) {
  //     formDataObj[arr] = new FormControl(this.listvalue[arr]);

  //     console.log("key values",arr);//label value
  //     console.log("person values",this.listvalue[arr]);//juri , 32 value
  
  //   }

    // this.DataForm = new FormGroup(formDataObj);
//  obj['label']=element.label;
 //  obj2['value']=element.value;
 //  console.log("Key value pair label",obj); 
 //  console.log("Key value pair value",obj2); 

// this.updatelistlabel.push(obj);
// this.updatelistvalue.push(obj2);
// obj['label']=element.label;
// obj2['value']=this.formgetdata.value;
// console.log("Key value pair label",obj); 
// console.log("Key value pair value",obj2); 


        
          })    
          // console.log("update value of key",this.updatevalue);
          // console.log("Label",this.updatelistlabel);
          // console.log("String label",JSON.stringify(this.updatelistlabel));
          //  console.log("value",this.updatelistvalue);    
          //  var objset:any={};
         // console.log("pushed array ",this.updatelistvalue);
      //    for (var i = 0; i <= this.updatelistlabel.length; i++) {
      //     objset[this.updatelistlabel[i]] = this.updatelistvalue[i];
      //     console.log("objset",objset);
      
      // } 
        }
  
        )           
      
        //console.log("formgetdatadetails",  this.projectname);
    }
    getprimaryticketbyid_tickets(ticketno:any) {
this.progressbartab=true;
      this.ticketService.getEmailDetailById(ticketno)
        .subscribe(
          {
            next:(result) => {
              this.progressbartab=true;
              console.log("getemaildetails",result);
            }});
          
          }

          cleanString() {
           // this.cleanText = this.editor.el.nativeElement.innerText;
          }
  getprimaryticketbyid() {

    this.ticketService.getEmailDetailById(this.primaryticketid)
      .subscribe(
        {
          next:(result) => {
        console.log("getemaildetails",result);
        this.fromgetaddress=result.from_Address;
        this.togetaddress=result.to_Address;
        this.toMTGaddress=result.to_Address;
        this.getemailsubject=result.subject;
        this.statusemail=result.status;
        this.mail_flag=result.mail_flag;
        this.prioritystatus=result.priority;
        this.mailBodysection=result.mailBody;
        this.projecgettname=result.projectName;
        this.timetracker=result.timeTracker;
        //console.log('Primary', result.mailBody);
        this.primaryhtmlString = result.mailBody;
        //  console.log(this.primaryhtmlString);
        this.emailTicketsprimary = result;
        this.projectsid=this.emailTicketsprimary.projectId;
        this.ticketprojectname=this.emailTicketsprimary.projectName;
        this.groupname=this.emailTicketsprimary.groupName;
        this.statusname=this.emailTicketsprimary.status;
        this.statuschange=this.emailTicketsprimary.first_RESPONSEON;
        if(this.priorityname===null)
        {
          this.priorityname='Low'
         // alert(this.priorityname);
        }else{
          this.priorityname=this.emailTicketsprimary.priority;
         // alert(this.priorityname);
        }
        if(this.statuschange===null)
        {
        this.statusboolean=false;
        this.statusdiv=true;
        }else{
          this.statusboolean=true;
          this.statusdiv=false;
        }
        console.log("ticket details", this.projectsid);


        //  console.log("Primary Mailbody",this.primaryhtmlString);
        this.projectid.push(this.projectsid);
        this.DataForm.setValue({

        });

      },
      error:(err:any)=>{
        this.messageService.add({
          severity: 'warn',
          summary: 'error',
          detail: 'Failed ',
          life: 3000,
        });
        
      }
    }
      );
   this.pro=this.projectid;
    console.log("value is   ",this.pro);
  }

  getgroupbasedprojectTk() {
    this.ticketService
      .getgroupbasedproject(this.projectsid)
      .subscribe((res) => {
      
   
      
        this.groupbased = res;
        // console.log("Groupbased",this.groupbased);
     
      });
     
  }

  onChangeproject(event: any,onChange:any)
  {
    this.reportlabel = onChange
    //console.log(this.projectCategoryId);
   this.reportvalue=event.value;
    console.log("report value" ,    this.reportlabel );
    console.log("report name" ,this.reportvalue);
   
  }
 
  changeDueDate() {
    this.display = true;
  }

  openCalendar(event: any) {
    this.calendardiv = true;
    this.calendarDropdowndiv = false;
  }
  onfileselect(event: any) {
    // alert("hi");
    this.selectedfile = event.target.files[0].type;
    console.log(this.selectedfile);
  }

  cancelClick() {
    this.display = false;
    this.calendardiv = false;
    this.calendarDropdowndiv = true;
  }
  uploadfun(uploader: any) {
this.uploadtxt=true;
this.uploadtxt_fwd=true;

    this.selectedfile = uploader.target.files;
    for(let i = 0; i < uploader.target.files.length; i++){
      let file = uploader.target.files[i];
      
      this.files.push(file);

    }

   for(let i=0;i<this.files.length;i++)
   {
    let files=this.files[i].name;
    console.log("file array",files);
    this.filesarray.push(files);
   }
    this.selectfilename = <File>uploader.target.files[0];
    console.log("filename sec", this.selectfilename);
    console.log("called", this.selectedfile.item(0));
    const file: File = this.selectedfile.item(0);
    this.selectedfilesitem = this.selectedfile.item(0).name;
    const files: File = this.selectedfile.item(0).name;
    // console.log("uploader",uploader.files[0].name);  
    // this.filepath=uploader.files[0].name;
    console.log("filepath in payload", this.filepath);


    this.onuploadimageservice();

  }
  
  onuploadimageservice() {
    const file: File = this.selectedfile.item(0);
    let uploadpayload = {
      file: this.files,
      ticketNo: this.emailTickets.ticketNo,
    };

    // this.ticketService.upload(uploadpayload.ticketNo, file).subscribe(

    // MULTIPLE UPLOAD SERVICE CALL
    console.info('Files check', this.files);

      this.ticketService.multipleUPload(uploadpayload.ticketNo, this.files).subscribe(
      {

        next: (value: any) => {

          if (value.type === HttpEventType.UploadProgress) {
            this.isloadingicon = true;
          } else if (value instanceof HttpResponse) {
            this.isloadingicon = false;

            this.message = value.body;
            // this.arrlink.push(this.message);
            console.log("response message", this.message);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Uploaded  Successfully`' });

          }
          // if (value != null) {
          //   console.log("success");

          //   this.messageService.add({ severity: 'success', summary: 'Suceess', detail: 'AddNote send  Successfully' });
          //   this.ngOnInit();
          //   this.displaynote=false;
          // }
          // else {
          //   console.log("su2");
          //   this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });

          // }
        },
        error: (err: any) => {
          console.log("error message :", err);
          this.isloadingicon = false;
          this.errorMessage = err.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage })
        }
      }
    )

  }
  handlePaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent default pasting behavior

    const clipboardData = event.clipboardData;
 
    if (!clipboardData) {
      return; // Clipboard data not available
    }
 
    const items = clipboardData.items;
  
    if (!items) {
      return; // No items in clipboard
    }
 
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type === 'text/html') {
        this.handleHtmlText(item);
        
      } else if (item.type.indexOf('image') !== -1) {
        this.handleImage(item);
      }
    }
  }
  handleHtmlText(item: DataTransferItem): void {
    item.getAsString((html) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      console.log( "value of ",html);
      const nodes = tempDiv.childNodes;
      nodes.forEach((node) =>
      {
        this.contentContainerRef.nativeElement.appendChild(node.cloneNode(true));
        
        console.log("value of ", this.contentContainerRef.nativeElement.innerHTML);
      }
      );
    });
  }
  handleImage(item: DataTransferItem): void {
    const blob = item.getAsFile();
    const reader = new FileReader();
 
    reader.onload = (event) => {
      const dataURL = event.target.result as string;
      const img = document.createElement('img');
      img.src = dataURL;
      img.style.maxWidth = '100%';
      img.style.marginBottom = '10px';
      this.contentContainerRef.nativeElement.appendChild(img);
    };
 
    reader.readAsDataURL(blob);
  }

  onBeforeUploadListener(event: any, uploader: any) {
    // your have acces to files :
    console.log(uploader.files);
  }
  editRequesterDetail(requester: any) {
    // this.editTicketScreen = true;
    // this.requester = 'freshservice:3223329'; //hardcode
    // this.router.navigate(['/dashboard/admin/requesters', this.requester]);
  }
  ccClicked() {
    this.ccdiv = true;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
addnote(ticket: ticket) {

this.sendnote.get('addnote').setValue('');
    this.loading = true;
    this.forwarddiv = false;
    this.replydiv = false;
    this.displaynote=true;

    this.ticketedit = { ...ticket };
    console.log('Ticket no ', ticket.ticketNo);
    console.log('from_address', ticket.from_Address);
    this.scrollEl.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    this.sendnote.patchValue(
      {
        ticketNo: this.emailTickets.ticketNo,
        addnote: ''
      });

  }
  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.parseExcel(file);
    }
  }
  parseExcel(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const excelContent = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
      this.text = this.formatExcelContent(excelContent);
    };
    reader.readAsBinaryString(file);
  }
  formatExcelContent(excelContent: any[]): string {
    // Process the excelContent and format it as needed
    // Return the formatted content as a string
    return JSON.stringify(excelContent);
  }

  // handlePaste() {
  //   navigator.clipboard.readText().then((pastedData) => {
  //     const excelData = this.parseExcelData(pastedData);
  //     this.insertTableIntoEditor(excelData);
  //   });
  // }


 
  replyClick(ticket: ticket) {
    // document.getElementById("content").scrollIntoView();
    this.loading = true;
    this.forwarddiv = false;
    this.replydiv = true;
    this.displaynote=false;
    this.uploadtxt=false;
    this.ticketedit = { ...ticket };
    this.status = !this.status; 
    console.log("emailcc value",this.emailcc);
    // const array1 = this.textbox1.split(',').map(value => value.trim());

    this.scrollEl.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log('email', this.ticketedit.projectId);

 
    this.ticketService.getProjectDetailsByIdservice(this.ticketedit.projectId).subscribe((res:any) => {
      this.tickets = res;
      console.log("projectby id",this.tickets.emailAddress);
      this.emailaddress_Project=this.tickets.emailAddress;

      const array2 = this.emailcc.split(',').map((value:any) => value.trim());
      const names = array2.filter((name:any) => name !==  this.emailaddress_Project);
      console.log("array",names);
      const array1 = this.tickets.emailAddress.split(',').map((value:any) => value.trim());
      console.log("split array1",array1);
      console.log("split array2",array2);
      const uniqueArray = [...array1, ...array2].filter((value, index, array) => array.indexOf(value) === index);
      console.log("Unique array",uniqueArray);
      if(this.emailTickets.mail_flag=='MTG')
    {
      console.log("values of send reply",this.sendreply.value);
        this.sendreply.patchValue(
          {
            
            id: this.emailTickets.id,
            from_Address:  this.emailaddress_Project,
            to_Address:this.emailTickets.to_Address,
            emailCC: this.emailcc,
            subject: this.emailTickets.subject,
            ticketNo: this.emailTickets.ticketNo,
            mailBody: '',
            status: this.emailTickets.status,
            projectId: this.emailTickets.projectId,      
          });
          console.log("values of send reply",this.sendreply.value);
        }
        else
          {
            //alert("Y");
            console.log("NOt MTG",this.sendreply.value);
            this.sendreply.patchValue(
              {
                
                id: this.emailTickets.id,
                from_Address: this.emailaddress_Project,
                to_Address: this.emailTickets.from_Address,
                emailCC: this.emailcc,
                subject: this.emailTickets.subject,
                ticketNo: this.emailTickets.ticketNo, 
                mailBody: '',
                status: this.emailTickets.status,
                projectId: this.emailTickets.projectId,
        
               
              });
              console.log("NOt MTG",this.sendreply.value);
          }
    
    });
    console.log('mailflag',this.emailTickets.mail_flag);
    console.log(this.emailaddress_Project[0]);


  }
  forwardclick(ticket: ticket) {

    console.log('values are emailtickets forward', this.emailHistoryTickets);
    this.loading = true;
    this.forwarddiv = true;
    this.replydiv = false;
    this.uploadtxt_fwd=false;
    this.displaynote=false;
    this.ticketedit = { ...ticket };
    console.log('from_address', ticket.from_Address);
   // this.forwardreply.get('to_Address')?.setValue( this.emailTickets.from_Address);
    //alert(this.emailTickets.id);
    console.log("value",this.emailTickets.from_Address);
    this.scrollEl.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    this.ticketService.getProjectDetailsByIdservice(this.ticketedit.projectId).subscribe((res:any) => {
      this.tickets = res;
      console.log("projectby id",this.tickets.emailAddress);
      this.emailaddress_Project=this.tickets.emailAddress;
      if(this.emailTickets.mail_flag=='MTG'){
        this.forwardreply.patchValue(
          {
            
            id: this.emailTickets.id,
            from_Address: this.emailaddress_Project,
            to_Address:this.emailTickets.to_Address,
            emailCC: this.emailcc,
            subject: this.emailTickets.subject,
            ticketNo: this.emailTickets.ticketNo,
            mailBody: '',
            status: this.emailTickets.status,
            projectId: this.emailTickets.projectId,
    
          
          });
      }else{
        this.forwardreply.patchValue(
          {
            
            id: this.emailTickets.id,
            from_Address: this.emailaddress_Project,
            to_Address: this.emailTickets.from_Address,
            emailCC: this.emailcc,
            subject: this.emailTickets.subject,
            ticketNo: this.emailTickets.ticketNo,
            mailBody: '',
            status: this.emailTickets.status,
            projectId: this.emailTickets.projectId,
    
           
          });
      }
    });
   
    // this.forwardreply.setValue(
    //   {
    //     id: this.emailTickets.id,
    //     from_Address: this.emailTickets.to_Address,
    //     to_Address: this.emailTickets.from_Address,
    //     emailCC: this.emailcc,
    //     subject: this.emailTickets.subject,
    //     ticketNo: this.emailTickets.ticketNo,
    //     mailBody: this.emailTickets.mailBody + localStorage.getItem("historyValue"),
    //     status: this.emailTickets.status,
    //     projectId: this.emailTickets.projectId,

    //   });

  }
  getprojectlist() {

    this.ticketService.getListOfPMOValues().subscribe((res) => {

     this.projectlist = res;
  
 
     console.log("project drop down email tickets",this.projectlist);
   

    });
  }
  send_note(tickets:any) {
    console.log(tickets);

    //alert('sucess');
    //this.messageService.add({severity:'success', summary: 'Suceess', detail: 'User Registered Successfully'});
    this.ticketService.sendnote(this.sendnote.value).subscribe(
      {

        next: (value) => {

         
          if (value !==null) {
            console.log("success");

            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'AddNote send  Successfully' });
            this.getticketbyID();
            this.displaynote = false;
            
          this.sendnote.get('addnote')?.reset();
         
          }
          else {
            console.log("su2");
            
            this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });

          }
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage })
        }
      }
    )
  }
getGroup_cc(value:any)
{
// this.getticketbyID();
console.log( "value is emailcc tickets",this.emailTickets_Emailcc[0]);
  console.log("value of groupcc",value );
  // alert("before"+value);
  this.ticketService.getGroupsccMails(value)
  .subscribe((result:any) => {
console.log("email response value",result);
this.emailgroup=result[0];
this.emailtk_cc=this.emailTickets_Emailcc[0];
console.log("email response value emailcc",this.emailtk_cc);
this.emailcc=result[0]+this.emailTickets_Emailcc[0];
if(this.emailgroup==undefined || this.emailgroup===null )
{
  this.emailcc=this.emailtk_cc
}else if(this.emailtk_cc===null||this.emailtk_cc==undefined)
{
  this.emailcc=this.emailgroup
}else
{
  this.emailcc=this.emailtk_cc+this.emailgroup
}
//  this.sendreply.get('emailCC')?.setValue(this.emailcc);
//  this.forwardreply.get('emailCC')?.setValue(this.emailcc);
 
  });
  // this.ticketService.getGroupsccMails(value)
  // .subscribe((result:any) => {
  //   alert("after "+result);
  // });
//   this.ticketService.getGroupsccMails(value).subscribe(
//     {
//       next: (value) => {
//         alert(value);
// console.log("value of email cc",value);
// this.sendreply.get('emailCC')?.setValue("value");

//       },
//       error:(value:any)=>{
//         alert("error"+value);
//       }
//     });
}
top()
{
  this.replydiv = true;
  document.getElementById("content").scrollIntoView();
}
  send_reply() {
     this.toggleSource_align();

// alert(this.richTextField.nativeElement.textContent)
    this.progressbar=true;

//     if(this.emailTickets.mail_flag=='MTG')
//     {
//       alert("mtg");
// let payload={
//   id: this.emailTickets.id,
//   from_Address: this.emailTickets.from_Address,
//   to_Address:this.emailTickets.to_Address,
//   emailCC: this.emailTickets.emailCC,
//   subject: this.emailTickets.subject,
//   ticketNo: this.emailTickets.ticketNo,
//   mailBody: '',
//   status: this.emailTickets.status,
//   projectId: this.emailTickets.projectId,
//   url: this.sendreply.controls['url'].value
// };
// alert(JSON.stringify(payload));
// }else{
//   alert("none");
//   let payload={
//     id: this.emailTickets.id,
//     from_Address: this.emailTickets.to_Address,
//     to_Address:this.sendreply.controls['to_Address'].value,
//     emailCC: this.emailTickets.emailCC,
//     subject: this.emailTickets.subject,
//     ticketNo: this.emailTickets.ticketNo,
//     mailBody: '',
//     status: this.emailTickets.status,
//     projectId: this.emailTickets.projectId,
//     url: this.sendreply.controls['url'].value
//   }
//   alert(JSON.stringify(payload));
// }


    //this.messageService.add({severity:'success', summary: 'Suceess', detail: 'User Registered Successfully'});
    console.log("formsendvalue",this.sendreply.value);
  
    const strmailBody = this.sendreply.value.mailBody.replace(/(<p[^>]+?>|<p>|<\/p>)/img, " ");
    console.log("value od image",strmailBody);
     
   
    const finalarray=this.filesarray.concat(this.url_array);
    const unique = finalarray.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  });
  if(this.sendreply.value.to_Address===null ||this.sendreply.value.to_Address=="")
  {
    this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill the Mandatory Field To_Address' });
    this.progressbar=false;
  }else{
    console.log("remove duplicate",unique);
    const richTextFieldElement = this.richTextField.nativeElement;
    // richTextFieldElement.textContent = richTextFieldElement.innerHTML;
    var textContent = richTextFieldElement.textContent;

// Get the HTML content
var htmlContent = richTextFieldElement.innerHTML;


    // Loop through each table and add the desired styles
    // tables.forEach((table) => {
    //   table.style.borderCollapse = 'collapse';
    //   table.style.width = '100%';
    //   table.style.border = '1px solid #dddddd';

    //   // You can add more styles as needed
    // });
// Now you can use textContent or htmlContent as needed
console.log("Text Content:", textContent);
console.log("HTML Content:", htmlContent);
    //var richbox=richTextFieldElement.textContent ;
    let payload={
     id: this.sendreply.value.id,
     from_Address: this.sendreply.value.from_Address,
     to_Address:this.sendreply.value.to_Address,
     emailCC: this.sendreply.value.emailCC,
     subject: this.sendreply.value.subject,
     ticketNo:this.sendreply.value.ticketNo,
     mailBody:htmlContent,
     status: this.sendreply.value.status,
     projectId:this.sendreply.value.projectId,    
     url:' ',
     fileName: this.filesarray
    }
    console.log("payloadvalue",this.sendreply.value);
    console.log("payloadvalue files",this.filesarray);
     this.ticketService.replymail(payload).subscribe(
       {
 
         next: (value) => {
           console.log(value);
 
           if (value === null) {
             console.log("success");
             this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });
             this.progressbar=false;
             this.filename_history.length=0;
            this.url_array.length=0;
           }
           else {
             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Replied Successfully' });
             this.filename_history.length=0;
             this.richTextField.nativeElement.innerHTML="";
             this.filesarray.length=0;
             this.url_array.length=0;
             console.log("su2");
             this.uploadtxt=false;
             this.files.length=0;
             this.progressbar=false;
       
             this.replydiv=false;
             this.getticketbyID();
             this.getHistoryApi();
             this.statusdiv=false;
            // this.sendreply.reset();
             this.sendreply.get('to_Address')?.reset();
             //this.forwardreply.get('emailCC')?.reset();
             this.sendreply.get('url')?.reset();
             this.sendreply.get('mailBody')?.reset();
             // setTimeout(() => {
 
             //   window.location.reload();
 
             // }, 1000);
 
 
           }
         },
         error: (err: any) => {
           console.log( "richfield",this.richTextField.nativeElement.innerHTML);
           this.messageService.add({ severity: 'error', summary: 'Failure', detail: err.message })
           this.progressbar=false;
           this.filename_history.length=0;
           this.url_array.length=0;
           this.errorMessage = err.error.message;
           this.richTextField.nativeElement.innerHTML=""; 
           this.getHistoryApi();
           document.querySelector('div#richTextField').innerHTML = "";
                
           this.sendreply.get('mailBody')?.reset();
         
         }
       }
     )
  }
 
  }

  forward_reply() {
this.progressbar=true;
const strmailBody = this.forwardreply.value.mailBody.replace(/(<p[^>]+?>|<p>|<\/p>)/img, " ");

let payload={
 id: this.forwardreply.value.id,
 from_Address: this.forwardreply.value.from_Address,
 to_Address:this.forwardreply.value.to_Address,
 emailCC: this.forwardreply.value.emailCC,
 subject: this.forwardreply.value.subject,
 ticketNo:this.forwardreply.value.ticketNo,
 mailBody: strmailBody,
 status: this.forwardreply.value.status,
 projectId:this.forwardreply.value.projectId,    
 url:  ' ',
 fileName:this.filesarray
}
    //alert('sucess');
    //this.messageService.add({severity:'success', summary: 'Suceess', detail: 'User Registered Successfully'});
    this.ticketService.forwardmail(payload).subscribe(
      {

        next: (value) => {


          if (value === null) {
            console.log("success");
            this.messageService.add({ severity: 'error', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });
            this.progressbar=false;

          }
          else {
            console.log("su2");
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Forwarded Successfully' });
            this.progressbar=false;

         // this.forwardreply.reset();
         this.forwardreply.get('to_Address')?.reset();
         //this.forwardreply.get('emailCC')?.reset();
         this.forwardreply.get('url')?.reset();
         this.forwardreply.get('mailBody')?.reset();
         
            this.forwarddiv=false;
            this.files.length=0;
            this.filesarray.length=0;
            this.getHistoryApi();
            // setTimeout(() => {

            //   window.location.reload();

            // }, 1000);
          }
        },
        error: (err: any) => {
           this.progressbar=false;

          this.errorMessage = err.error.message;
          this.getHistoryApi();
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage })
        }
      }
    )
  }

  public showSpinner(): void {
    // this.spinnerService.show();

    setTimeout(() => {
      // this.spinnerService.hide();
    }, 5000); // 5 seconds
  }
  bccClicked() {
    this.bccdiv = true;
  }
  bccClear() {
    this.bccdiv = false;
  }
  ccClear() {
    this.ccdiv = false;
  }
  onBasicUpload(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded ',
    });
  }


  cancelReplyButton() {
    this.replydiv = false;
    this.pseudoReplyDiv = true;
    this.uploadtxt=false;
    // this.displaynote = false;
  }
  cancelAddnoteButton(){
    this.displaynote = false;
  }
 
  cancelForwardButton() {
    this.forwarddiv = false;
    this.pseudoReplyDiv = true;
  }
  editTicket() {
    this.editTicketSidebar = true;
  }


  saveErrors() {
    this.progressbar=true;
    this.roleService.createErrorCode(this.errorForm.value).subscribe({
      next: (value: any) => {
        this.progressbar=false;
        if (value === null) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Required',
            detail: 'Fill All Mandatory Fields',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Suceess',
            detail: 'Error Code Created Successfully',
          });
          this.TicketDialog=false
         // this.TicketDialog=false;
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        }
        
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: this.errorMessage,
        });
      },
    });
  }


  letters = '0123456789ABCDEF';
  color = '#';
  
  getRandomColor() {
    this.color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
        this.color += this.letters[Math.floor(Math.random() * 16)];
        console.log("color",this.color);
      
    }
    this.arrayrandom.push(this.color);
    console.log("color",this.arrayrandom);
      }
      showDialog()
      {
        this.visible_reply=true;
      }   
}
export default {
  selector: 'textarea',
  plugins: 'table image',
  toolbar: 'undo redo | formatselect | bold italic | table image',
  file_picker_types: 'image',
  file_picker_callback: (cb:any, value:any, meta:any) => {
    // Implement your custom file picker logic here
  },
};
// export class UploadAdapter {
//   private loader;
//   constructor(loader: any) {
//     this.loader = loader;
//     console.log(this.readThis(loader.file));
//   }

//   public upload(): Promise<any> {
//     //"data:image/png;base64,"+ btoa(binaryString)
//     return this.readThis(this.loader.file);
//   }

//   readThis(file: File | Blob): Promise<any> {
//     console.log(file);
//     let imagePromise: Promise<any> = new Promise(() => {
//       var myReader: FileReader = new FileReader();      
//       myReader.onloadend = (e) => {
//         // this.setState({file: myReader.result})
//         let image = myReader.result;
       
//         console.log('blob file', image);
        
//         return { default: 'data:image/png;base64,' + image };
//       };
//       myReader.readAsDataURL(file);
//     });
//     return imagePromise;
//   }
// }
