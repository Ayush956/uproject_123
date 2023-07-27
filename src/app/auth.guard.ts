import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SharedataService } from './sharedata.service';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AnimationDurations } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  allow!: boolean;
  constructor(private router: Router, 
    private share: SharedataService,
    private cookieService:CookieService,
    private snackbar:MatSnackBar) {
    
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Your authentication logic here
    // For example, you can check if the user is logged in or has valid credentials
    // this.allow = this.share.getallow()
    const cookieValue = this.cookieService.get('Authorization');
    // console.log(cookieValue)
    console.log(cookieValue.length)
    if(cookieValue.length>0 || this.share.getallow()===true){
      console.log(this.share.getallow())
      this.allow=true;
    }
    if (route.routeConfig?.path === "home") {

      // console.log(this.allow);


      if (this.allow) {
        // User is authenticated, allow navigation
        return true;
      } else {
        // User is not authenticated, redirect to login page or handle as needed
        this.router.navigate(['/login']);
        this.snackbar.open('Please Login To Use That Feature','',{
          duration: 3000
        });
        return false;
      }
    } else if (route.routeConfig?.path === "login") {
      console.log("abhi-lg",this.allow);
      
      if (this.allow) {
        this.router.navigate(['/home']);
        this.snackbar.open('Please Logout To Use That Feature','',{
          duration: 3000
        });
        return false;
      }

    }
    return true;
  }
}
