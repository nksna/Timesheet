import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmployeedetailService } from '../../employeedetail/employeedetail/employeedetail.service';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [CommonModule, AttendanceRoutingModule, FullCalendarModule],
 
})
export class AttendanceModule {}
