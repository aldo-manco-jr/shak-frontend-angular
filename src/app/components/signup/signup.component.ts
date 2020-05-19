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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

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
