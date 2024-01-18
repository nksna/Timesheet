import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{ path: '', component: AttendanceComponent }]),
  ],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
