import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authservice: AuthService, private router: Router, private toastrService:ToasterService) {}
  loginform: any;
  password: any = '';
  email: any = '';
  emailforgat: any = '';
 

  ngOnInit(): void {}
  Loginform() {
    if (this.email == '') {
      this.toastrService.showError('please enter email','Enter Mail');
    }
    if (this.password == '') {
      this.toastrService.showError('please enter password','Enter Password');
    }
    let payload = {
      email: this.email,
      password: this.password,
    };
    this.authservice.login(payload);
    this.email = '';
    this.password = '';
  }
  register() {
    this.router.navigateByUrl('/register');
  }
  Send() {
    if (this.emailforgat == '') {
      this.toastrService.showError('enter email to continue','Enter Mail');
    }
    this.authservice.Resetpassword(this.emailforgat);
  }
  openQtyModel1() {
    const model = document.getElementById('myModal1');
    if (model != null) {
      model.style.display = 'block';
    }
    this.emailforgat = this.email;
  }
  openQtyModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
    this.emailforgat = this.email;
  }
  closeQtyModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
  googlelogin() {
    this.authservice.Loginwithgoogle();
  }
}
