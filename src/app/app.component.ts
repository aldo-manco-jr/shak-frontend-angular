import { Component } from '@angular/core';

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

export class AppComponent {
  title = 'SHAK';
}
