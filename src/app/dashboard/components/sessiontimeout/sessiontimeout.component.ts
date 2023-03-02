import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { scan, takeWhile, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-sessiontimeout',
  templateUrl: './sessiontimeout.component.html',
  styleUrls: ['./sessiontimeout.component.scss'],
})
export class SessiontimeoutComponent implements OnInit {
  sessionTimeOut = environment.userSessionTimeOut;
  logout(status: any) {
    this.modaldialogRef.close(status);
  }
  constructor(
    public modaldialogRef: MatDialogRef<SessiontimeoutComponent>
  ) {
    // this.percentage = Number(this.timer$ / this.sessionTimeOut * 100)
  }
  timer$: any = timer(0, 1000).pipe(
    scan((acc) => --acc, environment.userSessionTimeOut),

    takeWhile((x) => x >= 0)
  );

  public percentage: number = (this.timer$ / this.sessionTimeOut) * 100;

  public final = Number('percentage');



 
  ngOnInit(): void {}
}
// title = 'intelli-doc_UI';
//   dialogRef: any = null;
//   showDialog: boolean = true;
//   themeURL: any;
//   userInfoSubscription: any = null;
//   themeURLSubscription: any = null;

  
 

 

 
//   idleEnd: any = null;
//   idleTimeOut: any = null;
//   onIdleStart: any = null;



//   constructor(public dialog: MatDialog,
//     public router: Router,
//     private idle: Idle, 
//     ){

//     this.idle.setIdle(environment.userSessionIdleTime);
//     this.idle.setTimeout(environment.userSessionTimeOut);
//     this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
//     this.idle.watch();

//     this.idleEnd = this.idle.onIdleEnd.subscribe(() => { 
//       this.reset();
//     });
    
//     this.idleTimeOut = this.idle.onTimeout.subscribe(() => {
//       this.logout();
//     });
    
//     this.onIdleStart = this.idle.onIdleStart.subscribe(() => {
//         this.openDialog();
//     });
    
  

//     this.reset();
//   }

//   reset() {
  
//     this.showDialog = true;
//     if(this.dialogRef && this.dialog.openDialogs.length) {
//       this.dialogRef.close();
//     }
//   }

//   ngOnInit(){
//   }
  


//   openDialog() {
//     if(this.showDialog) {
//       this.dialogRef = this.dialog.open(LogoutWarningDialog, { disableClose: true, width: '400px' });

//       this.dialogRef.afterClosed().subscribe((result: any) => {
//        if(result) {
//         this.logout();
//        } else {
//          this.reset();
//        }
//       });
//     }
//    this.showDialog = false;
//   }



//   logout() {
   
//     localStorage.removeItem('token');
//     localStorage.removeItem('ng2Idle.main.idling');
//     localStorage.removeItem('ng2Idle.main.expiry');
//     localStorage.removeItem('theme');
//     localStorage.removeItem('userProjects');     
//     localStorage.removeItem('pdfjs.history');
//     localStorage.removeItem('selectedProject');
//     localStorage.removeItem('project');
//     localStorage.removeItem('__UI');
//     localStorage.removeItem('_UI');
//     localStorage.removeItem('name');
//     localStorage.removeItem('permissions');
//     this.router.navigate(['./login'])
//   }

//   ngOnDestroy() {
//     this.idle.stop();
//     if(this.dialogRef && this.dialog.openDialogs.length) {
//       this.dialogRef.close();
//     }
//     this.idleEnd.unsubscribe();
//     this.idleTimeOut.unsubscribe();
//     this.onIdleStart.unsubscribe();
//     this.themeURLSubscription.unsubscribe();
//     this.userInfoSubscription.unsubscribe();
 
//   }

// }




// @Component({
// selector: 'logout-warning-dialog',
// template: `
//   <div class="modal-dialog modal-md modal-dialog-centered m-0 p-0" data-backdrop="static" data-keyboard="false">
//     <div class="modal-content">
//       <div class="modal-body px-5 py-4 text-secondary">  
//         <div class="text-center"> 
//           <circle-progress
//             percent="{{(timer$ | async)/sessionTimeOut * 100}}"
//             [radius]="50"
//             [backgroundColor]="'#f0f0f0'"
//             [backgroundGradientStopColor]="'#9c9696'"
//             [backgroundStroke]="'#2c0202'"
//             animation:boolean="true"
//             animationDuration:any="0"
//             toFixed:any="0"
//             showUnits:boolean="true"
//             backgroundPadding:any="-10"
//             [outerStrokeColor]="'#e87033'"
//             [outerStrokeGradientStopColor]="'#8f3838'"
//             [innerStrokeColor]="'#b3b3b3'"
//             [titleColor]="'#f76922'"
//             [unitsColor]="'#f76922'"
//             [outerStrokeWidth]="'6'"
//             [space]="'0'"
//             [innerStrokeWidth]="2"
//             [backgroundStrokeWidth]="0"
//             [outerStrokeLinecap]="'round'"
//             units=" sec"
//             title="{{timer$ | async }}"
//             [unitsFontWeight]="'700'"
//             [showSubtitle]="false"
//             [clockwise]="true"
//             [showTitle]="true"
//             [unitsFontSize]="12">
//           </circle-progress>
//           <h5>
//             You will be logged out in {{timer$ | async }}<small> sec </small>
//           </h5>
//         </div>  
//       </div>
//     </div>
//   </div>
// `
// })
// export class LogoutWarningDialog {
// constructor(
//     public modaldialogRef: MatDialogRef<LogoutWarningDialog>) {}
//     logout(status: any) {
//       this.modaldialogRef.close(status);
//     }
//     sessionTimeOut = environment.userSessionTimeOut;

//     timer$ = timer(0, 1000).pipe(
//       scan(acc => --acc, environment.userSessionTimeOut),
//       takeWhile(x => x >= 0)
//     )    
// }