import { Component, DebugElement } from '@angular/core';
import { Login, Register } from 'src/app/Classes/register';
import { RegisterService } from 'src/app/Services/register.service';
import { Router, TitleStrategy } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginUser:Login=new Login();
    allUsers:Register[]=[];
    user:any;
    passworderrormessage:any;
    emailerrormessaage:any;
    constructor(private loginservice:RegisterService,private router:Router){}
    ngOnInit():void{
      this.allRegisteredUsers();
    }
    allRegisteredUsers(){
      this.loginservice.GetAllUsers().subscribe(res=>{
        this.allUsers=res;
      })
    }
    clearEmail(){
      this.emailerrormessaage='';
    }
    clearPass(){
      this.passworderrormessage='';
    }
    LoginUser(){
      this.user=this.allUsers.find(x=>x.email==this.loginUser.Email)?.id;
      //verification of email
      if(this.loginUser.Email==null){
        this.emailerrormessaage="email is required.";
        return;
      }
      else{
        let emailOfId:any=this.allUsers.find(x=>x.id==this.user)?.email;
        if(emailOfId!=this.loginUser.Email){
          this.emailerrormessaage="email is incorrect";
          return;
        }
      }

      //verification of password
      if(this.loginUser.Password==null){
        this.passworderrormessage="password is required.";
        return;
      }   
      else{
        let passOfId:any=this.allUsers.filter(x=>x.id==this.user).find(x=>x.id==this.user)?.password;
        if(passOfId!=this.loginUser.Password){
          console.log("nahi hai");
          this.passworderrormessage="password is incorrect.";
          return;
        }
      }   
      //check
      let userbe:any=this.allUsers.find(u=>u.email==this.loginUser.Email)?.approved;
      console.log("approve",userbe);
      if(userbe==false){
        alert("not approved by admin.");
        return;
      }
      this.loginservice.logged=true;
      debugger;
      this.loginservice.LoginUser(this.loginUser).subscribe((res)=>{
        console.log(res);
        if(res.role=="Admin"){
        Swal.fire({  
            icon: 'success',  
            title: 'Login Successfully',  
            showConfirmButton: false,  
            timer: 1500  
          });  
          this.router.navigateByUrl("/admin-panel");
        }
        if(res.role=="Trainee" && res.approved==true){
          Swal.fire({  
            icon: 'success',  
            title: 'Login Successfully',  
            showConfirmButton: false,  
            timer: 1500  
          });  
          this.router.navigateByUrl("/home");
        }
        
      },(err)=>{
        console.log(err);
      })
    }
}
