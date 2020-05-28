import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/*
  Decoratore @Component:
  - (selector) -> assegnamento nome direttiva, utilizzata per richiamare il componente di gestione della login in un template
  - (templateUrl) -> percorso del file .html contenente il template della login
  - (stylesUrl) -> stili utilizzati dal template della login
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;
  errorMessage: string;
  showSpinner = false;

  /*
    Istanze condivise:
    - (authService) -> service che gestisce la comunicazione dei dati tra front-end e back-end
    - (formBuilder) -> tipo di dato che permette la creazione di un form e l'impostazione di attributi
    - (router) -> istanza del routing necessaria a spostarsi nella homepage
   */

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  /*
    Al caricamento del componente
    i dati del form: {username, password}
    vengono inizializzati vuoti e contrassegnati come obbligatori
   */

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.login_form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*
    (loginUser())
    viene visualizzata la barra di caricamento
    e i dati inseriti nel form della login
    vengono passati al metodo (loginUser()) di auth.service.ts
    il quale, una volta ricevuti i dati, li manda sul server della nostra web-app, che si occuperà dell'elaborazione
    una volta che questa operazione termina,
    se i dati inseriti sono corretti ed appartenenti ad un utente esistente,
    verremo reindirizzati alla homepage
    altrimenti visualizzeremo un errore
   */

  loginUser(){

    this.showSpinner = true;

    this.authService.loginUser(this.login_form.value).subscribe((loggingUser) => {

      console.log(loggingUser);

      this.login_form.reset();

      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 1000);

    }, (error) => {

      this.showSpinner = false;

      if (error.error.message){
        this.errorMessage = error.error.message;
      }
    });
  }

}
