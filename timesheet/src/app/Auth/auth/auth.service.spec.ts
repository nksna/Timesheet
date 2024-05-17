import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from '../../toaster.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports:[ToastrModule],
      providers:[ToasterService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
