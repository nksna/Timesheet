import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { EmployeedetailService } from '../../employeedetail/employeedetail/employeedetail.service';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,HttpClientModule, DashboardRoutingModule,ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
      
    }),
    MatToolbarModule,
    MatCardModule,MatTableModule,MatProgressSpinnerModule,MatButtonModule,MatIconModule, 
    MatCardModule,
    MatNativeDateModule,MatDatepickerModule]
  
  ,providers:[DashboardService]
})
export class DashboardModule { }
