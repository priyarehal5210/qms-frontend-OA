import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,map} from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ApproveVm, Login, Register } from '../Classes/register';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  logged:any;
  currentuserinsession=sessionStorage.getItem('currentUser');
  tokeninfo:any;
  currentuseremail:any="";  //for check user in db
  //decoding of token 

  constructor(private httpclient:HttpClient,private router:Router,private jwthelperservice:JwtHelperService) {

   }
  GetAllUsers():Observable<any>{
    return this.httpclient.get<any>("https://localhost:7018/api/Register/");
  }
  AddNewUser(newuser:Register):Observable<Register>{
    return this.httpclient.post<Register>("https://localhost:7018/api/Register/",newuser);
  }

  LoginUser(loginUser:Login):Observable<any>{    
    return this.httpclient.post<any>("https://localhost:7018/api/Register/login/ ",loginUser).pipe(map(user=>{
      if(user){
        console.log(user);
        this.currentuseremail=user.email;
        console.log("email is",this.currentuseremail);
        sessionStorage['currentUser']=JSON.stringify({token:user.token});
      }
      return user;
    }));
  }
  logout(){
    this.logged=false;
    this.currentuseremail='';
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl("/login");
  }
  ApproveUser(approve:ApproveVm):Observable<ApproveVm>{
    return this.httpclient.post<ApproveVm>("https://localhost:7018/api/Register/approve",approve)
  }
  
  public isAuthenticate():boolean{
    if(this.jwthelperservice.isTokenExpired()){

   
      return false;
    }
    else
    {
      return true;
    }
  }


}
