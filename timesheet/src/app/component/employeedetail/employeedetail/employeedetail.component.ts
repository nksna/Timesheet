import { Component, OnInit} from '@angular/core';
import { EmployeedetailService } from './employeedetail.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class UserModel{
  id?:string
  name?:string
  email?:string
  active?:string
}
@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrl: './employeedetail.component.css'
})
export class EmployeedetailComponent  {
  // userName: string = 'John Doe';
  // userAge: number = 25;
  // userEducation: string = 'Bachelor\'s in Computer Science';
  // passedOutYear: number = 2020;
  // employeeId: string = 'EMP123';
  // employeeTeam: string = 'Development';
  // tlName: string = 'Team Lead';
  // userAddress: string = '123 Main St, City';
  // userSkills: string[] = ['Angular', 'JavaScript', 'HTML', 'CSS'];
  // name:any;
  // age:any;
  // form:any;
  // apiAction:any
  // isProfileEmpty:any
  // education:any;
  // passsedout:any;
  // address:any;
  // skills:any;
  // mobilenumber:any;
  // userid: any;
  // userData: any;
  // isLoading:boolean =false;
  // constructor( private employeedetailService:EmployeedetailService, private firestore:AngularFirestore){}
  // ngOnInit() {
  //   this.isLoading =true
  //   const dataget = localStorage.getItem('token2');
  //   if (dataget != null) {
  //     this.userid = JSON.parse(dataget);
  //   }
  //   if (this.userid && this.userid.uid) {
  //     const userIdToFetch = this.userid.uid;

      

  //     // Directly fetch the user document using uid with valueChanges()
  //     this.firestore
  // .collection('users')
  // .doc(userIdToFetch)
  // .valueChanges()
  // .subscribe(
  //   (data) => {
  //     // Handle successful data retrieval
  //     if (data) {
  //       this.userData = data;
  //       console.log('User data for userId1:', this.userData);
  //     } else {
  //       console.log('User not found for userId1');
  //     }
  //   },
  //   (error) => {
  //     // Handle errors
  //     console.error('Error getting user data:', error);
  //   });
  //   }
  //   this.isLoading =false
  // }
  // openQtyModel(userData:any) {
  //   const model = document.getElementById('myModal')
  //   if (model != null) {
  //     model.style.display = "block";
  //   }
  //   this.name=userData.employeename;
  //   this.mobilenumber=userData.Mobilenumber;
  //   this.address=userData.employeeaddress;
  //   this.education=userData.employeeeducation;
  //   this.skills =userData.skills
  // }
  // closeQtyModel() {
  //   const model = document.getElementById('myModal')
  //   if (model != null) {
  //     model.style.display = "none";
  //   }
  // }
  // updateprofile(){
  //   const uid=this.userid.uid;
  //   const user={
  //     "employeename":this.name,
  //     "Age":this.age,
  //     "Mobilenumber":this.mobilenumber,
  //     "employeeeducation":this.education,
  //     "Passedout":this.passsedout,
  //     "employeeaddress":this.address,
  //     "Skills":this.skills
  //   }
  //     this.employeedetailService.updateUser(uid,user)
  //     this.closeQtyModel()
  // }
  allUsers:any=[{id:"2",name:"helo",email:"gfgf",active:"1"},{id:"2",name:"he",email:"gfgf",active:"0"},{id:"1",name:"helo",email:"gfgf",active:"1"}]
searchKey:string=''
page:number=1;


constructor(){}

ngOnInit(): void {
  this.getallusers()
}


// getUserList
getallusers(){
  console.log("Inside all users");

 
      
   
  
}

// remove UserUSer
removeUser(id:any){
  
}

// sort
sortById(){
  this.allUsers.sort((a:any,b:any)=>a.id-b.id)
}

sortBYname(){
  this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
}

generatePDF(){}
}