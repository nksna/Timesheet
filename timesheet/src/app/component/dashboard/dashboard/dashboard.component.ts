import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  userid: any;
  attendance:any=[];
  attendanceData:any=[];

  constructor(private dashboardservice:DashboardService,private toastrService:ToastrService,private firestore: AngularFirestore){}
  initializeStateFromLocalStorage() {
    const savedStateString = localStorage.getItem('timeTrackingState');
    if (savedStateString) {
      const savedState = JSON.parse(savedStateString);

      if (savedState.STime === 'Start Time') {
        this.startTimeString = savedState.startTimeString;
        this.STime = 'Stop Time';
      }
    }
  }
  ngOnInit() {
    
    const dataget = localStorage.getItem('token2');
    if (dataget != null) {
      this.userid = JSON.parse(dataget);
    }
    this.initializeStateFromLocalStorage()
    this.getAttendance()
  }

  logout() {
    // Implement your logout logic here
    console.log("Logout button clicked");
  }
  saveStateToLocalStorage() {
    const stateToSave = {
      STime: this.STime,
      startTimeString: this.startTimeString,
      // Add other relevant state properties
    };
  
    localStorage.setItem('timeTrackingState', JSON.stringify(stateToSave));}
  starttime(STime:string) {
    if(STime === 'Start Time'){
    this.startTime = new Date();
    this.startTimeString = this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.saveStateToLocalStorage();
    this.STime = 'Stop Time';
    this.stopTimeString = '';
    // console.log('Start Time:', startTimeString);
    // let newdate = JSON.stringify(this.startTime)
    // console.log(newdate,newdate.slice(16,24))
    }
    else{
      this.saveStateToLocalStorage();
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
      this.saveStateToLocalStorage()
      this.starttimemoring()
      const user ={
        "StartTime":this.startTimeString,
        "StopTime":this.stopTimeString,
        "totalhours":`${this.formatTimeComponent(this.hours)}:${this.formatTimeComponent(this.minutes % 60)}:${this.formatTimeComponent(this.seconds % 60)}`,
        "updateDate":new Date(),
        "status":this.minutes >= 1? 'Approved': 'Pending'
      }
      this.TimesheetArray.push(user)
      this.toastrService.success('Login successfully', 'Welcome');
      this.startTimeString=""
    } else {
      console.warn('Start time is not recorded.');
    }
  }
  
  formatTimeComponent(value: number): string {
    return JSON.stringify(value).length == 2 ? value.toString() : '0' + value;
  }
   starttimemoring(){
    const user ={
      "userid":this.userid.uid,
      "StartTime":this.startTimeString,
      "StopTime":this.stopTimeString,
      "totalhours":`${this.formatTimeComponent(this.hours)}:${this.formatTimeComponent(this.minutes % 60)}:${this.formatTimeComponent(this.seconds % 60)}`,
      "updateDate":new Date(),
      "status":this.minutes >= 1? 'Approved': 'Pending'
    }
      this.dashboardservice.StartTime(this.userid.uid,user)
     
      
   }
  
   getAttendance() {
    this.firestore
      .collection('attendace')  // Note: Check if it's 'attendance' instead of 'attendace'
      .get()
      .subscribe((querySnapshot) => {
        this.attendance = [];  // Clear the array before populating it
        const loggedUserId = this.userid.uid;  // Assuming 'uid' is the user id field in the 'userid' object
        debugger
      querySnapshot.forEach((doc) => {
        console.log(doc,"dco")
        this.attendanceData.push(doc.data());
        // if (this.attendanceData.startTime.userid === loggedUserId) {
        //   this.attendance.push(this.attendanceData);
        // }
      });
      this.attendanceData.filter((res:any)=>{
        if (res.uid === loggedUserId) {
          this.attendance.push(res);
        }
      })
      console.log(this.attendance,"data");  // Log the filtered data to the console
    });
  }
  statusCode(code:string){
    let codes;
    switch (code) {
      case 'Approved':
        codes = 'status-success';
        break;
      case 'Pending':
        codes = 'status-pending';
        break;
        case 'Reject':
        codes = 'status-reject';
        break;
      default:
        break;
    }
  return codes;
  }
}
