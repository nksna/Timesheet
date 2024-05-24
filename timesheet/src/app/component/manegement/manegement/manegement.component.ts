import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ManagementService } from './management.service';
import { Router } from '@angular/router';
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
  example: any = "";
  userid:any;
  serach:any;
  companies:any =[]
  updatedata:boolean = false;
  adddata:boolean = true;
  displayedColumns: string[] = ['companyName', 'companyHR', 'hrContact','actions','View'];
  constructor(private firestore: AngularFirestore,private toastr:ToastrService,private service:ManagementService,private route:Router) {
    this.getAllCompaniesData()
  }
  userRole: any;
  useradminid:any;
  
 
  ngOnInit() {
    const dataget = localStorage.getItem('token2');
    if (dataget != null) {
      this.useradminid = JSON.parse(dataget);
    }
    if (this.useradminid) {
      this.firestore
        .collection('users')
        .doc(this.useradminid.uid)
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
    if (this.companyName === "" && this.companyHR === "" && this.hrContact === "") {
      alert("Please fill in all fields.");

    }else{
    this.service.Postmanagement(this.companyName,this.companyHR,this.hrContact,this.example)
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
    editCompany(userid:any){
      this.adddata = false;
      this.updatedata = true;
      this.companyName = userid.companyName
      this.companyHR = userid.companyHR
      this.hrContact = userid.hrContact
  this.userid = userid.id
  this.example = userid.example
    }

    editUser() {
      if (confirm('Are you sure you want to edit this user?')) {
        this.firestore
          .collection('companies')
          .doc(this.userid)
          .update({
            companyName: this.companyName,
            companyHR: this.companyHR,
            hrContact: this.hrContact,
            example:this.example
          })
          .then(() => {
            this.toastr.success('User edited successfully', '');
            this.companyName ="";
    this.companyHR ="";
    this.hrContact =""
    this.example =""
          })
          .catch((error) => {
            console.error('Error editing user:', error);
          });
      }
      this.updatedata = false;
      this.adddata = true;
      
      this.getAllCompaniesData();
    }
    Viewdetails(user:any){
this.route.navigate(['./Layout/Interview/view', user.id])
    }
}
