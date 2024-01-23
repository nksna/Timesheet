import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css',
})
export class TimesheetComponent implements OnInit {
  Userdata: any[] = [];
  userRole: any;
  attendance: any = [];
  userid: any;
  attendanceData: any;

  constructor(private firestore: AngularFirestore) { }

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
          const attendanceData = doc.data();
          const attendanceId = doc.id;
          // Include both data and ID in the array
          this.attendance.push({ id: attendanceId, data: attendanceData });

        });
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
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.firestore
        .collection('attendace')
        .doc(userId)
        .delete()
        .then(() => {
          console.log('User deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
    this.getAttendance()
  }

  approveAttendance(attendanceId: string) {
    // Assuming 'attendace' is the correct collection name
    this.updateAttendanceStatusByUserId(attendanceId, 'Approved');
    this.getAttendance()
  }

  rejectAttendance(attendanceId: string) {
    // Assuming 'attendace' is the correct collection name
    this.updateAttendanceStatusByUserId(attendanceId, 'Reject');
    this.getAttendance()
  }

  private updateAttendanceStatusByUserId(userId: string, status: string) {


    // Check if a matching document was found

    // Update the document with the new status
    this.firestore
      .collection('attendace')
      .doc(userId)

      .update({
        'startTime.status': status,
        // Add other fields you may want to update here
      })
      .then(() => {
        console.log('Attendance status updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating attendance status:', error);
      })


  }
}