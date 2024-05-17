import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToasterService } from '../../../toaster.service';

declare var bootstrap: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  
  
  constructor(private fire: AngularFireAuth, private router: Router,private toaster:ToasterService) {}

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();



  // Method to emit event when toggle button is clicked
  toggleSidenav1(): void {
    this.toggleSidenav.emit();
  }

  // Method to handle logout
  

  logoutmodal() {
    this.fire.signOut().then(
      () => {
        localStorage.removeItem('token2');
        this.router.navigateByUrl('');
        this.toaster.showSuccess('logout','successfully')
      },
      (err: any) => {
        this.toaster.showError('logout','Failed');
      }
    );
  }

  logout(){
    const logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'), {
      backdrop: 'static', // Prevent closing by clicking outside the modal
    });
    logoutModal.show();
  }
  
}
