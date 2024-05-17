import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManegementComponent } from './manegement.component';

const routes: Routes = [{
  path:"",component:ManegementComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
