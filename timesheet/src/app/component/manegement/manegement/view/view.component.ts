import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
interface Company {
  companyName: string;
  companyHR: string;
  hrContact: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  userId: any;
viewdetail:any;
  detail: any;
  constructor(private route: ActivatedRoute,private firestore:AngularFirestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('user');
      // Fetch the user details using this.userId
      console.log(this.userId);
      this.getAllCompaniesData()
    });
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
      this.viewdetail = data;
      console.log('All Companies Data:', this.viewdetail);

      // Filter data within the subscribe callback
      this.detail = this.viewdetail.filter((res: any) => {
        if (res.id === this.userId) {
          console.log('Matching Company ID:', res.id);
          return true;
        }
        return false;
      });
      console.log('Matching Company ID:',this.detail);
})}
}