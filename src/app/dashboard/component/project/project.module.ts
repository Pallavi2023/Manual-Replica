
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { ProjectRoutingModule } from './project-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core'
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule} from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [CreateEditProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    CommonModule,
    ProjectRoutingModule,
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatAutocompleteModule
  ]
})
export class ProjectModule { }
