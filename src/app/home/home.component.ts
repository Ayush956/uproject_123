import { JsonservicesService } from '../jsonservices.service';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SymbolsService } from '../symbols.service';
import { SharedataService } from '../sharedata.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginserviceService } from '../loginservice.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //These variables are declared for stock data fetching
  name!:string;
  open!:number;
  previous_close_price!:number;
  day_high!:number;
  day_low!:number;
  price!:number;
  last_trade_time!:string;
  _week_high!:number;
  _week_low!:number;
  ltp!:number;
  jdata:any;

  //These variables are for viewing the autocomplete list and seeing the list
  myControl = new FormControl('');
  options: string[] = ['TSLA', 'AAPL', 'V','HDB','MSFT'];
  filteredOptions!: Observable<string[]>;
  multiple_sym:Set<string> = new Set<string>();

  //These variables are declared to fetch the data from apis
  array!:any;
  UserName!:string;
  cache_data:any;
  User_id!:number;
  cookieValue:any= 0;


  ngOnInit() {
    //For updating data after every sec and 30 sec
    this.startDataUpdate();
    this.startUpdating();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // For checking the cookie
    const cookieValue = this.cookieService.get('Authorization');
    console.log(cookieValue)
    console.log(cookieValue.length)
    if(cookieValue.length>0){
      this.login.ReceiveData().subscribe((data)=>{
        // console.log((JSON.parse(JSON.stringify(data))))
        this.cache_data =(JSON.parse(JSON.stringify(data)).symbol);
        this.UserName = (JSON.parse(JSON.stringify(data)).name);
        // this.name = (JSON.parse(JSON.stringify(data)).name);
        this.User_id = (JSON.parse(JSON.stringify(data)).id);
        console.log(this.cache_data)
        if(this.cache_data.length>0){
          this.multiple_sym = new Set(this.cache_data);
          console.log(this.cache_data)
          console.log("fsgadghfjh")
        }
      });
    }

    // If cookie not found this code will help after login
    let all_sym:string[]=[];
    this.array= this.share.ShareData();
    console.log(this.array);
    for (let i = 0; i < this.array.data.length; i++) {
      all_sym.push(this.array.data[i]);
  }
    console.log(this.array.Name)
    this.multiple_sym = new Set(all_sym);
    this.UserName = this.array.Name;
    this.User_id = this.array.ID; 
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(private cookieService: CookieService,private login:LoginserviceService,private jsondata:JsonservicesService , private Symservice:SymbolsService,private share:SharedataService){
  }
  
  //When a stock is opened or search getvalue function is called
  getvalue(val:string){
    this.jsondata.getjsondata(val).subscribe((data:any) => {
      this.jdata = data;
      console.log(this.jdata);
      this.name = this.jdata.name;
      this.open = this.jdata.day_open;
      this.previous_close_price = this.jdata.previous_close_price;
      this.day_high = this.jdata.day_high;
      this.day_low = this.jdata.day_low;
      this.price = this.jdata.price;
      this.last_trade_time =this.jdata.last_trade_time;
      this._week_high = this.jdata._week_high;
      this._week_low = this.jdata._week_low;
      this.ltp = (Math.round(this.price / 0.05) * 0.05);
      this.ltp.toFixed(2);
    this.intervalId = setInterval(() => {
      this.getvalue(val);
    }, 30000);
    
  });
  }
  
  
  destroyapi(){
    clearInterval(this.intervalId);
  }

  //Below listed function and varables are for showing or not showing some parts of code
  openstock:boolean=false;
  openstockexpansion:boolean=false;
  showMarketDepth: boolean = false;
  showscalper:boolean=false;
  openstockfun(){
    this.openstock=true;
    this.showMarketDepth=false;
  }
  openstockexp(){
    this.openstockexpansion=true;
  }
  openNewComponent(): void {
    this.showMarketDepth = true;
  }
  closenewcomponent():void{
    this.showMarketDepth=false;
  }
  openscalper():void{
    this.showscalper=true;
  }
  closescalper():void{
    this.showscalper=false;
  }

  //This array is helping to change data of data scalper
  d: number[] = [
    0.35,
    0.30,
    0.20,
    0.15,
    0.10,
  ];
  private intervalId: any;
  startDataUpdate() {
    this.intervalId = setInterval(() => {
      this.updateData();
    }, 1000);
  }
  

  //This function helps to change the bid and ask value
  second:boolean=false;
  updateData() {
    if(this.second){
      this.ltp-=0.05;
      this.second=false;
    }
    else{
    this.ltp+=0.05;
    this.second=true;
    }
}

    //Generating random values
    value:number = 1;
    startUpdating(): void {
      setInterval(() => {
        this.value = Math.floor(Math.random() * 100);
      }, 1000);
    }
    
    // When a add button hit below function help data to add in database
    add_func(new_val:string):void{
      
      const symbol = {
        "UserID": this.User_id,
        "StockSym":new_val
      }
      this.multiple_sym.add(new_val);
      console.log(this.multiple_sym)
      this.Symservice.SymData(symbol).subscribe();
      console.log(this.multiple_sym)
    }

    deletefunc(){
      const symbol = {
        "UserID": this.User_id,
        "StockSym":this.name,
      }
      this.multiple_sym.delete(this.name);
      console.log(this.multiple_sym)
      this.Symservice.delsym(symbol).subscribe();
      console.log(this.multiple_sym)
    }
    
    //Below function help to close another expanaded panel when opening other
    expandedPanels: boolean[] = [];

  togglePanel(index: number): void {
    this.expandedPanels[index] = !this.expandedPanels[index];
    this.closeOtherPanels(index);
  }

  closeOtherPanels(selectedIndex: number): void {
    this.expandedPanels.forEach((value, index) => {
      if (index !== selectedIndex) {
        this.expandedPanels[index] = false;
      }
    });
  }
  }


