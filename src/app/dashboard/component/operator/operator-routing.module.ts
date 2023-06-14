import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditOperatorComponent } from './create-edit-operator/create-edit-operator.component';
import { OperatorComponent } from './operator.component';

const routes: Routes = [
    {
        path: '',
        component: OperatorComponent,
       
      },
     
      {
        path: 'create-operator',
        component: CreateEditOperatorComponent
      },
      {
        path: 'edit-operator/:id',
        component: CreateEditOperatorComponent
      },
      
     

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
