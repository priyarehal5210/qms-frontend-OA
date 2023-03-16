import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterService } from './Services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  tokeninfo: any;
  currentuserinsession=sessionStorage.getItem('currentUser');

  constructor(public RegisterService: RegisterService) {
  }
  ngOnInit(){
    
  }
  logoutclick() {
    this.RegisterService.logged = false;
    this.RegisterService.logout();
  }
}
