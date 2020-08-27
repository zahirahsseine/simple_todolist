import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import *as firebase from 'firebase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name:string;
  constructor(private fauth: AngularFireAuth) {
    fauth.authState.subscribe(u=>{
      this.name=u.displayName;

    })
   }

  ngOnInit(): void {
  }
  signout()
  {
    
       this.fauth.auth.signOut();
  }
}
