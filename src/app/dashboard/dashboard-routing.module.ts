import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './component/wrapper/wrapper.component';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [
{
  path: '',
  component: WrapperComponent
},
// {
// path:'home',
// component: HomeComponent
// },
{
path:'wrapper',
component: WrapperComponent,
children:[
  {
    path: 'user',
    // component: UserComponent
    loadChildren: () => import('./component/user/user.module').then(m =>m.UserModule)

  },
  {
    path: 'role',
    // component: RoleComponent
    loadChildren: () => import('./component/role/role.module').then(m => m.RoleModule),
  },
  {
    path:'project',
    loadChildren: ()=> import('./component/project/project.module').then(m => m.ProjectModule),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
]
},
{
  path: '**',
  redirectTo: '/wrapper',
  pathMatch: 'full'
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
