import { Component } from '@angular/core';
import { AuthService } from '../../../Auth/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrl: './addnewuser.component.css',
})
export class AddnewuserComponent {
  constructor(private router: Router, private authservice: AuthService) {}
  loginform: any;
  loginObj: any = {
    userName: '',
    password: '',
    mobileNo: '',
    emailId: '',
    role: '',
    Adress: '',
  };
  username: string = '';
  password: string = '';
  Address: any = '';
  email: string = '';
  mobilenumber: any = '';
  name: any;
  data: any;
  emailforgat: any;
  Role: any;

  Loginform() {
    if (this.email == '') {
      alert('please enter email');
    }
    if (this.password == '') {
      alert('please enter email');
    }
    let payload = {
      email: this.email,
      password: this.password,
      role: this.Role,
    };
    this.authservice.Register(payload);
    this.email = '';
    this.password = '';
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}
