import { Component, Input } from '@angular/core';
import { AuthService } from '../../../Auth/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  @Input() isSidenavCollapsed: any;
  userRole: any;
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}
  userid: any;
  ngOnInit() {
    const dataget = localStorage.getItem('token2');
    if (dataget != null) {
      this.userid = JSON.parse(dataget);
    }
    if (this.userid) {
      this.firestore
        .collection('users')
        .doc(this.userid)
        .valueChanges()
        .subscribe(
          (data) => {
            // Handle successful data retrieval
            if (data) {
              this.userRole = data;
              console.log(this.userRole, 'user1');
            } else {
              console.log('User not found for userId1');
            }
          },
          (error) => {
            // Handle errors
            console.error('Error getting user data:', error);
          }
        );
    }
  }

  // You would need a method in your AuthService to get the current user

  toggleSidenav() {
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
  }
}
