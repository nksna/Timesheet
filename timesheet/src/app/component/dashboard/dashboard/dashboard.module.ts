import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, DashboardRoutingModule,ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
      
    })
  ]
})
export class DashboardModule { }
