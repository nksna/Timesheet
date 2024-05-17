import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
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
 
  companies:any =[]
  displayedColumns: string[] = ['companyName', 'companyHR', 'hrContact','actions'];
  constructor(private firestore: AngularFirestore,private toastr:ToastrService) {
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
    if (this.companyName.trim() === "" || this.companyHR.trim() === "" || this.hrContact.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    const duplicateCompany = this.companies.find((company:any) => 
      company.companyName.toLowerCase() === this.companyName.toLowerCase() &&
      company.companyHR.toLowerCase() === this.companyHR.toLowerCase() &&
      company.hrContact.toLowerCase() === this.hrContact.toLowerCase()
    );
  
    if (duplicateCompany) {
      alert("Duplicate company detected.");
      return;
    }
  
    this.firestore.collection('companies').add({
      companyName: this.companyName,
      companyHR: this.companyHR,
      hrContact: this.hrContact
    }).then(() => {
      console.log('Company added successfully!');
      this.companyName = '';
      this.companyHR = '';
      this.hrContact = '';
    }).catch((error) => {
      console.error('Error adding company: ', error);
    });
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
