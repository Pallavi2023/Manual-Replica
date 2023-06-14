import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import {particles} from 'src/app/dashboard/auth/login/particleConfig/particleConfig.json';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticatedUser = { userName: '', password: '' };
  jwtToken: any;
  permissions: any;
  showPassword = true;
  name: any;
  // isCall = false;
  myParams: object = {};
  paramss: object = {};

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  submit() {
    // this.isCall = true;
    if (this.form.value.username.length && this.form.value.password.length) {
      this.authenticatedUser.userName = this.form.value.username
      // this.authenticatedUser.password = this.form.value.password

      this.authenticatedUser.password = this.authService.getHash(this.form.value.password)


      this.authService.loginUser(this.authenticatedUser).subscribe((data) => {
        if (data) {

          this.jwtToken = data.detail.token;
          this.name = data.detail.name;
          localStorage.setItem('token', this.jwtToken);
         
          const currentDate = new Date();
          localStorage.setItem('date', currentDate.toISOString()); 
          //localStorage.setItem('date', this.date.toISOString());
          if(this.authenticatedUser.userName !="platform-admin@neutrinotechsystems.com") localStorage.setItem('empId', data.detail.empId)
          localStorage.setItem('name', this.name)
          localStorage.setItem('_UI', this.form.value.username);          
          if (data.detail != null && data.detail.permissions != undefined && data.detail.permissions[0] != null) {
            // this.isCall = false;
            this.permissions = data.detail.permissions;
            localStorage.setItem('permissions', JSON.stringify(this.permissions));
            this.router.navigate(['./wrapper/home'])
          }
          else if (data.detail.systemPasswordResetStatus === "pending") {
            this.router.navigate(['./confirm-password'], { queryParams: { userEmail: this.form.get('username')?.value } });

          }
          else {
            // this.isCall = false;
            this.permissions = ['USER_DONT_HAVE_ANY_PERMISSIONS'];
            localStorage.setItem('permissions', JSON.stringify(this.permissions));
            this.router.navigate(['./wrapper/permissionRestricted'])
          }
        }
      },
        (err) => {
          // this.isCall = false;
          this.snackbar.open('Please check the username or password.', '', { type: 'warning' });
        }
      )
    }
  }

  constructor(private router: Router, private authService: AuthService, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.paramss = JSON.parse(JSON.stringify(particles));

    this.myParams = {

      particles: this.paramss

    };
   
    localStorage.removeItem('token');
    localStorage.removeItem('ng2Idle.main.idling');
    localStorage.removeItem('ng2Idle.main.expiry');
    localStorage.removeItem('theme');
    localStorage.removeItem('userProjects');     
    localStorage.removeItem('pdfjs.history');
    localStorage.removeItem('selectedProject');
    localStorage.removeItem('project');
    localStorage.removeItem('__UI');
    localStorage.removeItem('_UI');
    localStorage.removeItem('name');
    localStorage.removeItem('permissions');
    this.router.navigate(['./login'])
  }

}