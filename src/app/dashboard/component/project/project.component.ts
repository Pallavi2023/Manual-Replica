import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { SnackbarService } from 'src/app/snack-bar/snackbar.service';
import { ProjectService } from './project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = [
    'project',
    'startDate',
    'endDate',
    'status',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  project: String[] = [];
  filteredList1: String[] = [];
  pageSize: any;
  pageIndex: any;
  // isCall = false;
  totalDocCount: any;
  selectedProject: any;
  requestedPage: any;
  isFilterBtn : boolean =false;
  isFilterShow : boolean = false;
  projects: any[] = [];
  dataSource: any = new MatTableDataSource([]);
  isRecordLoaded: boolean = false;

  projectPermissions = {
    edit: true,
    create: true,
    delete: true,
  };

  tableData = {
    project: '',
    page: 0,
    size: 10,
    sortingField: 'updated',
    sortingOrder: false,
    search: {},
    status: '',
  };
  sortedData: any;




  constructor(private router: Router, private api: ApiService, private snackbar: SnackbarService, private pro : ProjectService) {}

  ngOnInit(): void {
    localStorage.removeItem('row');
    localStorage.removeItem('isEdit');
    this.getPermissions();
   

    this.pro.projectsFilter$.subscribe((projects:any) => {
      this.tableData.project = projects[0].project;
      this.tableData.status = projects[0].status;
    })
    this.getAllProjects();
  }

  getPermissions() {
    let permissions: any;
    permissions = localStorage.getItem('permissions');

    this.projectPermissions = {
      edit: JSON.parse(permissions).includes('UPDATE_PROJECT'),
      create: JSON.parse(permissions).includes('CREATE_PROJECT'),
      delete: JSON.parse(permissions).includes('DELETE_PROJECT'),
    };
  }

  getAllProject() {
    this.api.getProject().subscribe({
      next: (res) => {
        this.isRecordLoaded = true;
        if (res && res.detail && res.detail.length) {
          // this.isCall = false;
          this.dataSource.data = res.detail;
        } else {
          // this.isCall = false;
          this.dataSource.data = [];
          this.snackbar.open('Something went wrong.', '', { type: 'warning' });
          this.router.navigate(['./wrapper/permissionRestricted']);
        }
      },
      error: (err) => {
        this.snackbar.open('Something went wrong.', '', { type: 'warning' });
        this.router.navigate(['./wrapper/permissionRestricted']);
      },
    });
  }
  clearFilter(filterBy: any) {

    (filterBy.status = ''),
      (filterBy.project = ''),
      (filterBy.page = 0),
      (filterBy.size = 10),
      (filterBy.sortingField = 'updated'),
      (filterBy.sortingOrder = false);
      this.pro.updateProject(this.tableData);

    this.getAllProjects();
  }

  deleteProject(id: number) {
    this.api.deleteProject(id).subscribe((data: any) => {
      alert('data delete');
      this.getAllProject();
    });
  }
  searchByFilter(searchFilter: any) {

    let x =  {
      project: this.tableData.project,
      status: this.tableData.status,
    }
    this.pro.updateProject(x)

    this.tableData.page = 0;

    this.getAllProjects();
  }
  getAllProjects() {
    this.api.postSearchProject(this.tableData).subscribe({
      next: (res) => {

        if (res && res.detail) {
          
          this.dataSource.data = res.detail.projects;
          this.dataSource.sort = this.sort;
          this.pageIndex = res.detail.currentPage;
          this.totalDocCount = res.detail.totalRecords;
        } else {
          this.pageIndex = 0;
          this.dataSource.data = [];
          this.totalDocCount = null;

        }
      },
      error: (err) => {
        this.router.navigate(['./wrapper/permissionRestricted']);
      },
    });
  }

  editProject(Row: any, i: any) {
    localStorage.setItem('row', JSON.stringify(Row));
    localStorage.setItem('isEdit', JSON.stringify(true));
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
      this.getAllProjects();
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
      this.getAllProjects();
    }
  }
  createProject() {
    localStorage.removeItem('row');
    localStorage.setItem('isEdit', JSON.stringify(false));
    this.router.navigate(['/wrapper/project/create-project']);
  }
  pageSizeChange(tableFilter: any) {
    
    this.tableData.size = tableFilter.pageSize;

    this.tableData.page = tableFilter.pageIndex;

    this.getAllProjects();
    const matTable: any = document.getElementById('matTable');
    matTable.scrollIntoView();
  }

  myChange(){
    this.isFilterShow = true;
  }
}
