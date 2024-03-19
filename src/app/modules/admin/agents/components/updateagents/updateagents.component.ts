import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AgentService } from '../general/agentservice';
import { NewagentComponent } from '../newagent/newagent.component';

@Component({
  selector: 'app-updateagents',
  templateUrl: './updateagents.component.html',
  styleUrls: ['./updateagents.component.scss'],
  providers: [AgentService, MessageService]
})
export class UpdateagentsComponent implements OnInit {
  agentForm: FormGroup;
  errorMessage: any;

  timeFormat: any;
  timeZone: any;
  language: any;
  level: any;
  value5: string = 'Disabled';
  disable : string;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private agentService: AgentService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.agentForm = this.fb.group(
      {
        agent_id: '',
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        phoneNumber: '',
        mobileNumber: '',
        address: '',
        timeformat: '',
        language: '',
        level: ''
      });

    const res = this.router.snapshot.params['agent_id'];

    this.agentService.getAgentById(res)
      .subscribe((result) => {
        this.agentForm = this.fb.group(
          {
            agent_id: new FormControl(result['agent_id']),
            firstName: new FormControl(result['firstName']),
            lastName: new FormControl(result['lastName']),
            email: new FormControl(result['email']),
            title: new FormControl(result['title']),
            phoneNumber: new FormControl(result['phoneNumber']),         
            mobileNumber: new FormControl(result['mobileNumber']),
            address: new FormControl(result['address']),
            timeformat: new FormControl(result['timeformat']),
            language: new FormControl(result['language']),
            level: new FormControl(result['level']),
          }
        )
      })

    // this.timeFormat = this.createOrUpdateAgents.timeFormat;

    // this.timeZone = this.createOrUpdateAgents.timeZone;

    // this.language = this.createOrUpdateAgents.language;

    // this.level = this.createOrUpdateAgents.level;
  }

  // createOrUpdateAgents: any = new NewagentComponent(this.messageService, this.fb, this.agentService);


  updateAgents() {
    this.agentService.createAgents(this.agentForm.value).subscribe(
      {
        next: (value) => {
          if (value === null || '') {
            this.messageService.add({ severity: 'warn', summary: 'Invalid', detail: 'Fill All Mandatory Fields' });
          }
          else {

            this.messageService.add({ severity: 'success', summary: 'Suceess', detail: 'Agents Created Successfully' });
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: this.errorMessage });
        }
      }
    )
  }

}
