import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}
  canActivate() {
   return this.auth.$user.pipe(map(res=>{     
      if(res)
      {
      //  console.log("true")
        return true;
      }
      else{
      //  console.log("false")
        this.router.navigate(['/']);
        return false;
      }
     }))
   
    
  }
  
}
