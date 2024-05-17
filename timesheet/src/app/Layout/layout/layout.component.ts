import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isSidenavCollapsed: boolean = true; 

// Method to toggle the sidenav
toggleSidenav() {
  this.sidenav.toggle();
}

// Method to handle sidenav state change
onSidenavToggle(opened: boolean) {
  this.isSidenavCollapsed = !opened; // Update the isSidenavCollapsed property
}
}
