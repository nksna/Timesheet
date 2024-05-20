import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private firestore: AngularFirestore) { }

  Postmanagement(companyName:any,companyHR:any,hrContact:any){

    const attendanceCollectionRef = this.firestore.collection('companies');
    
    
     attendanceCollectionRef.add({
      companyName: companyName,
      companyHR: companyHR,
      hrContact: hrContact
    }).then((docRef) => {
      console.log('New data added successfully with document ID:', docRef.id);
      
    }).catch((error) => {
      console.error('Error adding company: ', error);
    });
}}
