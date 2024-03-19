import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { TicketdashboardComponent } from './modules/ticketdashboard/ticketdashboard.component';
import { TickethistoryComponent } from './modules/tickets/tickethistory/tickethistory.component';
import { ForgotPasswordComponent } from './layouts/auth/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './layouts/auth/auth.guard';
import { ChangePasswordComponent } from './layouts/auth/change-password/change-password.component';
import { LoginComponent } from './layouts/auth/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page/landing-page.component';
import { AdminComponent } from './modules/admin/admin.component';
import { GeneralComponent } from './modules/admin/agents/components/general/general.component';
import { EmailsettingsComponent } from './modules/admin/emailsettings/emailsettings.component';
import { GroupsComponent } from './modules/admin/groups/components/groups/groups.component';
import { RolesComponent } from './modules/admin/roles/components/roles/roles.component';
import { ClientComponent } from './modules/client/client.component';
import { DashboarditemComponent } from './modules/dashboarditem/dashboarditem.component';

import { ErrorComponent } from './modules/error/error.component';
import { ErrorcodeComponent } from './modules/errorcode/errorcode.component';

import { ProjectComponent } from './modules/project/project.component';
import { ReportsComponent } from './modules/reports/reports/reports.component';
import { RequestergeneralComponent } from './modules/requesters/components/general/requestergeneral.component';
import { TicketDetailComponent } from './modules/tickets/components/ticket-detail/ticket-detail.component';
import { TicketComponent } from './modules/tickets/components/ticket/ticket.component';
import { UserComponent } from './modules/usermanagement/components/user/user.component';
import { SlapolicyComponent } from './modules/admin/slapolicy/slapolicy.component';
import { FormbuilderComponent } from './modules/admin/formbuilder/formbuilder.component';
import { AdvisoryComponent } from './modules/admin/advisory/advisory.component';
import { SladashboardComponent } from './modules/admin/slapolicy/sladashboard/sladashboard.component';
import { SlaincidentComponent } from './modules/admin/slapolicy/sladashboard/slaincident/slaincident.component';
import { WorkflowComponent } from './modules/admin/workflow/workflow.component';
import { SchedulesComponent } from './modules/schedules/schedules.component';
import { ImportComponent } from './modules/admin/agents/components/import/import.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ForgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'importcomponent',
    component: ImportComponent,
  },
  
  {
    path: 'auth',
    children: [
      {
        path: 'forgetPassword/resetPwd/:token',
        component: ChangePasswordComponent,

      }

    ],

  },

  // {
  //   path : 'admin',
  //   component : DefaultComponent,
  //   children : [
  //     {
  //       path : 'roles',
  //       component : RolesComponent,
  //       pathMatch : 'full',
  //       canActivate : [AuthGuard],
  //     },
  //     {
  //       path : 'agents',
  //       component : GeneralComponent,
  //       pathMatch : 'full',
  //       canActivate : [AuthGuard],
  //     },
  //      {
  //       path : 'groups',
  //       component : GroupsComponent,
  //       pathMatch : 'full',
  //       canActivate : [AuthGuard],
  //     },
  //     {
  //       path : 'requester',
  //       component : RequestergeneralComponent,
  //       pathMatch : 'full',
  //       canActivate : [AuthGuard],
  //     },


  //   ]
  //   },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'formbuilder',
        component: FormbuilderComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboarditem',
        component: DashboarditemComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'ticketdashboard/:id/:status/:groupid',
        component: TicketdashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'ticketdashboard/:id/:groupName',
      //   component: TicketdashboardComponent,
      //   pathMatch: 'full',
      //   canActivate: [AuthGuard],
      // },
      {
        path: 'ticketdashboard/:id',
        component: TicketdashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'ticketdashboard/:id/:status',
        component: TicketdashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
     
      {
        path: 'mergeticket/:id/:closedticket',
        component: TicketDetailComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'tickets',
        component: TicketComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'Advisory',
        component: AdvisoryComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'tickets/:id',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: TicketDetailComponent,
      },
      {

        path: 'ticketshistory/:id',

        pathMatch: 'full',

        canActivate: [AuthGuard],

        component: TickethistoryComponent,

      },

      {
        path: 'projects',
        component: ProjectComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'sladashboard',
        component: SladashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'workflow',
        component: WorkflowComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'slaincident',
        component: SlaincidentComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'slapolicy',
        component: SlapolicyComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'errorcode',
        component: ErrorcodeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'usermanagement',
        component: UserComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'clients',
        component: ClientComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {

        path: 'reports',

        component: ReportsComponent,

        pathMatch: 'full',

        canActivate: [AuthGuard],

      },
      {

        path: 'admin/Schedules',

        component:SchedulesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],

      },
      {
        path: 'admin',
        component: AdminComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/roles',
        component: RolesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/agents',
        component: GeneralComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/groups',
        component: GroupsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'emailsetting',
        component: EmailsettingsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/requester',
        component: RequestergeneralComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ]
  },

  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
