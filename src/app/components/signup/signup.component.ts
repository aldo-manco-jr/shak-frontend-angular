import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup_form: FormGroup;
  errorMessage: string;
  showSpinner = false;

  /*
    Istanze condivise:
    - (authService) -> service che gestisce la comunicazione dei dati tra front-end e back-end
    - (formBuilder) -> tipo di dato che permette la creazione di un form e l'impostazione di attributi
    - (router) -> istanza del routing necessaria a spostarsi nella homepage
   */

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  /*
    Al caricamento del componente
    i dati del form: {email, username, password}
    vengono inizializzati vuoti e contrassegnati come obbligatori
   */

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.signup_form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /*
    (signUpUser())
    viene visualizzata la barra di caricamento
    e i dati inseriti nel form della signup
    vengono passati al metodo (registerUser()) di auth.service.ts
    il quale, una volta ricevuti i dati, li manda sul server della nostra web-app, che si occuperà dell'elaborazione
    una volta che questa operazione termina,
    se i dati inseriti sono corretti ed appartenenti ad un utente esistente,
    verremo reindirizzati alla homepage
    altrimenti visualizzeremo un errore
   */

  signUpUser() {

    this.showSpinner = true;

    console.log(this.signup_form.value);

    this.authService.registerUser(this.signup_form.value).subscribe((newUser) => {

      console.log(newUser);
      this.signup_form.reset();

      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 1000);

    }, (error) => {

      this.showSpinner=false;

      console.log(error);

      if (error.error.validationErrorMessage){
        this.errorMessage = error.error.validationErrorMessage[0].message;
      }

      if (error.error.message){
        this.errorMessage = error.error.message;
      }

    });
  }

}
