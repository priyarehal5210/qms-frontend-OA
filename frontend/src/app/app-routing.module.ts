import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
import { AssignTasksComponent } from './Components/assign-tasks/assign-tasks.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { RegisterComponent } from './Components/register/register.component';
import { TasksComponent } from './Components/tasks/tasks.component';
import { UsersStatusComponent } from './Components/users-status/users-status.component';
import { AfterAuthGaurdService } from './Services/after-auth-gaurd.service';
import { UrlsGaurdService } from './Services/urls-gaurd.service';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  // {path:'app',component:AppComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,canActivate:[UrlsGaurdService]},
  
  { path: 'admin-panel', component: AdminPanelComponent,canActivate:[UrlsGaurdService] }, 
  { path: 'tasks', component: TasksComponent, canActivate:[UrlsGaurdService] },
  { path: 'assign-tasks', component: AssignTasksComponent, canActivate:[UrlsGaurdService] },
  {path:'user-status',component:UsersStatusComponent,canActivate:[UrlsGaurdService]},
  {path:'**',component:PageNotFoundComponent,canActivate:[UrlsGaurdService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
