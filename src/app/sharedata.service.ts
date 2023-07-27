import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  constructor() { }
  data!:any;
  allow!:boolean;

  getData(val:any){
    this.data = val;
  }
  ShareData(){
    return this.data;
  }
  shareallow(){
    this.allow=true;
    console.log(this.allow)
  }
  getallow(){
    console.log(this.allow)
    return this.allow;
  }
  
  
}
