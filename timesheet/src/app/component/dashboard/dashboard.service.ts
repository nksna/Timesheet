import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore:AngularFirestore,private http:HttpClient) { }
  private state = {
    STime: 'Start Time',
    startTimeString: '',
  };

  private timeTrackingStateSubject = new BehaviorSubject(this.state);

  timeTrackingState$ = this.timeTrackingStateSubject.asObservable();

  updateTimeTrackingState(newState: any) {  
    this.state = newState;
    this.timeTrackingStateSubject.next(this.state);
  }
  StartTime(uid:any, payloadStartTime:any,name:any) {
    const attendanceCollectionRef = this.firestore.collection('attendace');
    
    return attendanceCollectionRef.add({
        uid: uid,
        startTime: payloadStartTime,
        name:name
        // Add other fields as needed
      })
      .then((docRef) => {
        console.log('New data added successfully with document ID:', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding new data:', error);
        throw error;
      });
  }
  
  get(){
    return this.http.get('http://localhost:2000/home');
  }
}
