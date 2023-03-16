import { Component } from '@angular/core';
import { Success } from 'src/app/Classes/register';
import { RegisterService } from 'src/app/Services/register.service';
import { SuccessService } from 'src/app/Services/success.service';

@Component({
  selector: 'app-users-status',
  templateUrl: './users-status.component.html',
  styleUrls: ['./users-status.component.scss']
})
export class UsersStatusComponent {
   status:Success[]=[];
   constructor(private regser:RegisterService,private statusser:SuccessService){}
   
   ngOnInit():void{
    this.getallsuccess();
   }
   getallsuccess(){
    this.regser.logged=true;
    this.statusser.GetAllMySuccess().subscribe(res=>{
      console.log(res);
      this.status=res;
    })
   }
}
