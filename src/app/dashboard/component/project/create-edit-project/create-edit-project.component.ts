import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup,Validators,} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-edit-project',
  templateUrl: './create-edit-project.component.html',
  styleUrls: ['./create-edit-project.component.scss']
})
export class CreateEditProjectComponent implements OnInit{

  projectForm!: FormGroup;
  tasksSelected: any = [];
  selectedRoles: any = [];
  selectedUser: any = [];
  selectedOptions: any = [];
  selectedUsers: string[] = [];
  selectedProjectInfo: any = {
    id: '',
    created: '',
    endDate: '',
    lead: '',
    project: '',
    roles: [],
    startDate: '',
    status: '',
    updated: '',
    deletedUsers: []
  };
  role: String[] = [];
  userList: string[] = [];
  data: any;
  isEdit = false;
  isCall = false;
  isCreateUserOperation: boolean;
  userID: any;
  minDate = new Date();
  projectErrorMsg = '';
  testedSourceData: any = {};
  isSourceDataChange = false;
  rolesWithUsers: any;
  allUsers: any;
  userCtrl: any;
  userInput: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private routes: ActivatedRoute,
    private snackbar: SnackbarService
  ) {
    this.isCreateUserOperation = this.routes.snapshot.params['id']
      ? true
      : false;
  }

  ngOnInit(): void {

    if (this.isCreateUserOperation) {
      this.isEdit = true;
      this.userID = this.routes.snapshot.params['id'];

      this.getProjectByID(this.userID);
    }
    if (this.data && this.data.roles) {
      this.data.roles = this.data.roles.map((r: any) => {
        r.isEnabled = r.status === 'enabled' ? true : false;

        return { ...r };
      });
    }

    setTimeout(() => {
      this.api.getAllRole().subscribe({
        next: (res) => {
          let data = res.detail;

          data.forEach((element: any) => {
            this.role.push(element.role);
          });
          this.role = this.role.filter((sItem: any) => !this.selectedRoles.includes(sItem));
        },
      });
    }, 5);


    this.api.getAllUser().subscribe({
      next: (res) => {
        let data = res.detail;
        data.forEach((element: any) => {
          this.userList.push(element.email);
        });
      },
    });

    this.projectForm = this.formBuilder.group({
      id: [''],
      project: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^([a-zA-Z0-9\\s])+([a-zA-Z0-9\\s()]+)*(-[\(\)a-zA-Z0-9\\s]+)*$'),
      ]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      status: [true],
      roles: [''],
    });

    if (this.data && this.isEdit) {
      this.projectForm.patchValue({
        id: this.data.id,
        project: this.data.project,
        startDate: new Date(this.data.startDate),
        endDate: new Date(this.data.endDate),
        status: this.data.status == 'enabled' ? true : false,
      });
      this.selectedProjectInfo = this.data.roles;
    }
    this.projectForm.valueChanges.subscribe((res) => {
      this.minDate = new Date(res.startDate);
      this.validateProjectInfoForm();
    });
  }

  validateProjectInfoForm() {
    if (this.projectForm.get('project')?.errors) {
      if (this.projectForm.get('project')?.hasError('required'))
        this.projectErrorMsg = 'Please enter the project name.';
      else if (this.projectForm.get('project')?.hasError('pattern')) {
        if (
          this.projectForm.get('project')?.value.charAt(0) === '-' ||
          this.projectForm.get('project')?.value.charAt(0) === '(' ||
          this.projectForm.get('project')?.value.charAt(0) === ')'
        ) {
          this.projectErrorMsg =
            'Parenthesis and hyphens are not allowed at the beginning of a project name.';
        } else if (this.projectForm.get('project')?.value.slice(-1) === '-') {
          this.projectErrorMsg =
            'Hyphens are not allowed at the ending of a project name.';
        } else {
          this.projectErrorMsg =
            'Only alphabets, digits, and special characters - ( ) are allowed';
        }
      } else if (this.projectForm.get('project')?.hasError('minlength'))
        this.projectErrorMsg =
          'At least ' +
          this.projectForm.get('project')?.errors?.['minlength']
            .requiredLength +
          ' characters';
      else if (this.projectForm.get('project')?.hasError('maxlength'))
        this.projectErrorMsg =
          'At max ' +
          this.projectForm.get('project')?.errors?.['maxlength']
            .requiredLength +
          ' characters';
    }
  }

  dateConversion(date: Date) {
    var date = new Date(date);
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1)) +
      '/' +
      (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
      '/' +
      date.getFullYear()
    );
  }

  getProjectByID(id: any) {
    this.api.getProjectById(id).subscribe({
      next: (res) => {
        if (res) {
          this.projectForm.patchValue({
            id: res.detail.id,
            project: res.detail.project,
            startDate: new Date(res.detail.startDate),
            endDate: new Date(res.detail.endDate),
            status: res.detail.status == 'enabled' ? true : false,
          });
          this.selectedProjectInfo = res.detail;
          this.selectedProjectInfo.deletedUsers = [];
          this.selectedProjectInfo.roles = this.selectedProjectInfo.roles.map((r: { isEnabled: boolean; status: string; role: any; }) => {
            r.isEnabled = r.status === "enabled" ? true : false;
            this.selectedRoles.push(r.role);
            return { ...r }
          });

        }
      },
      error: (error) => {

      },
    });
  }





  addProject() {
    if (this.projectForm.invalid) {
      const controls = this.projectForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.projectForm.get(name)?.markAsTouched();
        }
      }
    }
    if (!this.selectedProjectInfo.roles.length) {
      this.snackbar.open('Please add atleast one role before creating the project.', '', { type: 'warning' });
      return
    }
    if (this.projectForm.valid && this.selectedProjectInfo.roles.length) {
      let isRolePresent: boolean = true;
      this.selectedProjectInfo.roles.forEach((element: any) => {
        if (!(element.users.length)) {
          this.snackbar.open('Please add atleast one user to the role before creating the project.', '', { type: 'warning' });
          isRolePresent = false;

        }
      });
      if (!isRolePresent) return
    }
    if (this.projectForm.valid) {
      this.isCall = true;
      this.selectedProjectInfo = this.selectedProjectInfo.roles.map((r: any) => {
        r.status = r.isEnabled ? 'enabled' : 'disabled';

        return { ...r };
      });

      let data = {
        endDate: this.dateConversion(this.projectForm.get('endDate')?.value),
        lead: 'platform-admin@neutrinotechsystems.com',
        project: this.projectForm.get('project')?.value,
        roles: this.selectedProjectInfo,
        startDate: this.dateConversion(
          this.projectForm.get('startDate')?.value
        ),
        status:
          this.projectForm.get('status')?.value == true
            ? 'enabled'
            : 'disabled',
      };

      this.api.postProject(data).subscribe({
        next: (res) => {
          if (res && res.detail) {
            this.isCall = true;
            this.snackbar.open('Record created successfully.', '', {
              type: 'success',
            });
            this.projectForm.reset();
            this.router.navigate(['/wrapper/project']);
          } else {
            this.isCall = true;
            this.snackbar.open('Something went wrong.', '', {
              type: 'warning',
            });
            this.router.navigate(['/wrapper/project']);
          }
        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', {
            type: 'warning',
          });
          this.router.navigate(['/wrapper/project']);
        },
      });
    }
  }

  updateProject() {
    if (this.projectForm.invalid) {
      const controls = this.projectForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.projectForm.get(name)?.markAsTouched();
        }
      }
    }
    this.isCall = true;
    this.selectedProjectInfo.roles = this.selectedProjectInfo.roles.map((r: any) => {
      r.status = r.isEnabled ? 'enabled' : 'disabled';

      return { ...r };
    });

    if (this.projectForm.valid && this.selectedProjectInfo.roles.length) {
      let isRolePresent: boolean = true;
      this.selectedProjectInfo.roles.forEach((element: any) => {
        if (!(element.users.length)) {
          this.snackbar.open('Please add atleast one user to the role before creating the project.', '', { type: 'warning' });
          isRolePresent = false;

        }
      });
      if (!isRolePresent) return
    }

    let data = {
      id: this.projectForm.get('id')?.value,
      endDate: this.dateConversion(this.projectForm.get('endDate')?.value),
      lead: 'platform-admin@neutrinotechsystems.com',
      project: this.projectForm.get('project')?.value,
      roles: this.selectedProjectInfo.roles,
      startDate: this.dateConversion(this.projectForm.get('startDate')?.value),
      status:
        this.projectForm.get('status')?.value == true ? 'enabled' : 'disabled',
    };

    if (this.projectForm.valid) {
      this.api.putProject(data).subscribe({
        next: (res) => {
          if (res && res.detail) {
            this.isCall = false;
            this.snackbar.open('Record updated successfully.', '', {
              type: 'success',
            });
            this.projectForm.reset();
            this.router.navigate(['/wrapper/project']);
          } else {
            this.isCall = false;
            this.snackbar.open('Something went wrong.', '', {
              type: 'warning',
            });
            this.router.navigate(['/wrapper/project']);
          }
        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', {
            type: 'warning',
          });
          this.router.navigate(['/wrapper/project']);
        },
      });
    }
  }


  serchFilter(val: any) {
    return this.role.filter(role => role.toLowerCase().includes(val.toLowerCase()))
  }

  getuserList(searchKey: any) {
    return this.userList.filter(userName => userName.toLowerCase().includes(searchKey.toLowerCase()))
  }
  addRole(roleName: any) {
    this.selectedRoles.push(roleName);
    this.role = this.role.filter((sItem: any) => !this.selectedRoles.includes(sItem));
    this.selectedProjectInfo.roles.push({
      isEnabled: true,
      role: roleName,
      status: "enabled",
      users: []
    })
  }




  removeRole(roleIndex: number, removeUser: string) {
    if (this.selectedProjectInfo.roles[roleIndex].isEnabled) {
      this.selectedProjectInfo.roles[roleIndex].users = this.selectedProjectInfo.roles[roleIndex].users.filter((user: string) => user !== removeUser)
    } else {
      this.snackbar.open(this.selectedProjectInfo.roles[roleIndex].role + ' role is Disabled', '', { type: 'warning' });
    }
  }


  openUserListDP(userListDP: any, roleIndex: any) {
    if (this.selectedProjectInfo.roles[roleIndex].isEnabled) {
      userListDP.open();
    } else {
      this.snackbar.open(this.selectedProjectInfo.roles[roleIndex].role + ' role is Disabled', '', { type: 'warning' });
    }
  }


  optionSelect(event: any, index: number, i: number) {
    this.selectedOptions.push(event.source.value[0]);
    this.selectedOptions = [...this.selectedOptions]

    this.selectedUser = [];
    const lastOption = this.selectedOptions[this.selectedOptions.length - 1];

    if (Array.isArray(lastOption)) {
      this.selectedUser = lastOption;
    } else {
      this.selectedUser.push(lastOption);
    }

    const ind = this.selectedOptions.indexOf(event.source.value[0]);
    this.userList.splice(ind, 1);

    this.selectedProjectInfo[i].users = this.selectedOptions;

    const selectedUser = this.selectedUser[0];
    const selectedUserIndex = this.userList.indexOf(selectedUser);
    if (selectedUserIndex > -1) {
      this.userList.splice(selectedUserIndex, 1);
    }
  }



  sourceDataChanged(value: any, fieldname: any) {
    if (value !== this.testedSourceData[fieldname]) {
      this.isSourceDataChange = true;
    } else {
      this.isSourceDataChange = false;
    }
  }

  trim(name: any) {
    this.projectForm.patchValue({
      project: this.rem(name),
    });
  }
  rem(j: any) {
    return j.value
      ?.replace(/(^\s*)|(\s*$)/gi, '') // removes leading and trailing spaces
      .replace(/[ ]{2,}/gi, ' ') // replaces multiple spaces with one space
      .replace(/\n +/, '\n');
  }


}

