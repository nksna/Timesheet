import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userName:any;
  newdate =new Date()
  userData:any;
  startTimeString: string = '';
  stopTimeString: string = '';
  startTime: Date | null = null;
  TimesheetArray:any []=[]
  stopTime: Date | null = null;
  seconds:any;
  minutes:any;
  hours:any;
  userIdToFetch:any;
  totalHours:any= 0;
  totalhour= 0;
  STime: string = 'Start Time';
  ngOnInit() {
    // Initialize user name, you can get it from a service or wherever appropriate
    this.userName = "John Doe";
  }



  logout() {
    // Implement your logout logic here
    console.log("Logout button clicked");
  }
  starttime(STime:string) {
    if(STime === 'Start Time'){
    this.startTime = new Date();
    this.startTimeString = this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.STime = 'Stop Time';
    this.stopTimeString = '';
    // console.log('Start Time:', startTimeString);
    // let newdate = JSON.stringify(this.startTime)
    // console.log(newdate,newdate.slice(16,24))
    }
    else{
      this.StopTime();
      this.STime = 'Start Time';
    }
  }
  StopTime() {
    if (this.startTime) {
      this.stopTime = new Date();
      this.stopTimeString = this.stopTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeDiff = this.stopTime.getTime() - this.startTime.getTime(); // Difference in milliseconds
      console.log('Time Difference:', timeDiff, 'milliseconds');
      this.seconds = Math.floor(timeDiff / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);
      console.log('Time Difference:', this.hours, 'hours', this.minutes % 60, 'minutes', this.seconds % 60, 'seconds');
      const formattedHours = this.hours + (this.minutes % 60) / 60 
      this.totalHours += formattedHours;
   
      this.startTime = null;
      this.stopTime = null;
      const user ={
        "StartTime":this.startTimeString,
        "StopTime":this.stopTimeString,
        "totalhours":`${this.formatTimeComponent(this.hours)}:${this.formatTimeComponent(this.minutes % 60)}:${this.formatTimeComponent(this.seconds % 60)}`,
        "updateDate":new Date(),
        "status":this.minutes >= 1? 'Approved': 'Pending'
      }
      this.TimesheetArray.push(user)
      this.startTimeString=""
    } else {
      console.warn('Start time is not recorded.');
    }
  }
  
  formatTimeComponent(value: number): string {
    return JSON.stringify(value).length == 2 ? value.toString() : '0' + value;
  }
 

}
