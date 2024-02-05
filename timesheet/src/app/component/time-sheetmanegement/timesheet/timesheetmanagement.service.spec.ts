import { TestBed } from '@angular/core/testing';

import { TimesheetmanagementService } from './timesheetmanagement.service';

describe('TimesheetmanagementService', () => {
  let service: TimesheetmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
