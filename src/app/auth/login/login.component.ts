import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authenticatedUser = { userName: '', password: ''};
  jwtToken: any;
  permissions: any;
  showPassword = true;
  name : any;
  // isCall = false;

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
          localStorage.setItem('name',this.name)
          localStorage.setItem('_UI',this.form.value.username);
          if (data.detail != null && data.detail.permissions != undefined && data.detail.permissions[0] != null) {
            // this.isCall = false;
            this.permissions = data.detail.permissions;
            localStorage.setItem('permissions', JSON.stringify(this.permissions));
            this.router.navigate(['./wrapper/home'])
          } 
          else if(data.detail.systemPasswordResetStatus === "pending" ) {
            this.router.navigate(['./confirm-password'],{ queryParams: { userEmail:this.form.get('username')?.value }}); 
                 
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
  }
  
}
