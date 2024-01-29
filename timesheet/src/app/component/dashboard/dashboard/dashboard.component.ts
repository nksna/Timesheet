import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  userName: any;
  newdate = new Date();
  userData: any;
  startTimeString: string = '';
  stopTimeString: string = '';
  startTime: Date | null = null;
  TimesheetArray: any[] = [];
  stopTime: Date | null = null;
  seconds: any;
  minutes: any;
  hours: any;
  userIdToFetch: any;
  totalHours: any = 0;
  totalhour = 0;
  STime: string = 'Start Time';
  userid: any;
  attendance: any = [];
  attendanceData: any = [];
  isLoading:boolean=false;
  attendanceDetails: any = {};
  dropdown: boolean[] = [];

  constructor(
    private dashboardservice: DashboardService,
    private toastrService: ToastrService,
    private firestore: AngularFirestore
  ) { }
  initializeStateFromFirestore(userId?: string) {
    this.firestore
      .collection('userStates')
      .doc(userId)
      .valueChanges()
      .subscribe((savedState: any) => {
        if (savedState && savedState.STime === 'Start Time') {
          this.startTimeString = savedState.startTimeString;
          this.STime = 'Stop Time';
          this.startTime = new Date(this.newdate.toDateString() + ' ' + savedState.startTimeString);
        }
      });
  }

  ngOnInit() {
    this.isLoading=true
    const dataget = localStorage.getItem('token2');
    if (dataget != null) {
      this.userid = JSON.parse(dataget);
    }
    this.initializeStateFromFirestore(this.userid.uid);
    this.getAttendance();
   
  }

  logout() {
    // Implement your logout logic here
    console.log('Logout button clicked');
  }
  saveStateToFirestore(userId: any) {
    const stateToSave = {
      STime: this.STime,
      startTimeString: this.startTimeString,
      // Add other relevant state properties
    };

    this.firestore.collection('userStates').doc(userId).set(stateToSave);
  }
  starttime(STime: string) {
    if (STime === 'Start Time') {
      this.startTime = new Date();
      this.startTimeString = this.startTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const userId = this.userid.uid;
      this.saveStateToFirestore(userId);
      this.STime = 'Stop Time';
      this.stopTimeString = '';
      // console.log('Start Time:', startTimeString);
      // let newdate = JSON.stringify(this.startTime)
      // console.log(newdate,newdate.slice(16,24))
    } else {
      const userId = this.userid.uid;
      this.saveStateToFirestore(userId);
      this.StopTime();
      this.STime = 'Start Time';
    }
  }
  StopTime() {
    if (this.startTime) {
      this.stopTime = new Date();
      this.stopTimeString = this.stopTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const timeDiff = this.stopTime.getTime() - this.startTime.getTime(); // Difference in milliseconds
      console.log('Time Difference:', timeDiff, 'milliseconds');
      this.seconds = Math.floor(timeDiff / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);
      console.log(
        'Time Difference:',
        this.hours,
        'hours',
        this.minutes % 60,
        'minutes',
        this.seconds % 60,
        'seconds'
      );
      const formattedHours = this.hours + (this.minutes % 60) / 60;
      this.totalHours += formattedHours;

      this.startTime = null;
      this.stopTime = null;
      const userId = this.userid.uid;
      this.saveStateToFirestore(userId);
      this.starttimemoring()
      this.toastrService.success('Attendance Done', 'Successfully');
      this.startTimeString = ""
    } else {
      console.warn('Start time is not recorded.');
    }
  }

  formatTimeComponent(value: number): string {
    return JSON.stringify(value).length == 2 ? value.toString() : '0' + value;
  }
  starttimemoring() {
    this.initializeStateFromFirestore()
    const user = {
      userid: this.userid.uid,
      StartTime: this.startTimeString,
      StopTime: this.stopTimeString,
      totalhours: `${this.formatTimeComponent(
        this.hours
      )}:${this.formatTimeComponent(
        this.minutes % 60
      )}:${this.formatTimeComponent(this.seconds % 60)}`,
      updateDate: new Date(),
      status:'Pending',
    };
    this.dashboardservice.StartTime(this.userid.uid, user);
    this.getAttendance()
  }
  removeDuplicatesArrayById:any;
  getAttendance() {
  
    this.firestore
      .collection('attendace') // Note: Check if it's 'attendance' instead of 'attendace'
      .get()
      .subscribe((querySnapshot) => {
        this.attendance = []; // Clear the array before populating it
        this.attendanceData = []; // Clear the array before populating it
        const loggedUserId = this.userid.uid;
        querySnapshot.forEach((doc) => {
          console.log(doc, 'dco');
          this.attendanceData.push(doc.data());
        });
        this.attendanceData.filter((res: any) => {
          if (res.uid === loggedUserId) {
            this.attendance.push(res);
            
          }
        });
        this.isLoading = false
        console.log(this.attendance, 'data'); // Log the filtered data to the console
      });
      this.removeDuplicatesArrayById = this.removeDuplicates(this.attendance, "uid")
      console.log(this.removeDuplicatesArrayById,"newdata") 
    
  }
  removeDuplicates(myArray:any, Prop:any) {
    return myArray.filter((obj:any, pos:any, arr:any) => {
      return arr.map((mapObj:any) => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }
  statusCode(code: string) {
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

  viewAttendance() {
    // Set the details for the modal
    alert("dghg");
   
  }

  editAttendance() {
    // Set the details for the modal
    
    alert("dghg");
  }

  clickonview(index: number) {
    this.dropdown[index] = !this.dropdown[index];
  }
  
}
