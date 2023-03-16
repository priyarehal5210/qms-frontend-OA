import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddSuccess, Success } from '../Classes/register';
@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(private httpclient:HttpClient) { }

  GetAllMySuccess():Observable<any>{
    //jwt header
    var currentUser={token:""};
    var headers=new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null){
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.get<any>("https://localhost:7018/api/UserStatus/",{headers:headers})
  }
  AddMySuccess(usersuccessdata:AddSuccess):Observable<any>{
    var currentUser={token:""};
    var headers=new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null){
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.post<any>("https://localhost:7018/api/UserStatus/",usersuccessdata,{headers:headers});
  }
  UpdateSuccess(editsuccess:AddSuccess):Observable<any>{
    var currentUser={token:""};
    var headers=new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null){
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.put<any>("https://localhost:7018/api/UserStatus/",editsuccess,{headers:headers});
  }
  DeleteSuccess(id:number):Observable<any>{
    var currentUser={token:""};
    var headers=new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null){
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.delete<any>("https://localhost:7018/api/UserStatus/"+id);
  }
}
