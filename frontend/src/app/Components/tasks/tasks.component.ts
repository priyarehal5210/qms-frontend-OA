import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Register} from 'src/app/Classes/register';
import { Tasks } from 'src/app/Classes/tasks';
import { RegisterService } from 'src/app/Services/register.service';
import { TasksService } from 'src/app/Services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  tasks:Tasks[]=[];
  users:Register[]=[];
  traineeuser:any;
  traineetask:any;
  newtask:Tasks=new Tasks();
  edittask:Tasks=new Tasks();
  constructor(private taskser:TasksService,private regser:RegisterService,private router:Router){}

  ngOnInit():void{
    this.regser.logged=true;
    this.getalltasks();
    this.getallusers();
  }
  entername(event:any){
    if(event.target.selectionStart==0 && event.code=='Space'){
     event.preventDefault();
    }
  }
  getallusers(){
    this.regser.GetAllUsers().subscribe(res=>{
      this.users=res;
      this.traineeuser=this.users.filter(u=>u.role=="trainee");    
      console.log(this.traineeuser);
    })
  }
  getalltasks(){
    this.taskser.GetAllTasks().subscribe(res=>{
      this.tasks=res;
      console.log(this.tasks);
    })
  }
  editclick(e:any){
    console.log(e);
    this.edittask=e;
  }
 savetask(){
  console.log(this.newtask);
  this.taskser.SaveTask(this.newtask).subscribe(res=>{
    Swal.fire({  
      icon: 'success',  
      title: 'Added Successfully',  
      showConfirmButton: false,  
      timer: 1500  
    });  
    this.getalltasks();
    this.clear();
  })
 }
 update(){
  this.taskser.UpdateTask(this.edittask).subscribe(res=>{
    Swal.fire({  
      icon: 'success',  
      title: 'Updated Successfully',  
      showConfirmButton: false,  
      timer: 1500  
    });  
    this.getalltasks();
  })
 }
 delete(e:any){
  this.taskser.DeleteTask(e).subscribe(res=>{
    Swal.fire({  
      icon: 'success',  
      title: 'deleted Successfully',  
      showConfirmButton: false,  
      timer: 1500  
    });  
    this.getalltasks();
  })
 }
 back(){
  this.router.navigate(['admin-panel'])
 }
 clear(){
  this.newtask.name='';
  this.newtask.description='';
  this.newtask.startDate='';
  this.newtask.endDate='';
 }
}
