import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
   imports: [RouterModule.forChild([
    { path: '', component: TimesheetComponent }
])],
exports: [RouterModule]
})
export class TimeSheetmanegementRoutingModule { }
