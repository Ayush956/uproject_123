import { Component } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  SignUpData = {
    name: '',
    password: '',
    confirmpassword: ''
  };
  
  constructor(private signup:SignupService,
     private router:Router,
     private snackbar:MatSnackBar){
    
  }
  errorMessage!:any;
  something:string='';
  OnSign(){
    if(this.SignUpData.confirmpassword != this.SignUpData.password){
      this.snackbar.open('Password Mismatch','',{
        duration: 3000
      });
    }
    // console.log(this.SignUpData);
    this.signup.SignData(this.SignUpData).subscribe(
      (data:any) => {
        this.snackbar.open('User Created Successfully','',{
          duration: 3000
        });
        setTimeout(() => {
          this.router.navigate(["/login"]); 
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
  // Below code is to rediect to login page
  // RedirectLog(){
  //   setTimeout(() => {
  //     window.location.href = "/login"; 
  //   }, 1000);
  // }
}
