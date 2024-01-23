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
        this.toastrService.showError('Login Failed','Retry');
        this.router.navigateByUrl('/login');
      }
    );
  }

  Resetpassword(Email: any) {
    this.fire.sendPasswordResetEmail(Email).then(
      () => {
        this.toastrService.showSuccess('code Successfully send','Successfull');
      },
      (err: any) => {
        this.toastrService.showError('code not send','Retry');
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
          this.toastrService.showSuccess('Registration successful','Successfull');

          this.router.navigateByUrl('/Layout');
        }
      })
      .catch((err: any) => {
        this.toastrService.showError('Registration Failed','Retry');
        this.router.navigateByUrl('/register');
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
          employeeid:payload.Employeeid,
          emplooyeeteam:payload.Employeeteam,
          employeeTl:payload.Employeeid
          // Add other user data as needed
        })
        .then(() => {
          console.log('Firestore write successful');
          this.toastrService.showSuccess('Register successfully','Successfull');
        })
        .catch((writeErr: any) => {
          console.error('Firestore write failed:', writeErr);
          this.toastrService.showError('Firestore write failed','Try again');
        });
      }
    })
    .catch((err: any) => {
      console.error('User registration failed:', err);
      this.toastrService.showError('Please Try Again','Registration Failed');
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

  

