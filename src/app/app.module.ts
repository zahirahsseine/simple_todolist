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
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProgressComponent,
    NotificationComponent,
    ListtodoComponent,
    ListingtasksComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule, HttpClientModule,AngularFireModule,AngularFireDatabaseModule,AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firbase),  BrowserAnimationsModule, // required animations module
    // ToastrModule added
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
