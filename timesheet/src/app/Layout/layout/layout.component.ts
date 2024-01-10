import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidenavCollapsed = false;

  toggleSidenav() {
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
  }
}
