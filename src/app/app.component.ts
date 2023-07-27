import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginserviceService } from './loginservice.service';
import { HttpHeaders } from '@angular/common/http';
import { SharedataService } from './sharedata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'utrade';

  constructor(private cookieService: CookieService,private login:LoginserviceService,private share:SharedataService) {
    // const isCookieExists = this.cookieService.isCookieExists('Authorization');
  
    
  }
  ngOnInit() {
    
    
    
    
  }
  
}
