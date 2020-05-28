import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';

/*
  dichiarazione di un array che contiene dei JSON di tipo di Routes
  che nel DOM di Angular associa ogni sottodominio ad un componente
 */

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent,
  }
];

/*
  Decoratore @NgModule
  - importazione funzionalità necessarie al funzionamento del client-side routing
  - esportazione modulo di routing con tutti i Routes
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
