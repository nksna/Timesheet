import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetmanagementService {
  constructor(private firestore:AngularFirestore){}
  presentorabsent(uid:any,data:any){
    const attendanceCollectionRef = this.firestore.collection('presentorabsent');
    
    return attendanceCollectionRef.add({
        uid: uid,
        startTime: data,
       
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
 
}
