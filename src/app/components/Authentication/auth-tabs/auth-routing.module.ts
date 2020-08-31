import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from './auth-tabs.component';

/*
  dichiarazione di un array che contiene dei JSON di tipo di Routes
  che nel DOM di Angular associa ogni sottodominio ad un componente
 */

const routes: Routes = [
  {
    path: '',
    component: AuthTabsComponent
  }
];

/*
  Decoratore @NgModule
  - importazione funzionalità necessarie al funzionamento del client-side routing
  - esportazione modulo di routing con tutte le Routes
 */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
