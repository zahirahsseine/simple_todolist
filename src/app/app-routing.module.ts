import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingtasksComponent } from './listingtasks/listingtasks.component';
import { ProgressComponent } from './progress/progress.component';
import { NotificationComponent } from './notification/notification.component';
const routes: Routes = [
                          {path:"",component:ListingtasksComponent},
                            {path:"Progress",component:ProgressComponent},
                              {path:"Notification",component:NotificationComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
