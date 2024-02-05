import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';

import { Environments } from '../../enviroment';
import { LoginComponent } from '../login/login.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, FormsModule,ReactiveFormsModule, AngularFireModule.initializeApp(Environments.firebase),
    FormsModule,ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
      
    })
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
