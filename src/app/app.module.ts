import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsComponent } from './components/streams/streams.component';
import { StreamsModule } from './modules/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';

/*
  Decoratore @NgModule:
  - Dichiarazione del componente principale
  - Importazione di tutti i moduli che compongono la web-app
  - Caricamento in memoria del componente principale
 */

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, AuthRoutingModule, StreamsModule, StreamsRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})

// rende disponibile il modulo al file "main.ts"
export class AppModule {}
