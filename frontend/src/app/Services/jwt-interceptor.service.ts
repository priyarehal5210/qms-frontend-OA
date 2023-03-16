import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest ,HttpHandler,HttpEvent} from '@angular/common/http';
import{Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser={token:""};
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
    }
    req=req.clone({
      setHeaders:{
        Authorization:"Bearer "+currentUser.token
      }
    
    });
    return next.handle(req);
  }
}
