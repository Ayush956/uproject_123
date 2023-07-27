import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedataService } from '../sharedata.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  login:boolean=true;
  logout:boolean=false;
  constructor(private cookie:CookieService,
    private share:SharedataService,
    private router:Router,
    private snackbar:MatSnackBar){
    if(this.share.getallow()){
      this.login = false;
      this.logout = true;
    }
  }
  
  //To delete the cookie
  deleteCookie(){
    const cookieValue = this.cookie.get('Authorization');
    // console.log(cookieValue)
    // console.log(cookieValue.length)
    if(cookieValue.length>0){
      this.cookie.delete('Authorization');
      window.location.reload();
      // this.router.navigate(['/home']);
      this.snackbar.open('Logged Out Successfully','',{
        duration: 3000
      });
    }
    else{
      this.snackbar.open('Please Login First','',{
        duration: 3000
      });
    }

  }

}
