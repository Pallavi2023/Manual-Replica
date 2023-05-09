import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  userAccess: any;
  constructor(private router: Router) { }

  ngOnInit(): void {

    let permissions: any;
    permissions = localStorage.getItem('permissions');
    this.userAccess =
    {
      user: JSON.parse(permissions).includes('VIEW_USER'),
      role: JSON.parse(permissions).includes('VIEW_ROLE'),
      project: JSON.parse(permissions).includes('VIEW_PROJECT'),
      operator: JSON.parse(permissions).includes('VIEW_DOCUMENT'),
      audit: JSON.parse(permissions).includes('AUDIT_DOCUMENT')

    }
    console.log(this.userAccess);
    

    // if (JSON.parse(permissions) == "USER_DONT_HAVE_ANY_PERMISSIONS") {
    //   this.router.navigate(['./wrapper/permissionRestricted']);
    // }
  }

  navigate(selectedOption: any) {
    this.router.navigate([selectedOption]);
  }

}
