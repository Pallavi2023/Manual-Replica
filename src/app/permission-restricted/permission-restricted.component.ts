import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-restricted',
  templateUrl: './permission-restricted.component.html',
  styleUrls: ['./permission-restricted.component.scss']
})
export class PermissionRestrictedComponent implements OnInit {

  constructor() { }
  permissionRestricted: any;
  ngOnInit(): void {
    let permissions: any;
    permissions = localStorage.getItem('permissions');
    this.permissionRestricted = JSON.parse(permissions).includes('USER_DONT_HAVE_ANY_PERMISSIONS')
  }

}
