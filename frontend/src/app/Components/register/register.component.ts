import { Component } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { Register } from 'src/app/Classes/register';
import{RegisterService} from 'src/app/Services/register.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  UsersList:Register[]=[];
  newuser:Register=new Register();
  user:any;
  emailerromessage:any;
  passworderrormessage:any;
  constructor(private registerService:RegisterService,private router:Router){}

  ngOnInit(): void {
    this.getAllRegisteredUsers();
  }
  getAllRegisteredUsers(){
    this.registerService.GetAllUsers().subscribe((res)=>{
      console.log(res);
      console.log(this.UsersList);
      this.UsersList=res;
    },(err)=>{
      console.log(err);
    })
  }
 
  addUser(){
    this.user=this.UsersList.find(x=>x.email==this.newuser.email);
    console.log(this.user);
    //email verification
    if(this.user){
      this.emailerromessage="email is in use"
      return;
    }
    //passwords verification'
    if(this.newuser.password!=this.newuser.confirmPassword){ 
      this.passworderrormessage="passwords should match";
      return;
    }
    this.newuser.approved=false;
    this.newuser.role="";
    this.newuser.emailConfirm=false;
    console.log(this.newuser);
    this.registerService.AddNewUser(this.newuser).subscribe((res)=>{
      console.log(res);
      console.log(this.newuser);
      this.getAllRegisteredUsers();
      this.clear();
      Swal.fire({  
        icon: 'success',  
        title: 'Registered Successfully',  
        showConfirmButton: false,  
        timer: 1500  
      });  
      this.router.navigateByUrl("\login");
    },(err)=>{
      console.log(err);
    })
  }
  clear(){
    this.newuser.userName="";
    this.newuser.email="";
    this.newuser.password="";
    this.newuser.confirmPassword="";
    this.emailerromessage='';
    this.passworderrormessage='';
  }
  clearemail(){
    this.emailerromessage='';
  }
  passclear(){
    this.passworderrormessage='';
  }
}
