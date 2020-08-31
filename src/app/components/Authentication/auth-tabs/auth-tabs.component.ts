import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

/*
  Decoratore @Component:
  - (selector) -> assegnamento nome direttiva, utilizzata per richiamare il componente di gestione dei tabs in un template
  - (templateUrl) -> percorso del file .html contenente il template dei tabs di login, signup
  - (stylesUrl) -> stili utilizzati dal template dei tabs
 */

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.css'],
})
export class AuthTabsComponent implements OnInit {
  constructor() {}

  /*
    Al caricamento del componente
    - (tabs) -> tramite il metodo querySelector estrapoliamo i tabs nel template
    - rende visibile a video il tab selezionato in (tabs)
   */

  ngOnInit(): void {
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }
}
