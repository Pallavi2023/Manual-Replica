import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ApiService } from './api.service';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { OperatorService } from './operator.service';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent  implements OnInit {
  project: String[] = [];
  isEdit = false;
  username:any;
  filteredList1: String[] = [];
  pageSize: any;
  pageIndex: any;
  isCall = false;
  totalDocCount: any;
  selectedProject: any;
  requestedPage: any;
  isFilterBtn : boolean =false;
  isFilterShow : boolean = false;
  isFilterApply: boolean=false;
  isCancel: boolean=false;
  operators : any[] =[];
  isRecordLoaded: boolean = false;

  tableData = {
    project: '',
    projectName: '',
    page: 0,
    size: 10,
    sortingField: 'updated',
    sortingOrder: false,
    search: {},
    requestedPage: 'Documents',
    startDate: '',
    endDate: '',
    status: ['In Progress', 'Audit Pending','Audit In Progress','Audited'],
  };
  statusList: any = ['In Progress', 'Audit Pending','Audit In Progress','Audited'];
  sortedData: any;

  displayedColumns: string[] = [
    'chartId',
    'chartNote',
    'chatStatus',
    'updated',
    'action',
  ];
  dataSource:any = new MatTableDataSource([]);
  operatorPermissions = {
    create: true,
    edit: true,
    delete: true,
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  authorisedProjects: any[] = [];

  constructor(private router: Router, private api: ApiService, private snackbar: SnackbarService, private operator: OperatorService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('_UI')
    localStorage.removeItem('row');
    localStorage.removeItem('isEdit');
    localStorage.removeItem('auditStatus');
    // this.getAllOperator();
    //this.getPermissions();

    this.operator.entryFilter$.subscribe(operators => {
      this.tableData.projectName = operators[0].projectName;
      this.tableData.status = operators[0].status;
      this.tableData.startDate = operators[0].startDate;
      this.tableData.endDate = operators[0].endDate;
    })
    this.getAllProject();
  }

  getAllOperator(event: any) {

    localStorage.setItem('project', event);
    this.tableData.project = event;
    this.api.postSearchOperator(this.tableData).subscribe({
      next: (res) => {
        this.isRecordLoaded = true;
        if (res && res.detail) {
          this.isCall = false;
          this.dataSource.data = res.detail.documents;
          this.dataSource.sort = this.sort;
          this.totalDocCount = res.detail.totalRecords;
          this.pageIndex = res.detail.currentPage;
        } else {
          this.isCall = false;
          this.totalDocCount = null;
          this.pageIndex = 0;
          this.dataSource.data = [];
        }
      },
      // error: (err) => {
      //   this.router.navigate(['./wrapper/permissionRestricted']);
      // },
    });
  }
  // getPermissions() {
  //   let permissions: any;
  //   permissions = localStorage.getItem('permissions');

  //   this.operatorPermissions = {
  //     edit: JSON.parse(permissions).includes('UPDATE_DOCUMENT'),
  //     create: JSON.parse(permissions).includes('CREATE_DOCUMENT'),
  //     delete: JSON.parse(permissions).includes('DELETE_DOCUMENT'),
  //   };
  // }

  deleteUser(id: number) {
    this.api.deleteOperator(id).subscribe((data: any) => {
      alert('data delete');
    });
  }
  editUser(Row: any, i: any) {
    localStorage.setItem('row', JSON.stringify(Row));
    localStorage.setItem('isEdit', JSON.stringify(true));
  }

  editRow(Row: any) {
    let status:any= (Row)
    if(status.status==="Submitted" || status.status ==="Audited" || status.status ==="Audit Pending") localStorage.setItem('auditStatus',(status.status));
  }

  createOperator() {
    this.router.navigate(['/wrapper/entry/create-operator']);
    localStorage.removeItem('row');
    localStorage.setItem('isEdit', JSON.stringify(false));
   
    
  }
  searchByFilter(searchFilter: any) {
    
    this.getAllOperator(this.selectedProject);
     let x = {
      projectName: this.tableData.projectName,
      status: this.tableData.status,
      startDate: this.tableData.startDate,
      endDate: this.tableData.endDate,
    }

    this.operator.updateOperator(x);
  }

  clearFilter(filterBy: any) {
    
    (filterBy.projectName = ''),
      (filterBy.status = []),
      (filterBy.startDate = ''),
      (filterBy.endDate = ''),
      (filterBy.page = 0),
      (filterBy.size = 10),
      (filterBy.sortingField = 'updated'),
      (filterBy.sortingOrder = false);
      this.operator.updateOperator(this.tableData);

    this.getAllOperator(this.selectedProject);
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
      this.getAllOperator(this.selectedProject);
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
      this.getAllOperator(this.selectedProject);
    }
  }

  getAllProject() {
    this.api.getProject().subscribe({
      next: (res) => {
        if (res && res.detail) {
          let data = res.detail;
          this.authorisedProjects = res.detail;
          data.forEach((element: any) => {
            this.project.push(element.project);
          });
          this.selectedProject =  localStorage.getItem('project');
          this.selectedProject =  this.selectedProject ? this.selectedProject : this.project[0]

          this.getAllOperator(this.selectedProject);
          this.filteredList1 = this.project.slice();
          
        } else {
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
        }
      },
    });
    
  }

  getAuthorisedProjects(searchKey:any) {
    return this.authorisedProjects.filter(proj => proj.project.toLowerCase( ).includes(searchKey.toLowerCase( )) )
  }

  pageSizeChange(tableFilter: any) {
    
    this.tableData.size = tableFilter.pageSize;

    this.tableData.page = tableFilter.pageIndex;

    this.getAllOperator(this.selectedProject);
    
  }

  
  myChange(date : any){
    this.isFilterShow = date.value.length ? true : false;
  }

  switchProject(project:any) {
    this.tableData = { 
      project: '',
    projectName: '',
    page: 0,
    size: 10,
    sortingField: 'updated',
    sortingOrder: false,
    search: {},
    requestedPage: 'Documents',
    startDate: '',
    endDate: '',
    status: [],
    }
    this.selectedProject = project;
    this.isFilterApply = true;
    this.isCancel=true;
   
    // this.authenticationService.setUserProject(project);
  }

  
}
