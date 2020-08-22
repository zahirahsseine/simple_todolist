import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProgressComponent } from './progress/progress.component';
import { NotificationComponent } from './notification/notification.component';
import { ListtodoComponent } from './listtodo/listtodo.component';
import { ListingtasksComponent } from './listingtasks/listingtasks.component';
import { HttpClientModule  } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProgressComponent,
    NotificationComponent,
    ListtodoComponent,
    ListingtasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
