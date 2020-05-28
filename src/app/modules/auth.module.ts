import { AuthTabsComponent } from './../components/auth-tabs/auth-tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
  Decoratore @NgModule:
  - Dichiarazione dei componenti di routing, login e signup
  - Importazione di tutti i moduli necessari alla creazione della schermata di autenticazione
  - Esportazione modulo di autenticazione
  - Dichiarazione del service delegato al transito dei dati tra front-end e back-end
 */

@NgModule({
  declarations: [AuthTabsComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [AuthTabsComponent],
  providers: [AuthService]
})
export class AuthModule {}
