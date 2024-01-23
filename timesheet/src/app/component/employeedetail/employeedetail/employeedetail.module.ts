import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedetailComponent } from './employeedetail.component';
import { EmployeedetailRoutingModule } from './employeedetail-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeedetailComponent
  ],
  imports: [
    CommonModule,
    EmployeedetailRoutingModule,
    FormsModule
  ]
})
export class EmployeedetailModule { }
