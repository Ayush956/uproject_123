import { Component } from '@angular/core';
import { LoginserviceService } from '../loginservice.service';
import { SharedataService } from '../sharedata.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage!: string;
  constructor(private auth:AuthGuard ,
     private login:LoginserviceService,
     private share:SharedataService ,
      private router:Router,
      private snackbar:MatSnackBar){}

  //Below code helps to bring the data and send it to shared service
  loginData = {
    name: '',
    password: ''
  };
  OnSubmit(){
    console.log(this.loginData);
    this.login.SendData(this.loginData).subscribe(
    (data:any) => {
      this.share.shareallow();
      this.share.getData(data);
      this.snackbar.open('Logged In Successfully','',{
        duration: 3000
      });
      setTimeout(() => {
        this.router.navigate(["/home"]); 
      }, 1000)
    },
    (error) => {
      // Handle the error from the service
      console.log("error is",error)

      this.errorMessage = error.error.error;
      this.snackbar.open(this.errorMessage,'',{
        duration: 3000
      });
    }
  );

  }

  // To redirect page to home after login(1 second)
}
