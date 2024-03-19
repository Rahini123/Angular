import { NgModule } from '@angular/core';
import {ImageModule} from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { InputTextModule } from 'primeng/inputtext';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { BadgeModule } from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PasswordModule} from 'primeng/password';
@NgModule(
    {
        declarations : [
    HeaderComponent,
    SidebarComponent
  ],
        imports : [
            MatSidenavModule,
            ImageModule,
            MatIconModule,
            MatMenuModule,
            MatListModule,
            MatToolbarModule,
            MatSliderModule,
            SidebarModule,
            InputTextModule,
            ButtonModule,
            MenubarModule,
            PanelMenuModule,
            FormsModule,
            MenuModule,
            ConfirmDialogModule,
            DockModule,
            TabMenuModule,
            NgDynamicBreadcrumbModule,
            TooltipModule,
            BadgeModule,
            BreadcrumbModule,
            SplitButtonModule,
            PasswordModule
            
        ],
        providers : [],
        exports : [
            HeaderComponent,
            SidebarComponent
        ]
    })

export class SharedModule {}