import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList, DatabaseSnapshot } from 'angularfire2/database';
import { user } from '../../modules/user';
import { auth, User } from 'firebase';
import *as firebase from 'firebase';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:firebase.User;
  userObj:user=new user()
  public users: AngularFireList<user>
  _db:AngularFireDatabase

  $user:Observable<firebase.User>
  constructor(private fauth: AngularFireAuth,db: AngularFireDatabase) { 
    this.users = db.list('/users')
    this._db=db
    this.$user=fauth.authState
  }
  
   getcurrentuser():string
  {
    console.log(this.fauth.auth.currentUser.uid)
    return  this.fauth.auth.currentUser.uid
  }
async gtId(type,method,email?:string,password?:string):Promise<string>
{
  var functionToConnect=method=="Google"?
  this.fauth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  :(type=="Old"?this.fauth.auth.signInWithEmailAndPassword(email,password):this.fauth.auth.createUserWithEmailAndPassword(email,password)) 
    
  return await functionToConnect.then(res=>{
  
        return res.user.uid

}).catch(error=>{
 return error.message
})
}
SendVerificationMail() {
  return this.fauth.auth.currentUser.sendEmailVerification()
  
}
async getmessage(id):Promise<any>
{
  var ref = firebase.database().ref("/users")
 
              let dataSnapshot = await ref.orderByChild("id").equalTo(id).once("value"); 

              return dataSnapshot.exists()?"success":"Sorry! your cridentials are not valid!"
}

  
  async signIn(method:string,email?:string,password?:string):Promise<string>
  {
   var id=await this.gtId("Old",method,email,password)
   var message=await this.getmessage(id)
    if(message=="success" && this.fauth.auth.currentUser.emailVerified==false)
   {
     return "please provide your email for confirm your account"
   }
   else if(message=="success")
   {
     
      return "success"
   }
   else{
    return message
   }
   
  }
  signOut()
  {
   
    this.fauth.auth.signOut()
  }
  async  signUp(method:string,email?:string,password?:string):Promise<string>
  {
   
    var ref = firebase.database().ref("/users")
    var id=await this.gtId("New",method,email,password)
    var message=await this.getmessage(id)
         if(message=="success")
        {
          return "You are already a member!";
        }
        else{
          this.userObj.id=id
          this.users.push(this.userObj)
          this.SendVerificationMail() 
         // this.fauth.auth.signOut()
          return "success";
        } 
     
   
   
  }
}
