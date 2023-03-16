import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApproveVm, Register } from 'src/app/Classes/register';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  userlist:Register[]=[];
  values:Register[]=[];
  approve:ApproveVm=new ApproveVm();
  constructor (private regser:RegisterService,private router:Router){}

  ngOnInit(): void {
    this.regser.logged=true;
    this.getallusers();
  }
  goToTasks(){
    this.router.navigate(['/tasks']);
  }
  UsersWithTask(){
    this.router.navigate(['/assign-tasks']);
  }
  getallusers(){
    this.regser.GetAllUsers().subscribe((res)=>{
      console.log(res)
      this.values=res;
      var val=this.values.filter(user=>user.role==="Trainee")
      console.log(val);
      this.userlist=val;
      console.log(this.userlist);
    })
  }
 approveme(e:any){
  this.regser.ApproveUser(e).subscribe((res)=>{
    console.log(res);
    this.getallusers();
  },(err)=>{
    console.log(err);
  })
 }
}
