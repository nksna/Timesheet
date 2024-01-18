import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimeSheetmanegementRoutingModule } from './timesheet/time-sheetmanegement-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    TimeSheetmanegementRoutingModule,
    FullCalendarModule

  ]
})
export class TimeSheetmanegementModule { }
