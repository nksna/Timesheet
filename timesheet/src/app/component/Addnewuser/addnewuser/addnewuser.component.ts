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
  
  email:any
  username: string = '';
  password: string = '';
  Role: string = '';
  Employeeid: string = '';
  Employeeteam: string = '';
  Employeetl: string = '';
  joiningDate: string = '';
  name: string = '';
  address: string = '';
  job: string = '';
  education: string = '';


  addNewUser() {
    if (!this.email || !this.password || !this.Role) {
      this.toastrService.showError('Please enter required fields', 'Incomplete Form');
      return;
    }

    // Additional logic for adding a new user
    // You can use the form values (this.email, this.password, etc.) to send a request or perform any action
    const payload= {
      email: this.email,
      password: this.password,
      Role: this.Role,
      Employeeid: this.Employeeid,
      Employeeteam: this.Employeeteam,
      Employeetl: this.Employeetl,
      joiningDate: this.joiningDate,
      name: this.name,
      address: this.address,
      job: this.job,
      education: this.education
    }
    this.authservice.Register(payload)
    // Clear form fields after adding a new user
    this.clearForm();
  }


  clearForm() {
    this.email = '';
    this.password = '';
    this.Role = '';
    this.Employeeid = '';
    this.Employeeteam = '';
    this.Employeetl = '';
    this.joiningDate = '';
    this.name = '';
    this.address = '';
    this.job = '';
    this.education = '';
  }

 }
