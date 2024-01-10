import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManegementComponent } from './manegement.component';

describe('ManegementComponent', () => {
  let component: ManegementComponent;
  let fixture: ComponentFixture<ManegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManegementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
