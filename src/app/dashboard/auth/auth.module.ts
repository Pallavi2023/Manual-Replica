import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
//import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
//import { LoginbackgroundComponent } from './login/loginbackground/loginbackground.component';
import { ParticlesModule } from 'angular-particle';



@NgModule({
  declarations: [
    //ResetpasswordComponent,
    LoginComponent,
   // LoginbackgroundComponent,
   // ForgotpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    ParticlesModule
  ]
})
export class AuthModule { }