import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';

@Component({
  selector: 'app-create-edit-role',
  templateUrl: './create-edit-role.component.html',
  styleUrls: ['./create-edit-role.component.scss'],
})

  export class CreateEditRoleComponent implements OnInit {
    roleForm!: FormGroup;
    data: any;
    isEdit = false;
    isFieldDisabled: boolean = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    permissionCtrl = new FormControl('');
    filteredPermissions: any = [];
    permissions: string[] = [];
    allPermissions: string[] = [];
    options = [];
    activeProj: any = [];
    isCall = false;
    iscreateUpdateBtnClicked: boolean = false;
    isCreateUserOperation: boolean;
    roleErrorMsg = "";
    @ViewChild('permissionInput') permissionInput!: ElementRef<HTMLInputElement>;
    userID: any;
  
    constructor(
      private formBuilder: FormBuilder,
      private api: ApiService,
      private router: Router,
      private routes: ActivatedRoute,
  
      private snackbar: SnackbarService
    ) {
      this.getPermission();
      this.isCreateUserOperation = this.routes.snapshot.params['id'] ? true : false;
  
    }
  
    ngOnInit(): void {
     
      if (this.isCreateUserOperation) {
  
        this.isEdit = true;
        this.userID = this.routes.snapshot.params['id'];
  
        this.getRoleByID(this.userID);
  
      }
      this.roleForm = this.formBuilder.group({
        id: [''],
        role: new FormControl({value:'',disabled: this.isCreateUserOperation}, Validators.compose([
          Validators.required,Validators.pattern('^([a-zA-Z0-9\ s])+([a-zA-Z0-9\s()]+)*(-[\(\)a-zA-Z0-9\s]+)*$'), Validators.minLength(3), Validators.maxLength(15)
        ])),      status: [true],
        permissions: [''],
      });
      if (this.data && this.isEdit) {
        this.roleForm.patchValue({
          id: this.data.id,
          role: this.data.role,
          status: this.data.status == 'enabled' ? true : false,
        });
        this.permissions = this.data.permissions;
      }
      this.roleForm.valueChanges.subscribe(res => {
        this.validateRoleInfoForm();
      });
    }
  
  
    validateRoleInfoForm() {
      if (this.roleForm.get('role')?.errors) {
        if (this.roleForm.get('role')?.hasError('required')) {
          this.roleErrorMsg = 'Please enter the role name.';
        } else if (this.roleForm.get('role')?.hasError('pattern')) {
          if (this.roleForm.get('role')?.hasError('pattern')) {
            const roleValue = this.roleForm.get('role')?.value;
            if (
              roleValue.charAt(0) === '-' ||
              roleValue.charAt(0) === '(' ||
              roleValue.charAt(0) === ')'
            ) {
              this.roleErrorMsg =
                'Parenthesis and hyphens are not allowed at the beginning of a role name.';
            } else if (roleValue.slice(-1) === '-') {
              this.roleErrorMsg =
                'Hyphens are not allowed at the ending of a role name.';
            } else {
              this.roleErrorMsg =
                'Only alphabets, digits, parentheses, hyphens, and spaces are allowed.';
            }
          }
        } else if (this.roleForm.get('role')?.hasError('minlength')) {
          this.roleErrorMsg =
            'Please enter at least ' +
            this.roleForm.get('role')?.errors?.['minlength'].requiredLength +
            ' characters.';
        } else if (this.roleForm.get('role')?.hasError('maxlength')) {
          this.roleErrorMsg =
            'At max ' +
            this.roleForm.get('role')?.errors?.['maxlength'].requiredLength +
            ' characters.';
        }
      }
    }
  
    addRole() {
      if (this.roleForm.invalid) {
        const controls = this.roleForm.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            this.roleForm.get(name)?.markAsTouched();
          }
        }
      }
      if(!this.permissions.length){
        this.snackbar.open('Please add atleast one permission for the role to be created.', '', { type: 'warning' });
        return 
      }
      if (this.roleForm.valid) {
        this.isCall = true;
        let dataObj = {
          permissions: this.permissions,
          role: this.roleForm.get('role')?.value,
          status:
            this.roleForm.get('status')?.value == true ? 'enabled' : 'disabled',
        };
        this.api.postRole(dataObj).subscribe({
          next: (res) => { 
            if(res) {
              if(res.status === 'S') {
                this.isCall = false;
                this.snackbar.open("Record created successfully.",'',{type:'success'})
                this.roleForm.reset();
                this.router.navigate(['/wrapper/role'])
              } else if(res.status === 'E' && res.description) {
                this.snackbar.open(res.description, '', { type: 'warning' });
              }
            }
          },
          error: () => {
            this.snackbar.open('Something went wrong.', '', { type: 'warning' });
            this.router.navigate(['/wrapper/role']);
          },
        });
      }
    }
    getRoleByID(id: any) {
      this.api.getRoleById(id).subscribe({
        next: (res) => {
  
          if (res) {
  
            this.roleForm.patchValue({
              id: res.detail.id,
              role: res.detail.role,
              status: res.detail.status == 'enabled' ? true : false,
            });
            this.permissions = res.detail.permissions;
  
          }
  
        },
        error: (err) => {
  
          alert("Something went wrong.")
          this.router.navigate(['./wrapper/permissionRestricted']);
  
        },
      });
  
    }
    updateRole() {
      // this.isCall = true;
      if (this.roleForm.invalid) {
        const controls = this.roleForm.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            this.roleForm.get(name)?.markAsTouched();
          }
        }
      }
      if(!this.permissions.length){
        this.snackbar.open('Please add atleast one permission for the role to be updated.', '', { type: 'warning' });
        return 
      }
      if (this.roleForm.valid) {
  
        let dataObj = {
          id: this.roleForm.get('id')?.value,
          permissions: this.permissions,
          role: this.roleForm.get('role')?.value,
          status:
            this.roleForm.get('status')?.value == true ? 'enabled' : 'disabled',
        };
  
        this.api.putRole(dataObj).subscribe({
          next: (res) => {
  
          if (res && res.detail) {
            this.isCall = false;
            this.snackbar.open("Record updated successfully.",'',{type:'success'});
            this.roleForm.reset();
            this.router.navigate(['/wrapper/role']);
          } else {
            this.isCall = false;
            this.snackbar.open('Something went wrong.', '', { type: 'warning' });
            this.router.navigate(['/wrapper/role']);
          }
  
        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
          this.router.navigate(['/wrapper/role']);
        },
      });
    }
    }
  
    add(event: MatChipInputEvent): void {
  
      const value = (event.value || '').trim();
  
      if (value) {
        this.permissions.push(value);
      }
  
      event.chipInput!.clear();
  
      this.permissionCtrl.setValue(null);
    }
  
    // remove(permission: string): void {
    //   const index = this.permissions.indexOf(permission);
    //   this.allPermissions.push(permission);
    //   this.filteredPermissions = this.permissionCtrl.valueChanges.pipe(
    //     startWith(null),
    //     map((permission: string | null) =>
    //       permission ? this._filter(permission) : this.allPermissions.slice()
    //     )
    //   );
    //   if (index >= 0) {
    //     this.permissions.splice(index, 1);
    //   }
    // }
  
    selected(event: MatAutocompleteSelectedEvent): void {
      this.permissions.push(event.option.viewValue);
      this.permissionInput.nativeElement.value = '';
      this.permissionCtrl.setValue(null);
  
      let index = 0;
      index = this.permissions.length - 1;
      let removeIndex = this.allPermissions.indexOf(this.permissions[index]);
      this.allPermissions.splice(removeIndex, 1);
  
      this.filteredPermissions = this.permissionCtrl.valueChanges.pipe(
        startWith(null),
        map((permission: string | null) =>
          permission ? this._filter(permission) : this.allPermissions.slice()
        )
      );
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.allPermissions.filter((permission) =>
        permission.toLowerCase().includes(filterValue)
      );
    }
  
    getPermission() {
  
      this.api.getPermission().subscribe({
        next: (res) => {
          let data : [] = res.detail;
          // data.forEach((element: any) => {
          //   this.allPermissions.push(element.permission);
          // });
          // this.filteredPermissions = this.permissionCtrl.valueChanges.pipe(
          //   startWith(null),
          //   map((permission: string | null) =>
          //     permission ? this._filter(permission) : this.allPermissions.slice()
          //   )
          // );
          // this.allPermissions.sort((a, b) => 0 - (a > b ? -1 : 1));
  
          this.filteredPermissions = data.map((x:any) => {
            if(x){            
              this.activeProj.push(x);
            }
            return {x};
          })
          this.filteredPermissions = [...this.activeProj];
        },
      });
    }
    getPermissionList(searchKey:any) {
      return this.filteredPermissions.filter((userName:any) => userName.permission.toLowerCase( ).includes(searchKey.toLowerCase( )) )
  
    }
    removePermission(rmvPermission: string) {
     
      this.permissions = this.permissions.filter(sPerm => sPerm !== rmvPermission);
    }
  
    trim(el: any) {
      this.roleForm.patchValue({
        role: this.rem(el)
      })
    }
    rem(j: any) {
      return j.value?.
        replace(/(^\s*)|(\s*$)/gi, ""). // removes leading and trailing spaces
        replace(/[ ]{2,}/gi, " "). // replaces multiple spaces with one space 
        replace(/\n +/, "\n").
        replace()
    }
  }
