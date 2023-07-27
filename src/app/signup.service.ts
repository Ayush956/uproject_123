import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  SignData(data:any){
    const url="http://localhost:3000/signup";
    return this.http.post(url,data).pipe(
      catchError((error) => {
        // Handle the error here
        console.log(error)
        throw (error)
      }));;
  }
}
