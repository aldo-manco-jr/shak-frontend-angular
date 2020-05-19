import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;
  errorMessage: string;
  showSpinner = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.login_form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

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
