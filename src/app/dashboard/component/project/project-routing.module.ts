import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { ProjectComponent } from './project.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
       
      },
     
      {
        path: 'create-project',
        component: CreateEditProjectComponent
      },
      {
        path: 'edit-project/:id',
        component: CreateEditProjectComponent
      },
      
     

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }