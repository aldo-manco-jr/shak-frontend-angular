import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsComponent } from './components/streams/streams.component';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor';

/*
  Decoratore @NgModule:
  - Dichiarazione del componente principale
  - Importazione di tutti i moduli che compongono la web-app
  - Caricamento in memoria del componente principale
 */

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule, StreamsModule, StreamsRoutingModule],
  providers: [CookieService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})

// rende disponibile il modulo al file "main.ts"
export class AppModule {}
