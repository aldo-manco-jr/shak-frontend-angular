import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

/*
  Decoratore @NgModule:
  - Dichiarazione del componente principale
  - Importazione di tutti i moduli che compongono la web-app
  - Caricamento in memoria del componente principale
  - Creazione del cookie lato front-end
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule
  ],
  providers: [
    CookieService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [
    AppComponent
  ]
})

// rende disponibile il modulo al file "main.ts"
export class AppModule {}
