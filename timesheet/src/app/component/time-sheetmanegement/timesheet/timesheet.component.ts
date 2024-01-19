import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css',
})
export class TimesheetComponent implements OnInit {
  Userdata: any[]=[];
  userRole: any;
  attendance:any=[];
  userid:any;
  constructor(private firestore: AngularFirestore) {}

   ngOnInit(): void {
     this.getAllUsersData()
     this.getAttendance()
   
     const dataget = localStorage.getItem('token2');
     if (dataget != null) {
       this.userid = JSON.parse(dataget);
     }
     if (this.userid) {
       this.firestore
         .collection('users')
         .doc(this.userid.uid)
         .valueChanges()
         .subscribe(
           (data) => {
             // Handle successful data retrieval
             if (data) {
               this.userRole = data;
               console.log(this.userRole, 'user1');
             } else {
               console.log('User not found for userId1');
             }
           },
           (error) => {
             // Handle errors
             console.error('Error getting user data:', error);
           }
         );
     }
   }
  
  // Assuming you want to fetch data for all users
  getAllUsersData() {
    this.firestore
      .collection('users')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.Userdata.push(doc.data()) 
          // You can do something with each user data here
         console.log(this.Userdata)
        });
      });
  }
  getAttendance() {
    this.firestore
      .collection('attendace')  // Note: Check if it's 'attendance' instead of 'attendace'
      .get()
      .subscribe((querySnapshot) => {
        this.attendance = [];  // Clear the array before populating it
        querySnapshot.forEach((doc) => {
          this.attendance.push(doc.data());
        });
        console.log(this.attendance);  // Log the data to the console
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
