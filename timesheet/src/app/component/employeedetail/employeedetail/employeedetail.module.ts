import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedetailComponent } from './employeedetail.component';
import { EmployeedetailRoutingModule } from './employeedetail-routing.module';



@NgModule({
  declarations: [
    EmployeedetailComponent
  ],
  imports: [
    CommonModule,
    EmployeedetailRoutingModule
  ]
})
export class EmployeedetailModule { }
