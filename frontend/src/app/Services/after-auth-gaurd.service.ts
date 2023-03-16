import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGaurdService {

  tokeninfo:any;
  constructor(private regser:RegisterService,private route:Router) { }

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      const currentuser=this.regser.currentuserinsession;
      var token: any = currentuser;
    console.log(token);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.tokeninfo = decoded;
    console.log(decoded);
    if(this.tokeninfo.role=="Admin"){
      return true;
    }
    else{
      this.route.navigate(['/PageNotFoundComponent']);
      return false;
    }
  }
}
