import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth/auth.module';
import { LayoutModule } from './Layout/layout/layout.module';
import { AddnewuserComponent } from './component/Addnewuser/addnewuser/addnewuser.component';



import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterService } from './toaster.service';

@NgModule({
  declarations: [AppComponent, AddnewuserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    FormsModule,
    BrowserAnimationsModule,
   
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
