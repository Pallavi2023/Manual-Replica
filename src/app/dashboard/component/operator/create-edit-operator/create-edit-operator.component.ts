import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormControl,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';

@Component({
  selector: 'app-create-edit-operator',
  templateUrl: './create-edit-operator.component.html',
  styleUrls: ['./create-edit-operator.component.scss']
})
export class CreateEditOperatorComponent implements OnInit {
  operatorForm!: FormGroup;
  data: any;
  username: any;
  findCall: any;
  auditStatus: any = "";
  isEdit = false;
  //isCreateMode: boolean = true;
  isCall = false;
  isCreateUserOperation: boolean;
  userID: any;
  disabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private routes: ActivatedRoute,
    private snackbar: SnackbarService

  ) {
    this.isCreateUserOperation = this.routes.snapshot.params['id'] ? true : false;
    if (this.isCreateUserOperation) {

      this.isEdit = true;
      this.userID = this.routes.snapshot.params['id'];
      this.api.getEntryById(this.userID).subscribe(
        (res) => {
          this.auditStatus = res.detail.status;
        })
    }
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('_UI')
    this.auditStatus = (localStorage.getItem("auditStatus"));
    if (this.isCreateUserOperation) {

      this.isEdit = true;
      this.userID = this.routes.snapshot.params['id'];

      this.getEntryByID(this.userID);

    }
    //  this.data = JSON.parse(localStorage.getItem('row')!);
    this.findCall = this.isCreateUserOperation ? true : false;


    // this.isEdit = JSON.parse(localStorage.getItem('isEdit')!);
    let project = localStorage.getItem('project');

    this.operatorForm = this.formBuilder.group({
      id: [],
      projectName: new FormControl(localStorage.getItem("project"), [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      loginName: [''],
      chartId: new FormControl('', [Validators.required]),
      dos: new FormControl('', [Validators.required]),
      icd: new FormControl('', [Validators.required]),
      page: new FormControl('', [Validators.required]),
      document: [''],
      chartNote: [''],
      suggest: new FormControl('', [Validators.required]),
      chatStatus: new FormControl('', [Validators.required]),
      currentQueue: [''],
      comment: [''],
      coderName: localStorage.getItem("name"),
      coderEmpId: localStorage.getItem("empId"),
      project: project,
      isDraft: [],
    });
    if (this.auditStatus === 'Submitted' || this.auditStatus === "Audited" || this.auditStatus === "Audit Pending") {
      this.operatorForm.disable();
    }
    if (this.data && this.isEdit) {



      this.operatorForm.patchValue({
        id: this.data.id,
        projectName: this.data.projectName,
        date: this.data.date,


        loginName: this.data.loginName,
        chartId: this.data.chartId,
        dos: this.data.dos,
        icd: this.data.icd,
        page: this.data.page,
        document: this.data.document,
        chartNote: this.data.chartNote,
        suggest: this.data.suggest,
        chatStatus: this.data.chatStatus,
        currentQueue: this.data.currentQueue,
        comment: this.data.comment,
        coderName: this.data.coderName,
        coderEmpId: this.data.coderEmpId,
        project: this.data.project,
        isDraft: this.data.isDraft,
      });
      if (this.auditStatus === 'Submitted') {
        this.operatorForm.disable();
      }
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

  getEntryByID(id: any) {

    this.api.getEntryById(id).subscribe({
      next: (res) => {

        if (res) {
          this.operatorForm.patchValue({
            id: res.detail.id,
            projectName: res.detail.projectName,
            date: new Date(res.detail.date),
            loginName: res.detail.loginName,
            chartId: res.detail.chartId,
            dos: res.detail.dos,
            icd: res.detail.icd,
            page: res.detail.page,
            document: res.detail.document,
            chartNote: res.detail.chartNote,
            suggest: res.detail.suggest,
            chatStatus: res.detail.chatStatus,
            currentQueue: res.detail.currentQueue,
            comment: res.detail.comment,
            coderName: localStorage.getItem("name"),
            coderEmpId: localStorage.getItem("empId"),
            project: res.detail.project,
            isDraft: res.detail.isDraft,
          });
        }

      },
      error: (err) => {

        alert("Something went wrong")
        this.router.navigate(['./wrapper/permissionRestricted']);

      },
    });

  }
  addOperator() {

    if (this.operatorForm.invalid) {
      const controls = this.operatorForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.operatorForm.get(name)?.markAsTouched();
        }
      }
    }
    let data = {
      projectName: this.operatorForm.get('projectName')?.value,
      date: this.operatorForm.get('date')?.value ? this.dateConversion(this.operatorForm.get('date')?.value) : null,
      loginName: this.operatorForm.get('loginName')?.value,
      chartId: this.operatorForm.get('chartId')?.value,
      dos: this.operatorForm.get('dos')?.value,
      icd: this.operatorForm.get('icd')?.value,
      page: this.operatorForm.get('page')?.value,
      document: this.operatorForm.get('document')?.value,
      chartNote: this.operatorForm.get('chartNote')?.value,
      suggest: this.operatorForm.get('suggest')?.value,
      chatStatus: this.operatorForm.get('chatStatus')?.value,
      currentQueue: this.operatorForm.get('currentQueue')?.value,
      coderName: localStorage.getItem("name"),
      coderEmpId: localStorage.getItem("empId"),
      project: this.operatorForm.get('project')?.value,
      isDraft: false,
      findCall: this.findCall,
    };

    if (this.operatorForm.valid) {
      this.api.postOperator(data).subscribe({
        next: (res) => {
          if (res && res.detail) {
            this.snackbar.open("Record created successfully.", '', { type: 'success' })
            this.operatorForm.reset();
            this.router.navigate(['/wrapper/operator']);
          } else {
            this.snackbar.open('Something went wrong.', '', { type: 'warning' });
            this.router.navigate(['/wrapper/operator']);
          }
        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
          this.router.navigate(['/wrapper/operator']);
        },
      });
    }
  }

  updateOperator() {

    // this.isCall = true;
    if (this.operatorForm.invalid) {
      const controls = this.operatorForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.operatorForm.get(name)?.markAsTouched();
        }
      }
    }
    let data = {
      id: this.operatorForm.get('id')?.value,
      projectName: this.operatorForm.get('projectName')?.value,
      date: this.operatorForm.get('date')?.value ? this.dateConversion(this.operatorForm.get('date')?.value) : null,
      loginName: this.operatorForm.get('loginName')?.value,
      chartId: this.operatorForm.get('chartId')?.value,
      dos: this.operatorForm.get('dos')?.value,
      icd: this.operatorForm.get('icd')?.value,
      page: this.operatorForm.get('page')?.value,
      document: this.operatorForm.get('document')?.value,
      chartNote: this.operatorForm.get('chartNote')?.value,
      suggest: this.operatorForm.get('suggest')?.value,
      recordType: this.operatorForm.get('recordType')?.value,
      chatStatus: this.operatorForm.get('chatStatus')?.value,
      currentQueue: this.operatorForm.get('currentQueue')?.value,
      coderName: this.operatorForm.get('coderName')?.value,
      coderEmpId: this.operatorForm.get('coderEmpId')?.value,
      project: this.operatorForm.get('project')?.value,
      isDraft: false,
      findCall: this.findCall,
    };
    if (this.operatorForm.valid) {

      this.api.putOperator(data, 'Documents').subscribe({
        next: (res) => {

          if (res && res.detail) {
            this.isCall = false;
            this.snackbar.open("Record Updated successfully.", '', { type: 'success' })
            this.operatorForm.reset();
            this.router.navigate(['/wrapper/operator']);
          } else {
            this.isCall = false;
            this.snackbar.open('Something went wrong.', '', { type: 'warning' });
            this.router.navigate(['/wrapper/operator']);
          }
        },
        error: () => {
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
          this.router.navigate(['/wrapper/operator']);
        },
      });
    }
  }

  saveDraft() {
    // this.isCall = true;
    let data = {
      id: this.operatorForm.get('id')?.value,

      projectName: this.operatorForm.get('projectName')?.value,
      date: this.operatorForm.get('date')?.value ? this.dateConversion(this.operatorForm.get('date')?.value) : null,
      loginName: this.operatorForm.get('loginName')?.value,
      chartId: this.operatorForm.get('chartId')?.value,
      dos: this.operatorForm.get('dos')?.value,
      icd: this.operatorForm.get('icd')?.value,
      page: this.operatorForm.get('page')?.value,
      document: this.operatorForm.get('document')?.value,
      noOfDos: this.operatorForm.get('noOfDos')?.value,
      chartNote: this.operatorForm.get('chartNote')?.value,
      suggest: this.operatorForm.get('suggest')?.value,
      chatStatus: this.operatorForm.get('chatStatus')?.value,
      currentQueue: this.operatorForm.get('currentQueue')?.value,
      coderName: this.operatorForm.get('coderName')?.value,
      coderEmpId: this.operatorForm.get('coderEmpId')?.value,
      project: this.operatorForm.get('project')?.value,
      isDraft: true,
      findCall: this.findCall,
    };
    if (!data.chartId) {
      this.snackbar.open('Please enter Chart Id before saving', '', { type: 'warning' });
      return;
    } else {
      this.api.putSaveDraft(data, 'Documents').subscribe({
        next: (res) => {
          if (res) {
            this.isCall = true;
            this.snackbar.open("Record added successfully", '', { type: 'success' })
            this.router.navigate(['/wrapper/operator']);
          } else {
            this.isCall = false;
            this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
            this.router.navigate(['/wrapper/operator']);
          }
        },
        error: () => {
          this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
          this.router.navigate(['/wrapper/operator']);
        },
      });
    }
  }
}
