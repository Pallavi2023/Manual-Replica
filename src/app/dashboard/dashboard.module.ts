import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
//import { WrapperComponent } from './component/wrapper/wrapper.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';
import { RoleComponent } from './component/role/role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProjectComponent } from './component/project/project.component';



@NgModule({
  declarations: [
    
    HomeComponent,
    UserComponent,
    RoleComponent,
    ProjectComponent,
  //CreateEditProjectComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
   MatChipsModule,
    MatIconModule,
    //MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatExpansionModule,
    FormsModule,
    MatDatepickerModule,
    //MatDatepickerBase,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatAutocompleteModule,
    //MatSelectFilterModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatSnackBarModule,
  ]
})
export class DashboardModule { }
