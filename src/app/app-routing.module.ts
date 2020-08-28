import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingtasksComponent } from './listingtasks/listingtasks.component';
import {LoginComponent} from "./login/login.component"
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
const routes: Routes = [
                         
                          {path:"SignUp",component:SignupComponent},
                          {path:"Tasks",component:ListingtasksComponent,canActivate:[AuthGuard]},
                       
                          {path:"",component:LoginComponent},
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
