import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "./services/token.service";
import {Router} from "@angular/router";

/*
  Decoratore @Component:
  - (selector) -> assegnamento nome direttiva, utilizzata per richiamare il componente in un template
  - (templateUrl) -> percorso del file .html contenente il template del componente
  - (stylesUrl) -> stili utilizzati dal template del componente
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// esportazione classe principale, impostazione nome della web-app

export class AppComponent implements OnInit{

  constructor(private router: Router, private tokenService: TokenService) {

  }
  // auto-login
  ngOnInit() {
    const token = this.tokenService.getToken();
    if(token){
      this.router.navigate(['/streams']);
    }else{
      this.router.navigate(['/']);
    }
  }
}
