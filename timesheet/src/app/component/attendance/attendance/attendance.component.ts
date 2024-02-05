import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TimesheetComponent } from '../../time-sheetmanegement/timesheet/timesheet.component';
import { AuthService } from '../../../Auth/auth/auth.service';
import { TimesheetmanagementService } from '../../time-sheetmanegement/timesheet/timesheetmanagement.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  dataforattendance:any={};
  ngOnInit(): void {
    this.addupdatecalender();
    this.auth.rolebased$.subscribe((data1: any)=>{
      console.log(data1,"data45645")
    const data=data1.id
    console.log(data1.id,"ff")
    })
  }

  constructor(private auth:AuthService){
    this.auth.rolebased$.subscribe((res:any)=>{
      console.log(res,'this is the attandance')
    })
  }
  dateEvents: { [date: string]: any[] } = {};
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false,
    plugins: [dayGridPlugin],
  };
  updateEventsForDate(date: string, updatedEvents: any[]) {
    // Find the index of the date in the existing events array
    this.dateEvents[date] = updatedEvents;

    // Generate an array of events from the dictionary values
    const allEvents = Object.values(this.dateEvents).flat();

    // Update the calendarOptions with the new events array
    this.calendarOptions = {
      ...this.calendarOptions,
      events: allEvents,
    };
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; 
  
    // toggle the boolean!
  }
  addupdatecalender() {
    const updatedEvents = [
      { title: 'present', start: '2024-01-18' },
      { title: 'absent', start: '2024-01-19' },
      { title: 'present', start: '2024-01-29' },
      // Additional events if needed
    ];

    // Assuming '2024-01-18' is the date you want to update
    const dateToUpdate = '';

    // Call the updateEventsForDate function with the specified date and updated events
    this.updateEventsForDate(dateToUpdate, updatedEvents);
  }
}
