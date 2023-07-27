import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  SendData(data:any){
    const url = "http://localhost:3000/login"
    return this.http.post(url,data, { withCredentials: true })
    .pipe(
      catchError((error) => {
        // Handle the error here
        console.log(error)
        throw (error)
      }));
  }
 
  // To check cookie is there and recieve data
  ReceiveData() {
    const url = 'http://localhost:3000/validate';

    // Get the "Authorization" cookie value from document.cookie
    const authorizationCookie = this.getCookie('Authorization');
    
    // Set the "Authorization" header with the cookie value
    const headers = new HttpHeaders().set('Authorization', authorizationCookie);

    // Make the HTTP GET request with the "Authorization" header
    return this.http.get(url, { headers, withCredentials: true });
  }
  private getCookie(name: string): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift()?.trim() || '';
    }
    return '';
  }
}
