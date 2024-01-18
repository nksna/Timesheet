import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToasterService } from '../../../toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(private fire: AngularFireAuth, private router: Router,private toaster:ToasterService) {}

  toggleSidenav1() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.fire.signOut().then(
      () => {
        localStorage.removeItem('token2');
        this.router.navigateByUrl('');
        this.toaster.showSuccess('logout','successfully')
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }
}
