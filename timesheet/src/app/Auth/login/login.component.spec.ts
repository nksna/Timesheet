import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { Environments } from '../../enviroment';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(Environments.firebase),
      ],
      providers: [AuthService, ToastrService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });
  afterEach(() => {
    clearInterval(component.intervalId); // Clear the interval after each test
  });

  it('should create the component', () => {
    component.loginform.value = { email: '', password: '' };
    const spy = spyOn(toastrService, 'error');

    component.Loginform();
    expect(spy).toHaveBeenCalled();
  });
  it('should call send', () => {
    component.emailforgat = '';
    const spy = spyOn(authService, 'Resetpassword');
    component.Send();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call send else part', () => {
    component.emailforgat = 'data';
    const spy = spyOn(authService, 'Resetpassword');

    component.Send();
    expect(spy).toHaveBeenCalled();
  });

  it('should call register', () => {
    component.register();
  });

  it('should call openQtyModel', () => {
    let model = document.createElement('div');

    component.openQtyModel1();
  });

  it('should call googlelogin', () => {
    component.googlelogin();
  });

  it('should call startImageSlider', fakeAsync(() => {
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    component.currentImageIndex = 0;
    component.startImageSlider();
    tick(5000); // Wait for 5000ms (5 seconds)
    expect(component.currentImageIndex).toBe(1); // Assert the currentImageIndex value after 5 seconds
  }));

  it('should call closeQtyModel', () => {
    component.closeQtyModel();
  });

  it('should set check to false if checkbox is checked', () => {
    const event = { target: { checked: true } };
    component.checked(event);
    expect(component.check).toBe(false);
  });

  it('should set check to true if checkbox is unchecked', () => {
    const event = { target: { checked: false } };
    component.checked(event);
    expect(component.check).toBe(true);
  });

  it('should call forgetpass', () => {
    component.forgetpass();
  });

  it('should call sendmail', () => {
    component.sendmail();
  });

  it('should call onEyeicon', () => {
    component.onEyeicon();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'startImageSlider').and.callThrough();
    component.ngOnInit();
  });
});
