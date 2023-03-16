import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { AddSuccess, Status, Success } from 'src/app/Classes/register';
import { RegisterService } from 'src/app/Services/register.service';
import { SuccessService } from 'src/app/Services/success.service';
import { TasksService } from 'src/app/Services/tasks.service';
import { Workbook } from 'exceljs';
import * as Xlsx from 'xlsx';
import * as fs from 'file-saver';
import { AssignTask } from 'src/app/Classes/assign-tasks';
import Swal from 'sweetalert2';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  usersuccessdata: AddSuccess = new AddSuccess();
  newDate: Status = new Status();
  success: Success[] = [];
  taskIdis: any;
  tasks: AssignTask = new AssignTask();
  currentuserinsession = sessionStorage.getItem('currentUser');
  data: any;
  dataOfId: any;
  tokeninfo: any;
  particularsuccess: any;
  editsuccess: AddSuccess = new AddSuccess();
  errorfordate: any;
  startedTask: any;
  filterdadata: any;
  storingData: any;
  completedTask: any;
  name = 'ExcelSheet.xlsx';
  
  constructor(
    public regser: RegisterService,
    private taskser: TasksService,
    private successservice: SuccessService,
    private router:Router
  ) {
    var token: any = this.currentuserinsession;
    console.log(token);
    const helper = new JwtHelperService();
    const decoded = helper.decodeToken(token);
    this.tokeninfo = decoded;
    console.log(decoded);
}
  ngOnInit(): void {
    this.regser.logged = true;
    this.gettasks();
    this.getallsuccess();
    
 
  }
  gettasks() {
    this.taskser.GetUsersWithTasks().subscribe((res) => {
      this.data = res;
      console.log('whole data', this.data);
      this.dataOfId = this.data.filter(
        (u) => u.registerId== this.tokeninfo.nameid
      );
      console.log('particular data', this.dataOfId);
      this.startedTask = this.dataOfId.filter(
        (x) => x.isChecked == true && x.status == 'started'
      );
      console.log("started tasks",this.startedTask);
      this.completedTask = this.data.filter(
        (x) =>
          x.status == 'completed' &&
          x.registerId == this.tokeninfo.nameid
      );
      console.log("completed task",this.completedTask);
      if (this.completedTask) {
        var result = this.completedTask.map((x) => {
          return x.tasks.name;
        });
        console.log('completed', result);
        let allcompletedtask: any = result;
        console.log(allcompletedtask);
        allcompletedtask.forEach((ele) => {
          console.log('old', this.startedTask);
          let newTask = this.startedTask.filter((x) => x.tasks.name !== ele);
          this.startedTask = newTask;
          console.log('new', newTask);
          return;
        });
      }
    });
  }
  getallsuccess() {
    this.successservice.GetAllMySuccess().subscribe((res) => {
      console.log('all success of all users', res);
      this.success = res;

      console.log('yeh hai', this.success);

      this.particularsuccess = this.success.filter(
        (u) => u.assignTasks.registerId == this.tokeninfo.nameid
      );
      console.log('meri success', this.particularsuccess);
    });
  }
  dateup() {
    this.filterdadata = this.startedTask.find(
      (x) => x.tasksId == this.taskIdis
    ).tasks.endDate;
    console.log('end date', this.filterdadata);
    let userdate = this.usersuccessdata.date;
    console.log('user date', userdate);

    if (userdate > this.filterdadata) {
      this.errorfordate = 'within start-date and end-date';
      return;
    } else {
      this.errorfordate = '';
      return;
    }
  }
  savedata() {
    let userid: any = this.dataOfId.find(
      (x) => x.registerId == this.tokeninfo.nameid
    ).registerId;
    console.log('user id is', userid);
    let assignidofuser: any = this.data.find(
      (x) => x.registerId == userid && x.tasksId == this.taskIdis
    ).id;
    console.log(assignidofuser);
    this.usersuccessdata.assignTasksId = assignidofuser;
    this.successservice.AddMySuccess(this.usersuccessdata).subscribe((res) => {
      console.log(res);
      this.storingData = res;
      Swal.fire({  
        position: 'top-end',  
        icon: 'success',  
        title: 'Added Successfully',  
        showConfirmButton: false,  
        timer: 1500  
      });  
      console.log(this.storingData);
      //IF STATUS DATE == END DATE OF TASK
      if (this.storingData.date === this.filterdadata) {
        console.log('reached');
        //call api for done status and remove this task from dropdown.
        let regOfUser: any = this.data
          .filter((x) => x.id == this.storingData.assignTasksId)
          .find((x) => x.id == this.storingData.assignTasksId).register;
        console.log(regOfUser);

        let taskOfUser: any = this.data
          .filter((x) => x.id == this.storingData.assignTasksId)
          .find((x) => x.id == this.storingData.assignTasksId).tasks;
        console.log(taskOfUser);
        
        this.newDate.tasks = taskOfUser;
        this.newDate.register = regOfUser;
        this.newDate.register.token = this.currentuserinsession;
        this.taskser.UpdateState(this.newDate).subscribe((res) => {
          Swal.fire({  
            position: 'top-end',  
            icon: 'success',  
            title: 'Added Successfully',  
            showConfirmButton: false,  
            timer: 1500  
          }); 
          this.getallsuccess();
          this.gettasks();
        });
      }
      // //revoming task
      this.getallsuccess();
    });
  }
  edit(e: any) {
    console.log(e);
    this.editsuccess = e;
  }
  update() {
    console.log(this.editsuccess);
    this.successservice.UpdateSuccess(this.editsuccess).subscribe((res) => {
      console.log(res);
      this.getallsuccess();
    });
  }
  delete(s: any) {
    console.log(s);
    this.successservice.DeleteSuccess(s).subscribe((res) => {
      this.getallsuccess();
    });
  }
  subtask(e: any) {
    this.taskIdis = e;
    console.log('task id is', this.taskIdis);
  }

  export() {
    let element = document.getElementById('tbl');
    const ws: Xlsx.WorkSheet = Xlsx.utils.table_to_sheet(element);
    const wb: Xlsx.WorkBook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    Xlsx.writeFile(wb, this.name);
  }
  checkme(e: any) {
    console.log(e);
    this.newDate = e;
    console.log(this.newDate);
    this.newDate.register.token = this.currentuserinsession;
    this.taskser.UpdateState(this.newDate).subscribe((res) => {
      console.log(res);
      this.gettasks();
    });
  }
}
