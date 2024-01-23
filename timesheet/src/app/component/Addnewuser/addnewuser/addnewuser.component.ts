import { Component } from '@angular/core';
import { AuthService } from '../../../Auth/auth/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../toaster.service';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrl: './addnewuser.component.css',
})
export class AddnewuserComponent {
  constructor(private router: Router, private authservice: AuthService, private toastrService:ToasterService) {}
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
  Employeetl:any;
  Employeeteam:any;
  Employeeid:any
  Loginform() {
    if (this.email == '') {
      this.toastrService.showError('enter email to continue','Enter Mail');
    }
    if (this.password == '') {
      this.toastrService.showError('enter password to continue','Enter Password');
    }
    let payload = {
      email: this.email,
      password: this.password,
      role: this.Role,
      Employeetl:this.Employeetl,
      Employeeteam:this.Employeeteam,
      Employeeid:this.Employeeid
    };
    this.authservice.Register(payload);
    this.email = '';
    this.password = '';
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}
