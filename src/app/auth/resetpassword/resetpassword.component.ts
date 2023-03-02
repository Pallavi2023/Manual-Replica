import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/dashboard/components/user/api.service';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { AuthService } from '../login/auth.service';
import { PasswordValidator } from '../password.validator';
import { ResetService } from './reset.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  token: any;
  userId: any = null;
  showCredentialForm: boolean = false;
  errorMessage: any = null;

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required , PasswordValidator.strong]),
    confirmpassword: new FormControl('', [Validators.required, PasswordValidator.strong]),
  });
  email: any;
  constructor(private router: Router, private route: ActivatedRoute, private api: ResetService, private authService : AuthService, private ApiService: ApiService, private snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    // let userInfo =  this.ApiService.getUser();
    
    this.route.queryParamMap.subscribe(data=>{
      // console.log(data);
      this.userId=data.get("userName");
      console.log(this.userId);
      
      this.email=data.get("userEmail");
    })


    
    if(this.token){
      this.api.getUserCredential(this.token).subscribe({
        next: (res) => {
          console.log(res);
          
        }
      })
      
    }
    // else if(userInfo && userInfo) {
    //   this.userId = userInfo;
    //   this.showCredentialForm = true; 
    // }
  }

  validatePassword() {
    if (!this.form.value.password) {
      this.snackbar.open('Password cannot be empty', '', { type: 'warning' });
      return false;
    }
    if (!this.form.value.confirmpassword) {
      this.snackbar.open('Confirm Password cannot be empty', '', {
        type: 'warning',
      });
      return false;
    }
    if (this.form.value.password != this.form.value.confirmpassword) {
      this.snackbar.open('Passwords do not match !', '', { type: 'warning' });
      return false;
    }
    return true;
  }

  onSubmit() {
    if (this.validatePassword()) {
      let reqObj = {
        "userName": this.email ? this.email : this.userId,
        "password": this.authService.getHash(this.form.value.confirmpassword)
      };
      this.api.confirmPassword(reqObj).subscribe({
        next: (res) => {
          if (res) {
            if(res.status === 'S') {
              this.snackbar.open(res.description, '', {type: 'success'});
              this.router.navigate(['./login']);
            } else {
              this.snackbar.open(res.description, '', { type: 'warning' })
            }
          } 
        },
        error: () => {
          this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
        },
      });
    }
  }
}
