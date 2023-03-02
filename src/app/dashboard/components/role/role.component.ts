import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
//import { ProjectService } from '../project/project.service';
import { RoleService } from './role.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = ['role', 'status', 'permission', 'action'];
  project: String[] = [];
  filteredList1: String[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  isFilterBtn : boolean =false;
  isFilterShow : boolean = false;
  projects: any[] =[];
  pageSize: any;
  pageIndex: any;
  // isCall = false;
  totalDocCount: any;
  selectedProject: any;
  requestedPage: any;
  activeProj: any = [];
  // isCall=true;
  filteredPermissions: any = [];
  permissions: any[] = [];
  allPermissions: string[] = [];
  data: any;
  dataSource: any = new MatTableDataSource([]);
  // roleForm!: FormGroup;

  selectedPermissions: any;

  rolePermissions = {
    update: true,
    create: true,
    delete: true
  }
  tableData = {
    page: 0,
    size: 10,
    sortingField: 'updated',
    sortingOrder: false,
    search: {},
    permissions: [],
    role: "",
    status: "",
  };
  sortedData: any;
  

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('permissionInput1') permissionInput1!: ElementRef<HTMLInputElement>;

  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder, private snackbar: SnackbarService, private pro : RoleService) { }
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  permissionCtrl = new FormControl('');
  ngOnInit(): void {

    localStorage.removeItem('row');
    localStorage.removeItem('isEdit');
    this.getPermissions();
    this.getPermission();
   

    this.data = localStorage.getItem('permissions');
    // this.roleForm = this.formBuilder.group({
    //   rolename: '',
    //   status: '',
    //   permissions: [],
    // });

    this.pro.roleFilter$.subscribe(projects => {
      this.tableData.role = projects[0].role;
      this.tableData.status = projects[0].status;
      this.tableData.permissions = projects[0].permissions;
    })
   this.permissions=this.tableData.permissions;
    this.getAllRoles();
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
  searchByFilter(searchFilter: any) {
    this.tableData.page = 0;
       this.tableData.status = searchFilter.status ;
       this.tableData.role  = searchFilter.role || "" ;

      if (this.permissions.length != 0) {
        this.selectedPermissions = this.permissions;
        this.tableData.permissions = this.selectedPermissions;
      }
      else{
        this.tableData.permissions = [];
      }
    let x =  {
      role: this.tableData.role,
      status: this.tableData.status,
      permissions: this.tableData.permissions,
    } 
    this.pro.updateRole(x);
    
    this.getAllRoles();
  }
  getAllRoles() {
    
    this.api.postSearchRole(this.tableData).subscribe({
      next: (res) => {

        if (res && res.detail) {
          
          this.dataSource.data = res.detail.roles;
          this.dataSource.sort = this.sort;
          this.pageIndex = res.detail.currentPage;
          this.totalDocCount = res.detail.totalRecords;
        } else {
          this.pageIndex = 0;
          this.dataSource.data = [];
        }
      },
      error: (err) => {
        this.router.navigate(['./wrapper/permissionRestricted']);
      },
    });
  }
  clearFilter(filterBy: any) {
    (filterBy.status = ''),
      (filterBy.role = ''),
      (filterBy.page = 0),
      (filterBy.size = 10),
      (filterBy.permissions = []),
      (filterBy.sortingField = 'updated'),
      (filterBy.sortingOrder = false);
      this.pro.updateRole(this.tableData);

    this.getAllRoles();
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.permissions.push(event.option.viewValue);
    this.permissionInput1.nativeElement.value = '';
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


  add(event: MatChipInputEvent): void {
    
    const value = (event.value || '').trim();

    if (value) {
      this.permissions.push(value);
    }

    event.chipInput!.clear();

    this.permissionCtrl.setValue(null);
  }
  getPermissions() {
    let permissions: any;
    permissions = localStorage.getItem('permissions');
    this.rolePermissions = {
      update: JSON.parse(permissions).includes('UPDATE_ROLE'),
      create: JSON.parse(permissions).includes('CREATE_ROLE'),
      delete: JSON.parse(permissions).includes('DELETE_ROLE'),

    }


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
        //  x.isEnabled = x.status === "enabled" ? true : false
          if(x){            
            this.activeProj.push(x);
          }
          return {x};
        })
        console.log(this.activeProj);
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

  sortData(sort: Sort) {

    this.sortedData = sort;
    this.tableData.sortingField = this.sortedData.active;
    if (this.tableData.sortingField === 'score') {
      this.tableData.sortingField = 'postProcessingDocumentLevelConfidence';
      if (
        this.sortedData.direction === 'asc' &&
        this.tableData.sortingField != 'score'
      ) {
        this.sortedData = true;
      } else {
        this.sortedData = false;
      }
      this.tableData.sortingOrder = this.sortedData;
      this.getAllRoles();
    } else if (this.tableData.sortingField != 'score') {
      if (
        this.sortedData.direction === 'asc' &&
        this.tableData.sortingField != 'score'
      ) {
        this.sortedData = true;
      } else {
        this.sortedData = false;
      }
      this.tableData.sortingOrder = this.sortedData;
      this.getAllRoles();
    }
  }

  getAllRole() {
    this.api.getRole().subscribe({
      next: (res) => {
        if (res && res.detail && res.detail.length) {
          // this.isCall = false;
          this.dataSource.data = res.detail;
        } else {
          // this.isCall = false;
          this.dataSource.data = [];
          this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
          this.router.navigate(['./wrapper/permissionRestricted']);
        }
      },
      error: (err) => {
        this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
        this.router.navigate(['./wrapper/permissionRestricted']);
      },
    });
  }

  deleteRole(id: number) {
    this.api.deleteRole(id).subscribe((data: any) => {
      alert('data delete');
      this.getAllRole();
    });
  }
  // editRole(Row: any, i: any) {
  //   localStorage.setItem('row', JSON.stringify(Row));
  //   localStorage.setItem('isEdit', JSON.stringify(true));
  // }


  createRole() {
    localStorage.removeItem('row');
    localStorage.setItem('isEdit', JSON.stringify(false));
  }
  pageSizeChange(tableFilter: any) {

    this.tableData.size = tableFilter.pageSize;

    this.tableData.page = tableFilter.pageIndex;

    this.getAllRoles();
    const matTable: any = document.getElementById('matTable');
    matTable.scrollIntoView();
  }

  myChange(){
    this.isFilterShow = true;
  }
}
