import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth/auth.module';
import { LayoutModule } from './Layout/layout/layout.module';
import { AddnewuserComponent } from './component/Addnewuser/addnewuser/addnewuser.component';

import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AddnewuserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthModule,
    LayoutModule,
    FormsModule,
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
