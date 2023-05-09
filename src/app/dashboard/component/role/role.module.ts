import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { CreateEditRoleComponent } from './create-edit-role/create-edit-role.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon'
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule} from '@angular/material/menu';
import { DashboardModule } from '../../dashboard.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [CreateEditRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    DashboardModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoleModule { }
