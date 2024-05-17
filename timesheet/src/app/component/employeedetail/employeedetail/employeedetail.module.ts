import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { EmployeedetailComponent } from './employeedetail.component';
import { EmployeedetailRoutingModule } from './employeedetail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {NgxPaginationModule} from 'ngx-pagination';





@NgModule({
  declarations: [
    EmployeedetailComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    EmployeedetailRoutingModule,
    FormsModule,ReactiveFormsModule,
    MatMenuModule,
    NgxPaginationModule
  ]
})
export class EmployeedetailModule { }
