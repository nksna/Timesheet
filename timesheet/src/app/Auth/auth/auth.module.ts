import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';

import { Environments } from '../../enviroment';
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, FormsModule, AngularFireModule.initializeApp(Environments.firebase),
    FormsModule
  ],
  exports: [LoginComponent]
})
export class AuthModule { }
