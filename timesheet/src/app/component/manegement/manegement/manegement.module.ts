import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManegementComponent } from './manegement.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ManagementRoutingModule } from './management-routing.module';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ManagementService } from './management.service';
import { ManagementPipe } from './management.pipe';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [
    ManegementComponent,
    ManagementPipe,
    ViewComponent
  ],
  imports: [
    CommonModule, ManagementRoutingModule, MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  providers:[ManagementService]
})
export class ManegementModule { }
