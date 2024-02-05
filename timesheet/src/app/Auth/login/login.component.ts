import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../toaster.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  check:boolean=true;
  showEyeicon:boolean=false;
  forgetpassword:boolean=false;
  logforforgetpass:boolean=true;
  
  constructor(private authservice: AuthService, private router: Router, private toastrService:ToasterService) {
    this.loginform = new FormGroup({
      "email":new FormControl('',Validators.required),
      "password":new FormControl('')
    })
  }
  loginform: any;
  emailforgat: any = '';
  currentImageIndex: number = 0;
  images: string[] = [
    './assets/img1.jpg',
    './assets/img4.jpg',
    './assets/img3.jpg'
  ];

  ngOnInit(): void { 
    this.startImageSlider();
  }
  Loginform() {
    const data =this.loginform.value
    if (data.email == '') {
      this.toastrService.showError('please enter email','Enter Mail');
    }
    if (data.password == '') {
      this.toastrService.showError('please enter password','Enter Password');
    }
    let payload = {
      email: data.email,
      password: data.password,
    };
    this.authservice.login(payload);
   this.loginform.reset()
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
    
  }
  openQtyModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
    
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
  startImageSlider() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000);
  }

  checked(event:any){
    if(event.target.checked){
      this.check=false;
    }
    else{
      this.check=true;
    }
  }

  forgetpass(){
    this.logforforgetpass=false;
    this.forgetpassword=true;
  }

  sendmail(){
    this.logforforgetpass=true;
    this.forgetpassword=false;
  }

  onEyeicon(){
    this.showEyeicon = !this.showEyeicon;
  }
}
