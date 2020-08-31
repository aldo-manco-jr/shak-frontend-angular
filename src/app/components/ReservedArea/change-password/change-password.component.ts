import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  errorMessage: string;
  changedMessage: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.Init();
  }

  Init() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.Validate.bind(this)
    });
  }

  ChangePassword() {

    this.userService.ChangePassword(this.passwordForm.value).subscribe(data => {
        this.passwordForm.reset();
        this.changedMessage = 'Password changed successfully';
        this.errorMessage = '';
      },
      (err) => {
        console.log(err);
        if (err.error.message) {
          this.errorMessage = err.error.message;
          this.changedMessage = '';
        }
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }
    return null;
  }
}
