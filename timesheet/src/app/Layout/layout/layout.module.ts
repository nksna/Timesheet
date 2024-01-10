import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    SideNavComponent,
    FooterComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,BrowserAnimationsModule,RouterModule,
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
