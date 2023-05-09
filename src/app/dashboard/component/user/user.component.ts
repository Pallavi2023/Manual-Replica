import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'action'];
  // dataSource!: MatTableDataSource<any>;
  filteredList1: String[] = [];
  users: any[] = [];
  pageSize: any;
  pageIndex: any;
  isCall: boolean = false;
  isFilterBtn: boolean = false;
  isFilterShow: boolean = false;
  totalDocCount: any;
  requestedPage: any;
  dataSource: any = new MatTableDataSource([]);
  isFilterApply: boolean = false;

  userPermissions = {
    createUser: true,
    updateUser: true,
    deleteUser: true,
  };

  // @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // @ViewChild(MatPaginator, { static: false })
  // set paginator(value: MatPaginator) {
  //   if (this.dataSource) {
  //     this.dataSource.paginator = value;
  //   }
  // }

  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private snackbar: SnackbarService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('row');
    localStorage.removeItem('isEdit');
    //this.getPermissions();
    // this.getAllUser();

    this.user.usersFilter$.subscribe((users) => {
      this.tableData.name = users[0].name;
      this.tableData.email = users[0].email;
      this.tableData.status = users[0].status;
      console.log(users);
    });
    this.getAllUsers();
  }

  tableData = {
    page: 0,
    size: 10,
    sortingField: "",
    sortingOrder: false,
    //search: {},
    name: '',
    email: '',
    status: '',
  };

  getAllUsers() {
    // this.api.postSearchUser(this.tableData).subscribe({
    //   next: (res) => {
    //     if (res && res.detail) {
    //       this.dataSource.data = res.detail.users;
    //       // this.dataSource.sort = this.sort;
    //       this.totalDocCount = res.detail.totalRecords;
    //       this.pageIndex = res.detail.currentPage;
    //     } else {
    //       // this.pageIndex = 0;
    //       this.dataSource.data = [];
    //       this.totalDocCount = null;
    //     }
    //     this.dataSource.sortingDataAccessor = (
    //       data: any,
    //       sortHeaderId: string
    //     ) => {
    //       const value: any = data[sortHeaderId];
    //       return typeof value === 'string' ? value.toLowerCase() : value;
    //     };
    //   },
    //   // error: (err) => {
    //   //   this.router.navigate(['./wrapper/permissionRestricted']);
    //   // },
    // });
  }

  // statusList: any = ['enabled', 'disabled'];
  sortedData: any;
  getPermissions() {
    let permissions: any;
    permissions = localStorage.getItem('permissions');

    this.userPermissions = {
      createUser: JSON.parse(permissions).includes('CREATE_USER'),
      updateUser: JSON.parse(permissions).includes('UPDATE_USER'),
      deleteUser: JSON.parse(permissions).includes('DELETE_USER'),
    };
  }
  clearFilter(filterBy: any) {
    (filterBy.status = ''),
      (filterBy.name = ''),
      (filterBy.email = ''),
      (filterBy.page = 0),
      (filterBy.size = 10),
      (filterBy.sortingField = 'updated'),
      (filterBy.sortingOrder = false);
      this.user.updateUser(this.tableData);

    this.getAllUsers();
  }

  searchByFilter(searchFilter: any) {
    let x = {
      name: this.tableData.name,
      email: this.tableData.email,
      status: this.tableData.status,
    };
    this.user.updateUser(x);
    this.tableData.page = 0;
    this.getAllUsers();
  }

  // getAllUser() {

  //   this.api.getUser().subscribe({
  //     next: (res) => {

  //       if (res && res.detail && res.detail.length) {
  //         this.isCall = false;
  //         this.dataSource.data = res.detail;
  //         this.totalDocCount = res.detail.length;
  //         this.pageIndex = 0;
  //       }
  //       else {
  //         this.dataSource.data = [];
  //         this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
  //         this.router.navigate(['./wrapper/permissionRestricted']);
  //       }

  //     },
  //     error: (err) => {

  //       this.snackbar.open('Something went wrong ...!', '', { type: 'warning' });
  //       this.router.navigate(['./wrapper/permissionRestricted']);

  //     },
  //   });
  // }

  // deleteUser(id: number) {
  //   this.api.deleteUser(id).subscribe((data: any) => {
  //     alert('data delete');
  //   });
  // }
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
      this.getAllUsers();
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
      this.getAllUsers();
    }
  }
  editUser(Row: any, i: any) {
    localStorage.setItem('row', JSON.stringify(Row));
    localStorage.setItem('isEdit', JSON.stringify(true));
  }

  createUser() {
    localStorage.removeItem('row');
    localStorage.setItem('isEdit', JSON.stringify(false));
  }

  pageSizeChange(tableFilter: any) {
    this.isFilterApply = true;

    this.tableData.size = tableFilter.pageSize;

    this.tableData.page = tableFilter.pageIndex;

    this.getAllUsers();
    const matTable: any = document.getElementById('matTable');
    matTable.scrollIntoView();
  }
}
