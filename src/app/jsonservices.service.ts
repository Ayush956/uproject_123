import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class JsonservicesService {
  
  // Get data from api of django
  constructor(private http:HttpClient) { }
  getjsondata(val:string){
    let params = {name:val}
    const url="http://127.0.0.1:8000/api/";
    return this.http.get<any>(url,{params:params});
    // const url="https://api.stockdata.org/v1/data/quote?symbols="+ val +"&api_token=uxnHge6pKBpKNk0c7hP2oQfN2X7QCNIq07boONuI";    
    return this.http.get(url);
  }


}
