import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimeSheetmanegementRoutingModule } from './timesheet/time-sheetmanegement-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimesheetComponent
  ],
  imports: [
    CommonModule,
    TimeSheetmanegementRoutingModule,
    FullCalendarModule,FormsModule

  ]
})
export class TimeSheetmanegementModule { }
