import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimeSheetmanegementRoutingModule } from './timesheet/time-sheetmanegement-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Auth/auth/auth.service';
import { TimesheetmanagementService } from './timesheet/timesheetmanagement.service';

@NgModule({
  declarations: [
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    TimeSheetmanegementRoutingModule,
    FullCalendarModule,FormsModule

  ],
  providers:[AuthService]
})
export class TimeSheetmanegementModule { }
