import { HttpClientModule } from '@angular/common/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule ,} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SnackbarService } from './snack-bar/snackbar.service';
import { WrapperComponent } from './dashboard/component/wrapper/wrapper.component';
import { MatMenuModule } from '@angular/material/menu';
// import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
//import { ProjectsComponent } from './component/projects/projects.component';




@NgModule({

  declarations: [
    AppComponent,
    WrapperComponent,
   // ProjectsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTooltipModule,
    HttpClientModule,
    MatSidenavModule,
    FormsModule,
    DashboardModule,
    MatListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
   NgxUiLoaderModule,
    MatCardModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    // MatChipsModule,
    MatToolbarModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
   // NgIdleKeepaliveModule.forRoot()

  ],
  providers: [SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
