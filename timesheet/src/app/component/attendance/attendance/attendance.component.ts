import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
})
export class AttendanceComponent {
  ngOnInit(): void {
    this.addupdatecalender();
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
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }
  addupdatecalender() {
    const updatedEvents = [
      { title: 'present', start: '2024-01-18' },
      { title: 'absent', start: '2024-01-19' },
      // Additional events if needed
    ];

    // Assuming '2024-01-18' is the date you want to update
    const dateToUpdate = '2024-01-18';

    // Call the updateEventsForDate function with the specified date and updated events
    this.updateEventsForDate(dateToUpdate, updatedEvents);
  }
}
