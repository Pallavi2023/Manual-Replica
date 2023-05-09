import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
//import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { scan, takeWhile, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { SessiontimeoutComponent } from '../sessiontimeout/sessiontimeout.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  isExpanded: boolean = false;
  userInfo: any;
  userName: any;
  

  dialogRef: any = null;
  showDialog: boolean = true;
  idleEnd: any = null;
  idleTimeOut: any = null;
  onIdleStart: any = null;

  optionsPermissions = {
    viewUser: true,
    viewRole: true,
    viewProject: true,
    viewDocument: true,
    viewAudit: true
  }
  idle: any;
  onTimeoutWarning: any;
  keepalive: any;
  onPing: any;
  
  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('ng2Idle.main.idling');
  //   localStorage.removeItem('ng2Idle.main.expiry');
  //   localStorage.removeItem('theme');
  //   localStorage.removeItem('userProjects');     
  //   localStorage.removeItem('pdfjs.history');
  //   localStorage.removeItem('selectedProject');
  //   localStorage.removeItem('project');
  //   localStorage.removeItem('__UI');
  //   localStorage.removeItem('_UI');
  //   localStorage.removeItem('name');
  //   localStorage.removeItem('permissions');
  //   this.router.navigate(['./login'])
  // }

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { 
    // this.idle.setIdle(environment.userSessionIdleTime);
    // this.idle.setTimeout(environment.userSessionTimeOut);
    // // this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // this.idle.watch();

    // this.idleEnd = this.idle.onIdleEnd.subscribe(() => { 
    //   this.reset();
    // });
    
    // this.idleTimeOut = this.idle.onTimeout.subscribe(() => {
    //   this.logout();
    // });
    
    // this.onIdleStart = this.idle.onIdleStart.subscribe(() => {
    //     this.openDialog();
    // });
    
    // // this.onTimeoutWarning = this.idle.onTimeoutWarning.subscribe((countdown) => {
    // //   console.log(this.idleState);
    // // });

    // this.keepalive.interval(10);
    // this.onPing = this.keepalive.onPing.subscribe(() => {
    //   // this.lastPing = new Date()
    //   console.log('keep alive');
    // });

    // this.reset();
  }
  openDialog() {
    throw new Error('Method not implemented.');
  }
  idleState(idleState: any) {
    throw new Error('Method not implemented.');
  }

  reset() {
    // this.idle.watch();
    // this.idleState = 'Started.'; 
    // this.timedOut = false;
    this.showDialog = true;
    if(this.dialogRef && this.dialog.openDialogs.length) {
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
   this.getPermissions();
    this.userInfo = "pallavi Amrut"
    this.userName = "pallavi"
  }
  // openDialog() {
  //   if(this.showDialog) {
  //     this.dialogRef = this.dialog.open(SessiontimeoutComponent, { disableClose: true, width: '400px' });

  //     this.dialogRef.afterClosed().subscribe((result: any) => {
  //      if(result) {
  //       this.logout();
  //      } else {
  //        this.reset();
  //      }
  //     });
  //   }
  //  this.showDialog = false;
  // }

  getPermissions() {

    let permissions: any;
    permissions = localStorage.getItem('permissions');

    this.optionsPermissions ={
      viewUser: JSON.parse(permissions).includes('VIEW_USER'),
      viewRole: JSON.parse(permissions).includes('VIEW_ROLE'),
      viewProject: JSON.parse(permissions).includes('VIEW_PROJECT'),
      viewDocument: JSON.parse(permissions).includes('VIEW_DOCUMENT'),
      viewAudit: JSON.parse(permissions).includes('AUDIT_DOCUMENT')
    }

  }

}