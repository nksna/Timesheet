import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { Environments } from '../../../enviroment';
import { DashboardService } from '../dashboard.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports:[ToastrModule,AngularFireModule.initializeApp(Environments.firebase)],
      providers:[DashboardService,ElementRef,ToastrService,Renderer2,AngularFirestore]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
