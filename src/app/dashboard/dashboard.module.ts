import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { UserComponent } from './components/user/user.component';
//import { ProjectComponent } from './components/project/project.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

//import { OperatorComponent } from './components/operator/operator.component';
//import { AuditComponent } from './components/audit/audit.component';
import { RoleComponent } from './components/role/role.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
//import { MatSelectFilterModule } from 'mat-select-filter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessiontimeoutComponent } from './components/sessiontimeout/sessiontimeout.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    WrapperComponent,
    UserComponent,
    //ProjectComponent,
    //OperatorComponent,
    //AuditComponent,
    RoleComponent,
    HomeComponent,
    SessiontimeoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    //MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatAutocompleteModule,
   // MatSelectFilterModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatSnackBarModule,
    NgCircleProgressModule.forRoot({
      // radius: 100,
      // outerStrokeWidth: 10,
      // space:-10,
      // innerStrokeWidth: 8,
      // toFixed:2,
      // outerStrokeColor: "#78C000",
      // innerStrokeColor: "#C7E596",
      // animationDuration: 300,
      // showSubtitle: false,
    })
  ]
})
export class DashboardModule { }
