import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { EmployeedetailService } from '../../employeedetail/employeedetail/employeedetail.service';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,HttpClientModule, DashboardRoutingModule,ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
      
    })
  ]
  ,providers:[DashboardService]
})
export class DashboardModule { }
