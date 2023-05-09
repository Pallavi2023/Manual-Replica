import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  data: any;
  isEdit = false;
  empID: any;
  //isFieldDisabled = false;
  isFieldDisabled: boolean = true;


  isCall = false;
  isCreateUserOperation: boolean;
  assignedProjects: any = [];
  docStructureIconMap = {
    'Structured': 'crop',
    'Semi-Structured': 'list_alt',
    'Free-Form': 'gesture',
    'Medical Chart': 'assignment_ind'
  }
  rolesAndPermission: any;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private routes: ActivatedRoute,
    private snackbar: SnackbarService

  ) {

    this.isCreateUserOperation = this.routes.snapshot.params['id'] ? true : false;

  }


  ngOnInit(): void {
    // this.data = JSON.parse(localStorage.getItem('row')!);
    // this.isEdit = JSON.parse(localStorage.getItem('isEdit')!);
    // const empId = this.routes.snapshot.params['id'];
    if (this.isCreateUserOperation) {

      this.isEdit = true;
      this.empID = this.routes.snapshot.params['id'];

      this.getUserByID(this.empID);

    }
    this.userForm = this.formBuilder.group({
      id: "",
      empId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: this.isCreateUserOperation }, [Validators.required]),
      status: [true],
      //workingFor: new FormControl('')
    });

  }
  getUserByID(id: any) {
    
    this.api.getUserById(id).subscribe({
      next: (res) => {

        if (res) {
          
          // if (res && res.detail && res.detail.assignedProjects && Array.isArray(res.detail.assignedProjects)) {
          //   this.assignedProjects = [ ...res.detail.assignedProjects ];
          // } else {
          //   this.assignedProjects = [];
          // }
          this.userForm.patchValue({
            id: res.detail.id,
            empId: res.detail.empId,
            name: res.detail.name,
            email: res.detail.email,
            status: res.detail.status == 'enabled' ? true : false,
            // workingFor: res.detail.workingFor,
          });
          
        }

      },
      error: (err) => {

        alert("Something went wrong.")
        this.router.navigate(['./wrapper/permissionRestricted']);

      },
    });
  }

  addUser() {
    if (this.userForm.invalid) {
      const controls = this.userForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.userForm.get(name)?.markAsTouched();
        }
      }
    }

    if (this.userForm.valid) {
      this.isCall = true;
      let data = {

        empId: this.userForm.get('empId')?.value,
        name: this.userForm.get('name')?.value,
        email: this.userForm.get('email')?.value,
        status: this.userForm.get('status')?.value == true ? 'enabled' : 'disabled',
        // workingFor: this.userForm.get('workingFor')?.value,
      };
      // this.router.navigate(['/wrapper/user']);
      this.api.postUser(data).subscribe({
        next: (res) => {
          // if (res) {
          //   this.isCall = false;
          //   this.snackbar.open("Record added successfully", '', { type: 'success' })
          //   this.userForm.reset();
          //   this.router.navigate(['/wrapper/user']);
          // }
          // else {
          //   this.isCall = true;
          //   this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
          //   this.router.navigate(['/wrapper/user']);
          // }
          if(res) {
            // this.snackbar.open(`Project Successfully ${this.isCreateProjectOperation ? 'Created' : 'Updated'}`, '', { type: 'success' });
          //  this.snackbar.open(res.description, '', { type: 'success' });
            if(res.status === 'S') {
              this.isCall = false;
              this.snackbar.open("Record created successfully.", '', { type: 'success' })
              this.userForm.reset();
              this.router.navigate(['/wrapper/user']);
            } else if(res.status === 'E' && res.description) {
              this.snackbar.open(res.description, '', { type: 'warning' });
            }
          }
        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
          this.router.navigate(['/wrapper/user']);
        },
      });
    }
  }

  updateUser() {
    if (this.userForm.invalid) {
      const controls = this.userForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.userForm.get(name)?.markAsTouched();
        }
      }
    }
    let data = {
      id: this.userForm.get('id')?.value,
      empId: this.userForm.get('empId')?.value,
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      status: this.userForm.get('status')?.value == true ? "enabled" : "disabled",
      //workingFor: this.userForm.get('workingFor')?.value,

    }
    this.isFieldDisabled = true,
      this.isCall = true;
    if (this.userForm.valid) {
      this.api.putUser(data).subscribe({


        next: (res) => {
          if (res && res.detail) {
            this.isCall = false;
            this.snackbar.open("Record updated successfully.", '', { type: 'success' })
            this.userForm.reset();
            this.router.navigate(['/wrapper/user']);
          } else {
            this.isCall = false;
            this.snackbar.open('Something went wrong.', '', { type: 'warning' });
            this.router.navigate(['/wrapper/user']);
          }

        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
          this.router.navigate(['/wrapper/user']);
        },
      });
    }
  }

  trimID(el: any) {
    this.userForm.patchValue({
      empId: this.rem(el)
    })
  }
  trim(el: any) {
    this.userForm.patchValue({
      name: this.rem(el)
    })
  }
  trimEmail(el: any) {
    this.userForm.patchValue({
      email: this.rem(el)
    })
  }
  rem(j: any) {

    return j.value?.
      replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
      replace(/[ ]{2,}/gi, " "). // replaces multiple spaces with one space 
      replace(/\n +/, "\n")
  }
}


