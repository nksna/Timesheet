import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { ToasterService } from '../../toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
    rolebased= new EventEmitter()
  constructor(
    private fire: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
   private toastrService:ToasterService
   
  ) {}
  ngOninit(){}

  login(payload: any) {
    this.fire.signInWithEmailAndPassword(payload.email, payload.password).then(
      (res: any) => {
        if (res) {
          localStorage.setItem('token2', JSON.stringify(res.user));
         
          this.router.navigateByUrl('/Layout/dashboard');
          // this.getUserRole(res.user)
          this.toastrService.showSuccess('Login successfully', 'Welcome');
        }
       
       
      },
      (err: any) => {
        alert(err.message);
        this.router.navigateByUrl('/login');
      }
    );
  }

  Resetpassword(Email: any) {
    this.fire.sendPasswordResetEmail(Email).then(
      () => {
        alert('code Successfully send');
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }

  Loginwithgoogle() {
    this.fire
      .signInWithPopup(new GoogleAuthProvider())
      .then((res: any) => {
        if (res) {
          console.log(res.email, res, 'res');
          localStorage.setItem('token', res.user);
          alert('Registration successful');

          this.router.navigateByUrl('/Layout');
        }
      })
      .catch((err: any) => {
        alert(err.message);
        this.router.navigateByUrl('/register');
      });
  }

  updateUser(uid: any, newData: any): Promise<void> {
    const userDocRef = this.firestore.collection('users').doc(uid);
    return userDocRef
      .set(newData, { merge: true })
      .then(() => {
        console.log('User data updated successfully');
      })
      .catch((error) => {
        console.error(`Error updating user data for UID ${uid}:`, error);
        throw error;
      });
  }

  loginuser(uid: any, userdata: any): Promise<void> {
    const userDocRef1 = this.firestore.collection('detail').doc(uid);
    return userDocRef1
      .set(userdata, { merge: true })
      .then(() => {
        console.log('User data updated successfully');
      })
      .catch((error) => {
        console.error(`Error updating user data for UID ${uid}:`, error);
        throw error;
      });
  }
 

Register(payload: any): void {
  this.fire.createUserWithEmailAndPassword(payload.email, payload.password)
    .then((res: any) => {
      if (res) {
        console.log('User registration successful:', res.user.uid);

        // Use AngularFirestore to set data in Firestore
        this.firestore.collection('users').doc(res.user.uid).set({
          role: payload.role,
          // Add other user data as needed
        })
        .then(() => {
          console.log('Firestore write successful');
          alert('Register successfully');
        })
        .catch((writeErr: any) => {
          console.error('Firestore write failed:', writeErr);
          alert('Firestore write failed');
        });
      }
    })
    .catch((err: any) => {
      console.error('User registration failed:', err);
      alert(err.message);
      this.router.navigateByUrl('/login');
    });
}

getUserRole(user:any) {
 this.firestore
  .collection('users')
  .doc(user.uid)
  .valueChanges()
  .subscribe(
    (data) => {
      // Handle successful data retrieval
      if (data) {
        this.userData = data;
        console.log(this.userData,"user1")
      } else {
        console.log('User not found for userId1');
      }
    },
    (error) => {
      // Handle errors
      console.error('Error getting user data:', error);
    });
    }
    }

  

