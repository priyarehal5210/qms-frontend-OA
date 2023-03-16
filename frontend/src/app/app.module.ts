import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptorService } from './Services/jwt-interceptor.service';
import { TasksComponent } from './Components/tasks/tasks.component';
import { AssignTasksComponent } from './Components/assign-tasks/assign-tasks.component';
import { UsersStatusComponent } from './Components/users-status/users-status.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    TasksComponent,
    AssignTasksComponent,
    UsersStatusComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    //will return token if it is in session
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return sessionStorage.getItem('currentUser')?JSON.parse(sessionStorage.getItem('currentUser')as string).token:null;
        }
      }
    })
  ],
  providers: [  {
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
