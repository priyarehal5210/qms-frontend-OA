import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Status} from '../Classes/register';
import { Tasks } from '../Classes/tasks';
import { AssignTask } from '../Classes/assign-tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpclient:HttpClient) { }
 
  GetAllTasks():Observable<any>{
        //jwt header
        var currentUser={token:""};
        var headers= new HttpHeaders();
        headers=headers.set("Authorization","Bearer ");
        var currentUserSession=sessionStorage.getItem('currentUser');
        if(currentUserSession!=null)
        {
          currentUser=JSON.parse(currentUserSession);
          headers=headers.set("Authorization","Bearer "+currentUser.token);
        }
    return this.httpclient.get<any>("https://localhost:7018/api/Tasks",{headers:headers});
  }

  SaveTask(newtask:Tasks):Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.post<any>("https://localhost:7018/api/Tasks/",newtask,{headers:headers});
  }

  UpdateTask(edittask:Tasks):Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.put<any>("https://localhost:7018/api/Tasks/",edittask,{headers:headers})
  }
  DeleteTask(id:number):Observable<Tasks>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.delete<Tasks>("https://localhost:7018/api/Tasks/ "+id);
  }

  //assigned tasks with users
  GetUsersWithTasks():Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.get<any>("https://localhost:7018/api/AssignTasks",{headers:headers});
  }
  SaveUserWithTask(data:AssignTask):Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.post<any>("https://localhost:7018/api/AssignTasks/",data,{headers:headers});
  }
  DeleteAssginTask(id:number):Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.delete<any>("https://localhost:7018/api/AssignTasks/"+id,{headers:headers});
  }
  UpdateStatusOfTask(id:number):Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    return this.httpclient.post<any>("https://localhost:7143/api/Tasks/status/",id,{headers:headers});
  }
  //udapte state
  UpdateState(newData:Status):Observable<any>{
    var currentUser={token:""};
    var headers= new HttpHeaders();
    headers=headers.set("Authorization","Bearer ");
    var currentUserSession=sessionStorage.getItem('currentUser');
    if(currentUserSession!=null)
    {
      currentUser=JSON.parse(currentUserSession);
      headers=headers.set("Authorization","Bearer "+currentUser.token);
    }
    newData.register.token=currentUser.token;
    return this.httpclient.post<any>("https://localhost:7018/api/AssignTasks/updateState/",newData,{headers:headers});
  }

}
