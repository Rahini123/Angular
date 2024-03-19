import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

import { AgentService } from '../general/agentservice';

@Component({
  selector: 'app-newagent',
  templateUrl: './newagent.component.html',
  styleUrls: ['./newagent.component.scss'],
  providers: [MessageService, AgentService],
})
export class NewagentComponent implements OnInit {
  selectedAgent: string = 'Ocassional';
  agentForm!: FormGroup;
  isCustomUpload: boolean = true;
  filteredManager: any;
  uploadedFiles: any[] = [];
  text1: string | undefined;
  text2: string | undefined;
  timeZone: any;
  language: any;
  level: any;
  timeFormat: any;
  cascadeSelectCountries: any;
  manager: any;
  groups: any = [];
  roles: any;
  groupsdropDown: any;
  rolesObj: any;
  errors: any;
  lang: any;
  timeformat: any;

  constructor(private messageService: MessageService,
    private agentService: AgentService,
 
    private fb: FormBuilder,) { }



  ngOnInit(): void {
    // this.ticketService.getTickets().then((data) => {
    //   (this.groups = data),
    //   this.groupsdropDown = this.groups.subject;
    // });
    // console.log(this.groupsdropDown);

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
        code: 'EN',
      },
      { language: 'English', code: 'EN' },
      { language: 'English', code: 'EN' },
    ];

    this.level = [
      {
        level: 'Beginner',
        code: 'EN',
      },
      { level: 'Intermediate', code: 'EN' },
      { level: 'Guru', code: 'EN' },
    ];

    this.timeFormat = [
      {
        Format: '12-hour',
        code: 'EN',
      },
      { Format: '24-hour', code: 'EN' },
    ];

    this.cascadeSelectCountries = [
      {
        name: 'Australia',
        code: 'AU',
        states: [
          {
            name: 'New South Wales',
            cities: [
              { cname: 'Sydney', code: 'A-SY' },
              { cname: 'Newcastle', code: 'A-NE' },
              { cname: 'Wollongong', code: 'A-WO' },
            ],
          },
          {
            name: 'Queensland',
            cities: [
              { cname: 'Brisbane', code: 'A-BR' },
              { cname: 'Townsville', code: 'A-TO' },
            ],
          },
        ],
      },
      {
        name: 'Canada',
        code: 'CA',
        states: [
          {
            name: 'Quebec',
            cities: [
              { cname: 'Montreal', code: 'C-MO' },
              { cname: 'Quebec City', code: 'C-QU' },
            ],
          },
          {
            name: 'Ontario',
            cities: [
              { cname: 'Ottawa', code: 'C-OT' },
              { cname: 'Toronto', code: 'C-TO' },
            ],
          },
        ],
      },
      {
        name: 'United States',
        code: 'US',
        states: [
          {
            name: 'California',
            cities: [
              { cname: 'Los Angeles', code: 'US-LA' },
              { cname: 'San Diego', code: 'US-SD' },
              { cname: 'San Francisco', code: 'US-SF' },
            ],
          },
          {
            name: 'Florida',
            cities: [
              { cname: 'Jacksonville', code: 'US-JA' },
              { cname: 'Miami', code: 'US-MI' },
              { cname: 'Tampa', code: 'US-TA' },
              { cname: 'Orlando', code: 'US-OR' },
            ],
          },
          {
            name: 'Texas',
            cities: [
              { cname: 'Austin', code: 'US-AU' },
              { cname: 'Dallas', code: 'US-DA' },
              { cname: 'Houston', code: 'US-HO' },
            ],
          },
        ],
      },
    ];
    this.manager = [
      { name: 'Thangamani', code: 'M' },
      { name: 'Mohan', code: 'M' },
      { name: 'Aathirai', code: 'M' },
      { name: 'Mugunthan', code: 'M' },
    ];

    // this.groupsdropDown = [
    //   { group: 'ATA-FICO', code: 'M' },
    //   { group: 'ATA -PP', code: 'M' },
    //   { group: 'Change Team', code: 'M' },
    //   { group: 'ATA SD', code: 'M' },
    // ];
    this.level = [
      { level: 'Beginner' },
      { level: 'Intermediate' },
      // { name: 'Requester', code: 'LDN' },
    ];
    this.timeformat = [
      { timeformat: '12' },
      { timeformat: '24' }
    ];
    this.lang = [
      { lang: 'Afrikaans' },
      { lang: 'Albanian' },
      { lang: 'Arabic' },
      { lang: 'Armenian' },
      { lang: 'Basque' },
      { lang: 'Bengali' },
      { lang: 'Catalan' },
      { lang: 'Cambodian' },
      { lang: 'Chinese (Mandarin)' },
      { lang: 'Croatian' },
      { lang: 'Czech' },
      { lang: 'Danish' },
      { lang: 'Dutch' },
      { lang: 'English' },
      { lang: 'Estonian' },
      { lang: 'Fiji' },
      { lang: 'Finnish' },
      { lang: 'French' },
      { lang: 'Georgian' },
      { lang: 'German' },
      { lang: 'Greek' },
      { lang: 'Gujarati' },
      { lang: 'Hebrew' },
      { lang: 'Hindi' },
      { lang: 'Hungarian' },
      { lang: 'Icelandic' },
      { lang: 'Indonesian' },
      { lang: 'Irish' },
      { lang: 'Italian' },
      { lang: 'Japanese' },
      { lang: 'Javanese' },
      { lang: 'Korean' },
      { lang: 'Latin' },
      { lang: 'Latvian' },
      { lang: 'Lithuanian' },
      { lang: 'Macedonian' },
      { lang: 'Malay' },
      { lang: 'Malayalam' },
      { lang: 'Maltese' },
      { lang: 'Maori' },
      { lang: 'Marathi' },
      { lang: 'Mongolian' },
      { lang: 'Nepali' },
      { lang: 'Norwegian' },
      { lang: 'Persian' },
      { lang: 'Polish' },
      { lang: 'Portuguese' },
      { lang: 'Punjabi' },
      { lang: 'Quechua' },
      { lang: 'Romanian' },
      { lang: 'Russian' },
      { lang: 'Samoan' },
      { lang: 'Serbian' },
      { lang: 'Slovak' },
      { lang: 'Slovenian' },
      { lang: 'Spanish' },
      { lang: 'Swahili' },
      { lang: 'Swedish ' },
      { lang: 'Tamil ' },
      { lang: 'Telugu ' },
      { lang: 'Thai ' },
      { lang: 'Tibetan ' },
      { lang: 'Tonga ' },
      { lang: 'Turkish ' },
      { lang: 'Ukrainian ' },
      { lang: 'Urdu ' },
      { lang: 'Uzbek ' },
      { lang: 'Welsh ' },
      { lang: 'Xhosa ' },



    ];
    this.rolesObj = [
      { name: '18000185616', label: 'Account Admin' },
      { name: '18000185617', label: 'Admin' },
      { name: '18000185618', label: 'SD Supervisor' },
      { name: '18000185619', label: 'SD Agent' },
      { name: '18000185620', label: 'Problem Manager' },
      { name: '18000185621', label: 'Change Manager' },
      { name: '18000185622', label: 'Release Manager' },
      { name: '18000185623', label: 'Configuration Manager' },
      { name: '18000185624', label: 'Contract Manager' },
      { name: '18000185625', label: 'IT Ops Agent' },
      { name: '18000185626', label: 'Project Manager' },
      { name: '18000185627', label: 'Project Member' },
      { name: '18000185628', label: 'Procurement Manager' },
    ];

    this.agentForm = this.fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'title': new FormControl('', [Validators.required]),
      'mobileNumber': new FormControl('', Validators.required),
      'agentName': new FormControl('', Validators.required),

    });
  }

  // groupDrop()
  // {
  //   this.agentService.getGroupDrop().subscribe(
  //     data =>{
  //       this.groupsdropDown.push(data);
  //       console.log(this.groupsdropDown);
  //     }
  //   )
  // }

  onUpload(e: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  searchManager(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.manager.length; i++) {
      let manager = this.manager[i];
      if (manager.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(manager);
      }
    }

    this.filteredManager = filtered;
  }

  errorMessage: any;

  saveAgents() {

    this.agentService.createAgents(this.agentForm.value)
      .subscribe(
        {
          next: (res) => {

            if(res != ''){

            this.messageService.add(
              {
                severity: "success", summary: "Created", detail: "Agent Creation Successfully"
              })
             setTimeout(() => {
              window.location.reload();
             }, 1000);
            }
            else {
              this.messageService.add(
                {
                  severity: "error", summary: "Mandatory", detail: "Fill Mandatory Filed"
                })
                window.location.reload();
            }

          },
          error: (err: any) => {
            this.messageService.add(
              {
                severity: "warn", summary: "Inavlid", detail: "Agent Creation Failed"
              })
          }
        })
  }
  addMultipleRoles() {
    if (this.roles) {
      this.roles.push(this.roles);
    } else {
      this.roles = [{}];
    }
  }

  deleteGroup() {
    this.groups.pop();
  }

  deleteRole() {
    this.roles.pop();
  }
}
