import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddnewuserComponent } from './addnewuser/addnewuser.component';



@NgModule({
  declarations: [],
   imports: [RouterModule.forChild([
    { path: '', component: AddnewuserComponent }
])],
exports: [RouterModule]})
export class AddnewuserRoutingModule { }
