import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingtasksComponent } from './listingtasks/listingtasks.component';
import { ProgressComponent } from './progress/progress.component';
import { NotificationComponent } from './notification/notification.component';
import {LoginComponent} from "./login/login.component"
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
                         
                          {path:"/SignUp",component:SignupComponent},
                          {path:"/Tasks",component:ListingtasksComponent,canActivate:[AuthGuard]},
                          {path:"/Progress",component:ProgressComponent},
                          {path:"/Notification",component:NotificationComponent},
                          {path:"",component:LoginComponent},
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
