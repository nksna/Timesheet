import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject, of, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
 
  constructor(
    private fire: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
   private toastrService:ToastrService
   
  ) {}
  ngOninit(){}

  login(payload: any) {
    this.fire.signInWithEmailAndPassword(payload.email, payload.password).then(
      (res: any) => {
        if (res) {
          localStorage.setItem('token2', JSON.stringify(res.user));
         
          this.router.navigateByUrl('/Layout/dashboard');
          // this.getUserRole(res.user)
          this.toastrService.success('Login successfully', 'Welcome');
        }
       
       
      },
      (err: any) => {
        this.toastrService.error('Login Failed','Retry');
        this.router.navigateByUrl('/login');
      }
    );
  }

  Resetpassword(Email: any) {
    this.fire.sendPasswordResetEmail(Email).then(
      () => {
        this.toastrService.success('code Successfully send','Successfull');
      },
      (err: any) => {
        this.toastrService.error('code not send','Retry');
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
          this.toastrService.success('Registration successful','Successfull');

          this.router.navigateByUrl('/Layout');
        }
      })
      .catch((err: any) => {
        this.toastrService.error('Registration Failed','Retry');
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
          role: payload.Role,
          employeeid:payload.Employeeid,
          emplooyeeteam:payload.Employeeteam,
          employeeTl:payload.Employeeid,
          employeeaddress:payload.address,
          employeejoindate:payload.joiningDate,
          employeejob:payload.job,
          employeeeducation:payload.education
          // Add other user data as needed
        })
        .then(() => {
    
          this.toastrService.success('Register successfully','Successfull');
        })
        .catch((writeErr: any) => {

          this.toastrService.error('Firestore write failed',writeErr);
        });
      }
    })
    .catch((err: any) => {
  
      this.toastrService.error('Please Try Again','Registration Failed');
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
    state:any;
  private  rolebased = new BehaviorSubject<any>(null);

    rolebased$ = this.rolebased.asObservable();
  


  getAttendance(data: any) {
    this.rolebased.next(data);
  }

  getSharedData(): Observable<any> {
    return this.rolebased$;
  }
}
    


  

