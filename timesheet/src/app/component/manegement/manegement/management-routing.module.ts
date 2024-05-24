import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManegementComponent } from './manegement.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{
  path:"",component:ManegementComponent},{path:'view/:user',component:ViewComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
