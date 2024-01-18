import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeedetailComponent } from './employeedetail.component';



@NgModule({
  declarations: [],
   imports: [RouterModule.forChild([
    { path: '', component: EmployeedetailComponent }
])],
exports: [RouterModule]
})
export class EmployeedetailRoutingModule { }
