import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
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
  isLoading: boolean=false;

  constructor(private firestore: AngularFirestore,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllUsersData()
    this.getAttendance()
    this.isLoading=true
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
            
            if (data) {
              this.userRole = data;

            } else {
              console.log('User not found for userId1');
            }
          },
          (error) => {
            
            this.toastr.error('Error updating attendance status:', error)
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
          this.isLoading = false
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
          this.toastr.success('delete user attendance succesfully','')
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

    if (confirm('Are you sure?')) {
    this.firestore
      .collection('attendace')
      .doc(userId)

      .update({
        'startTime.status': status,
        // Add other fields you may want to update here
      })
      .then(() => {
       this.toastr.success('update succesfully',status)
      })
      .catch((error) => {
        this.toastr.error('Error updating attendance status:', error)

       
      })


  }}
  searchTerm: string = '';
  sortField: string = 'SNo';
  sortDirection: string = 'asc';

  get filteredAttendance() {
    let filteredData = this.attendance.filter((item:any) =>
      item.data.startTime.userid.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.data.startTime.StartTime.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.data.startTime.StopTime.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.data.startTime.totalhours.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.data.startTime.updateDate.toDate().toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.data.startTime.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.data.startTime.updateby.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
    return filteredData.sort((a:any, b:any) => {
      const fieldA = a.data.startTime[this.sortField].toString().toLowerCase();
      const fieldB = b.data.startTime[this.sortField].toString().toLowerCase();
  
      let comparison = 0;
      if (fieldA > fieldB) {
        comparison = 1;
      } else if (fieldA < fieldB) {
        comparison = -1;
      }
  
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  sortData(field: string) {
    if (field === this.sortField) {
      // If the same field is clicked, toggle the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different field is clicked, set the new field and default to ascending
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }
}
