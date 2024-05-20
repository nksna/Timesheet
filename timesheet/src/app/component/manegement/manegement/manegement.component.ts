import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ManagementService } from './management.service';
interface Company {
  companyName: string;
  companyHR: string;
  hrContact: string;
}
@Component({
  selector: 'app-manegement',
  templateUrl: './manegement.component.html',
  styleUrl: './manegement.component.css'
})
export class ManegementComponent {
  companyName: any="";
  companyHR: any ="";
  hrContact: any ="";
  serach:any;
  companies:any =[]
  displayedColumns: string[] = ['companyName', 'companyHR', 'hrContact','actions'];
  constructor(private firestore: AngularFirestore,private toastr:ToastrService,private service:ManagementService) {
    this.getAllCompaniesData()
  }
  getAllCompaniesData() {
    this.firestore.collection('companies').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data() as Company;
          return { id, ...data };
        });
      })
    ).subscribe((data: any[]) => {
      this.companies = data;
    });
  }
  submitForm() {
    console.count('test')
    if (this.companyName.trim() === "" && this.companyHR.trim() === "" && this.hrContact.trim() === "") {
      alert("Please fill in all fields.");

    }else{
    this.service.Postmanagement(this.companyName,this.companyHR,this.hrContact)
    this.companyName ="";
    this.companyHR ="";
    this.hrContact =""
    
   }
  }
  
  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.firestore
        .collection('companies')
        .doc(userId)
        .delete()
        .then(() => {
          this.toastr.success('delete user attendance succesfully','')
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
    this.getAllCompaniesData()
  }
    editCompany(userid:any){}
}
