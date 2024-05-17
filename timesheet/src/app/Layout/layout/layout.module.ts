import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    SideNavComponent,
    FooterComponent,
    LayoutComponent,

  ],
  imports: [
    CommonModule,BrowserAnimationsModule,RouterModule, MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,FormsModule,BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,MatListModule
  ],
  exports:[LayoutComponent]
})
export class LayoutModule { }
