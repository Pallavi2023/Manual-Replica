import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/login/auth.guard';
import { LoginComponent } from '../auth/login/login.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PermissionRestrictedComponent } from '../permission-restricted/permission-restricted.component';
import { HomeComponent } from './components/home/home.component';
import { ResetpasswordComponent } from '../auth/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from '../auth/forgotpassword/forgotpassword.component';
import { SessiontimeoutComponent } from './components/sessiontimeout/sessiontimeout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'confirm-password', component: ResetpasswordComponent },
  // { path: 'sessionTimeout', component: SessiontimeoutComponent},
  {
    path: 'wrapper',
    component: WrapperComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        // component: UserComponent
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),

      },
      {
        path: 'role',
        // component: RoleComponent
        loadChildren: () => import('./components/role/role.module').then(m => m.RoleModule),
      },
      // {
      //   path: 'project',
      //   // component: ProjectComponent
      //   loadChildren: () => import('./components/project/project.module').then(m => m.ProjectModule),

      // },
      // {
      //   path: 'operator',
      //   // component: UserComponent
      //   loadChildren: () => import('./components/operator/operator.module').then(m => m.OperatorModule),

      // },
      {
        path: 'permissionRestricted',
        component: PermissionRestrictedComponent
      },
      // {
      //   path: 'audit',
      //   // component: UserComponent
      //   loadChildren: () => import('./components/audit/audit.module').then(m => m.AuditModule),

      // },
      {
        path: 'home',
        component: HomeComponent,
      },
    ]
  },

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
