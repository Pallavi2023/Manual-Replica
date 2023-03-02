import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private api: ApiService, private router : Router, private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    let reqObj = {
      "userName": this.form.value.email
    }
    

    this.api.forgotpassword(reqObj).subscribe({
      next: (res) => {
        console.log(res);
        if(res){
          if(res.status === 's'){
            this.snackbar.open(res.description, '', { type: 'success' });
            this.router.navigate(['./login']);
          }else if(res.responseCode === 'EX_DI_406'){
            this.snackbar.open(res.description, '', { type: 'warning' })
            this.router.navigate(['./login']);
          }
          else {
            this.snackbar.open(res.description, '', { type: 'warning' })
          }
        }
      },
      error: (err) => {
        this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
      },
    })
  }

}
