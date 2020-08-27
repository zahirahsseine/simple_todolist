import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from '../../modules/user';

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  signInForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
  });

  constructor( private route:Router,private authservice:AuthService,private toastr: ToastrService) { 

  }

  ngOnInit(): void {
   
  }
  exist=false

  async loginwithgoogle()
  {
    
      var msg=await this.authservice.signIn("Google")
      msg=="success"?this.route.navigate(["Tasks"]): this.toastr.error(msg,'Message');
     
  }

 async loginwithemail()
  {
    if(this.signInForm.valid)
    {
      var msg=await this.authservice.signIn("Email",this.signInForm.controls.email.value,this.signInForm.controls.password.value)
    
      msg=="success"?this.route.navigate(["Tasks"]): this.toastr.error(msg,'Message');
     
    }
   
  }
}
