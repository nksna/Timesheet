import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeedetailService {

  constructor(private firestore:AngularFirestore) { }
  updateUser(uid: any, newData: any): Promise<void> {
    const userDocRef = this.firestore.collection('users').doc(uid);

    return userDocRef.set(newData, { merge: true })
      .then(() => {
        console.log('User data updated successfully');
      })
      .catch(error => {
        console.error(`Error updating user data for UID ${uid}:`, error);
        throw error;
      });
  }
}
