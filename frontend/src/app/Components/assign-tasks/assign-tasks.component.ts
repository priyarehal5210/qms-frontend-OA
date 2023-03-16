import { assertPlatform, Component } from '@angular/core';
import { Router } from '@angular/router';
import { findIndex, groupBy } from 'rxjs';
import { AssignTask } from 'src/app/Classes/assign-tasks';
import { Register, UserWithTask } from 'src/app/Classes/register';
import { Tasks } from 'src/app/Classes/tasks';
import { RegisterService } from 'src/app/Services/register.service';
import { TasksService } from 'src/app/Services/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.scss']
})
export class AssignTasksComponent {
  userWithTask: UserWithTask[] = [];
  allusers: Register[] = [];
  alltasks: Tasks[] = [];
  tasksOfId: any[] = [];
  traineeUsers: any;

  newdata: AssignTask = new AssignTask();

  constructor(private taskser: TasksService, private regser: RegisterService, private router: Router) { };

  ngOnInit(): void {
    this.regser.logged = true;
    this.getalluserswithtask();
    this.gettasks();
    this.getusers();
  }

  getalluserswithtask() {
    this.taskser.GetUsersWithTasks().subscribe(res => {
      this.userWithTask = res;

      console.log("userswithtasks", this.userWithTask);
    })
  }
  gettasks() {
    this.taskser.GetAllTasks().subscribe(res => {
      this.alltasks = res;
      console.log("all tasks are", this.alltasks);
    })
  }
  getusers() {
    this.regser.GetAllUsers().subscribe(res => {
      this.allusers = res;
      console.log("all users are", this.allusers);
      this.traineeUsers = this.allusers.filter(x => x.role == "Trainee"&&x.approved==true);
      console.log(this.traineeUsers);
    })
  }
  selectUser(e: any) {
    console.log(e);
    this.newdata.registerId = e;

    let userOfId = this.allusers.filter(x => x.id == e);
    console.log(userOfId);

    if(userOfId){
      this.tasksOfId = this.userWithTask.filter(x => x.register.id == e);
      console.log(this.tasksOfId);
        var result = this.tasksOfId.map(x => {
          return x.tasks.name;
        })
        let res: any = result;
        console.log(res);
        console.log("old", this.alltasks);
        res.forEach(element => {
          let newtask = this.alltasks.filter(x => x.name !== element);
          console.log(newtask);
          this.alltasks = newtask;
        });
    }
    else {
      this.gettasks();
      this.getusers();
    }
  }
  selectTask(e: any) {
    console.log(e);
    this.newdata.tasksId = e;
    console.log(this.newdata);
  }
  save() {
    this.taskser.SaveUserWithTask(this.newdata).subscribe(res => {
      this.getalluserswithtask();
      this.gettasks();
      this.getusers();
      Swal.fire({  
        icon: 'success',  
        title: 'Assigned Successfully',  
        showConfirmButton: false,  
        timer: 1500  
      });  
      this.clear();
    })
  }
  delete(e: any) {
    this.taskser.DeleteAssginTask(e).subscribe(res => {
      this.getalluserswithtask();
    })
  }
  back() {
    this.router.navigate(['admin-panel'])
  }
  clear(){
    this.newdata.tasksId;
    this.newdata.registerId;
  }
}
