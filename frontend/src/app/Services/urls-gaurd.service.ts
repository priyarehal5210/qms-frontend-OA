import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterService } from './register.service';
@Injectable({
  providedIn: 'root'
})
export class UrlsGaurdService {
  tokeninfo: any;
  currentuserinsession=sessionStorage.getItem('currentUser');

  constructor(private regser:RegisterService,private router:Router) { 
 
  }

   
  canActivate(next:ActivatedRouteSnapshot,route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | UrlTree
  {
    if(this.regser.isAuthenticate()){
      // debugger
      // var token: any = this.currentuserinsession;
      // const helper = new JwtHelperService();
      // const decoded = helper.decodeToken(token);
      // this.tokeninfo = decoded;
      // var role=this.tokeninfo.role;
      // console.log(role);
      // if(role==="Admin"){
      //   this.router.events.forEach((event)=>{
      //     if(event instanceof NavigationEnd){
      //       if(event['url'].includes('/home')){
      //        this.router.navigate(['/login']);
      //        sessionStorage.clear();
      //        return;
      //       }
      //     }
      //   });
      // }else if(role==="Trainee"){
      //   this.router.events.forEach((event)=>{
      //     if(event instanceof NavigationEnd){
      //       if(event['url'].includes('/admin-panel')||event['url'].includes('/tasks')||event['url'].includes('/assign-tasks')||event['url'].includes('/user-status')){
      //         this.router.navigate(['/login']);
      //         sessionStorage.clear();
      //       }
      //     }
      //   });
      // }
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
 
  }