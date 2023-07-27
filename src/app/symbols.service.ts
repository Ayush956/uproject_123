import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolsService {

  constructor(private http:HttpClient) { }
  SymData(data:any){
    const url="http://localhost:3000/add_sym";
    return this.http.post(url,data);
  }
  delsym(data:any){
    const url="http://localhost:3000/del_sym";
    return this.http.post(url,data);
  }
}
