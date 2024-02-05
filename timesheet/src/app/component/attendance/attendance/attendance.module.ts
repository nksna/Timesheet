import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AuthService } from '../../../Auth/auth/auth.service';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [CommonModule, AttendanceRoutingModule, FullCalendarModule],
  providers:[AuthService]
})
export class AttendanceModule {}
