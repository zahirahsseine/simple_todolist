import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { user } from '../../modules/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import *as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  
signUpForm = this.fb.group(
    {
                  email: new FormControl('',[Validators.required,Validators.email]),
                  password: new FormControl('',[Validators.required,Validators.minLength(8)]),
                  confPassword: new FormControl('',[Validators.required,Validators.minLength(8)])
       },
        {
                  validators: MatchPassword('password', 'confPassword')
      }
  );

  
  constructor(private route: Router,private toastr: ToastrService,private authservice:AuthService,private fb: FormBuilder) {
  
   }
  
  ngOnInit(): void {
  }
  exist:boolean
  async signupnwithgoogle()
  {
    
      var msg=await this.authservice.signUp("Google")
      msg=="success"?this.route.navigate(["/"]): this.toastr.error(msg,'Message');
  
  }
 
  async signupnwithemail()
  {
    if(this.signUpForm.valid)
    {
      var msg=await this.authservice.signUp("Email",this.signUpForm.controls.email.value,this.signUpForm.controls.password.value)
    
      msg=="success"?this.route.navigate(["/"]): this.toastr.error(msg,'Message');
      

    }
 
  }
}

export function MatchPassword(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }


}
