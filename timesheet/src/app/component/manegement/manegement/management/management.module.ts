import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementPipe } from '../management.pipe';


@NgModule({
  declarations: [
    ManagementPipe
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
