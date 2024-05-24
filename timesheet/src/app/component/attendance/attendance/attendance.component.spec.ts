import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceComponent } from './attendance.component';
import { AuthService } from '../../../Auth/auth/auth.service';
import { Auth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Environments } from '../../../enviroment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;
  let service: AuthService;
  let toastrService: ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceComponent],
      imports: [
        ToastrModule.forRoot(),AngularFireModule.initializeApp(Environments.firebase),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AuthService, ToastrService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AuthService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call ngOnInit',()=>{
    spyOn(component,'addupdatecalender').and.callThrough();
    component.ngOnInit();
  });

  it('should call updateEventsForDate method', ()=>{
    const updatedEvents:any[] = []
    component.updateEventsForDate('date',updatedEvents)
  });

  it('should call updateEventsForDate method', ()=>{
    const updatedEvents:any[] = []
    component.toggleWeekends();
  });
});
