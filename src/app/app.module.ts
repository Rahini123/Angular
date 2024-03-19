import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReportsComponent } from './modules/reports/reports/reports.component';
import { SharedModule } from './shared/shared.module';
import { DefaultComponent } from './layouts/default/default.component';
import {EditorModule} from 'primeng/editor';
// import { EditorModule } from '@progress/kendo-angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { ErrorComponent } from './modules/error/error.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './layouts/auth/login/login.component';
import { AuthService } from './layouts/auth/login/services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MainInterceptor } from './interceptor/main.interceptor';
import { BreadcrumbModule } from "primeng/breadcrumb";

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BnNgIdleService } from 'bn-ng-idle';
import { ImageModule } from 'primeng/image';
import { CheckboxModule } from 'primeng/checkbox';
import { DashboarditemComponent } from './modules/dashboarditem/dashboarditem.component';
import { ProjectComponent } from './modules/project/project.component';
import { ProjectdashboardComponent } from './modules/project/projectdashboard/projectdashboard.component';

import { InputSwitchModule } from 'primeng/inputswitch';
import { NewErrorCodeComponend } from './modules/errorcode/newerror/newerror.component';
import { ErrordashboardComponent } from './modules/errorcode/errordashboard/errordashboard.component';
import { ErrorcodeComponent } from './modules/errorcode/errorcode.component';
import { UsersComponent } from './modules/usermanagement/users/users.component';
import { UserComponent } from './modules/usermanagement/components/user/user.component';

import { ClientdashboardComponent } from './modules/client/clientdashboard/clientdashboard.component';

import { ClientComponent } from './modules/client/client.component';
import { AdminComponent } from './modules/admin/admin.component';
import { RippleModule } from 'primeng/ripple';
import { RolesdashboardComponent } from './modules/admin/roles/components/rolesdashboard/rolesdashboard.component';
import { RolesComponent } from './modules/admin/roles/components/roles/roles.component';
import { UpdaterolesComponent } from './modules/admin/roles/components/roles/updateroles/updateroles.component';
import { NewroleComponent } from './modules/admin/roles/components/newrole/newrole.component';
import { AgentdashboardComponent } from './modules/admin/agents/components/agentdashboard/agentdashboard.component';
import { GeneralComponent } from './modules/admin/agents/components/general/general.component';
import { ImportComponent } from './modules/admin/agents/components/import/import.component';
import { NewagentComponent } from './modules/admin/agents/components/newagent/newagent.component';
import { GroupDashboardComponent } from './modules/admin/groups/components/group-dashboard/group-dashboard.component';
import { GroupsComponent } from './modules/admin/groups/components/groups/groups.component';
import { NewGroupsComponent } from './modules/admin/groups/components/new-groups/new-groups.component';
import { TicketComponent } from './modules/tickets/components/ticket/ticket.component';
import { TicketDetailComponent } from './modules/tickets/components/ticket-detail/ticket-detail.component';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { ScrollTopModule } from 'primeng/scrolltop';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RequestergeneralComponent } from './modules/requesters/components/general/requestergeneral.component';
import { NewrequesterComponent } from './modules/requesters/components/newrequesters/newrequester.component';
import { RequesterdetailComponent } from './modules/requesters/components/requesterdetail/requesterdetail.component';
import { DividerModule } from 'primeng/divider';
import {InputNumberModule} from 'primeng/inputnumber';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { ChangePasswordComponent } from './layouts/auth/change-password/change-password.component';
import { LandingPageComponent } from './layouts/landing-page/landing-page/landing-page.component';
import { EmailsettingsComponent } from './modules/admin/emailsettings/emailsettings.component';
import {ChartModule} from 'primeng/chart';
import { ForgotPasswordComponent } from './layouts/auth/forgot-password/forgot-password.component';
import { TickethistoryComponent } from './modules/tickets/tickethistory/tickethistory.component';
import { TicketdashboardComponent } from './modules/ticketdashboard/ticketdashboard.component';
import { SlapolicyComponent } from './modules/admin/slapolicy/slapolicy.component';
import { FormbuilderComponent } from './modules/admin/formbuilder/formbuilder.component';
                                                   
import { Store, StoreModule } from '@ngrx/store';
import { AdvisoryComponent } from './modules/admin/advisory/advisory.component';
import { TicketapprovalComponent } from './ticketapproval/ticketapproval.component';
import { ExtraOptions } from '@angular/router';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SladashboardComponent } from './modules/admin/slapolicy/sladashboard/sladashboard.component';
import { SlaincidentComponent } from './modules/admin/slapolicy/sladashboard/slaincident/slaincident.component';
import { WorkflowComponent } from './modules/admin/workflow/workflow.component';
import { SchedulesComponent } from './modules/schedules/schedules.component';

export function clearState( reducer: (arg0: any, arg1: { type: string }) => any) { return function (state: any, action: { type: string }) {if (action.type === 'logout') {state = undefined; } return reducer(state, action); };}


const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled"
  //scrollPositionRestoration: "enabled"
};

@NgModule({
  exports: [MatSidenavModule],
  declarations: [
    AppComponent,
    ReportsComponent,
    DefaultComponent,
     LandingPageComponent,
    DashboarditemComponent,
    ProjectComponent,
    ProjectdashboardComponent,
  
    AgentdashboardComponent,
    ErrorComponent,
    LoginComponent,  
    NewErrorCodeComponend,
    ErrordashboardComponent,
    ErrorcodeComponent,
    UsersComponent,
    UserComponent,
  
    ClientdashboardComponent,
    ClientComponent,
    AdminComponent,
    RolesdashboardComponent,
    RolesComponent,
    UpdaterolesComponent,
    NewroleComponent,   
    GeneralComponent,
    ImportComponent,
    NewagentComponent,
    ImportComponent,
    NewGroupsComponent,
    GroupsComponent,   
    GroupDashboardComponent,
    TicketComponent,
    TicketDetailComponent,
    RequestergeneralComponent,
    NewrequesterComponent,
    RequesterdetailComponent,
    ChangePasswordComponent,
    EmailsettingsComponent,
    ForgotPasswordComponent,
    TickethistoryComponent,
    TicketdashboardComponent,
    DashboardComponent,
    SlapolicyComponent,
    FormbuilderComponent,
    AdvisoryComponent,
    TicketapprovalComponent,
    SladashboardComponent,
    SlaincidentComponent,
    WorkflowComponent,
    SchedulesComponent,
    ImportComponent,
  

  ],
  imports: [
    ScrollPanelModule,
    MatProgressSpinnerModule,
    ChartModule,
    MatSlideToggleModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    SplitButtonModule,
    PasswordModule,
    EditorModule,
    InputNumberModule,
    RadioButtonModule,
    PanelMenuModule,
    AccordionModule,
    InputSwitchModule,
    ScrollTopModule,
    BreadcrumbModule,
    ImageModule,
    RippleModule,
    FileUploadModule,
    SidebarModule ,
    DividerModule,
    CheckboxModule,
    MatSidenavModule,
    PanelModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ButtonModule,
    MatButtonModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    CardModule,
    HttpClientModule,
    ToastModule,
    MultiSelectModule,
    TableModule,
    OverlayPanelModule,
    TabViewModule,
    ListboxModule,

    ButtonModule,
    MenuModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  
    DialogModule,
    FieldsetModule,

    StoreModule.forRoot({}, { metaReducers: [clearState] })

  ],
  
  providers: [MessageService, DatePipe,
    AuthService,
    JwtHelperService,
    BnNgIdleService,
    

    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,

      useClass: MainInterceptor,

      multi: true,

    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
