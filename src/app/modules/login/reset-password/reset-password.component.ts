import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { environment } from '@env/environment';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  version: string = environment.version;
  isLoading = false;
  resetError;
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.form.controls.username.setValue(this.loginService.resetEmail);
  }

  completeForgotPassword() {
    this.isLoading = true;
    this.form.controls.username.enable();
    this.authenticationService.completeForgotPassword(this.form.value).then(result => {
      this.isLoading = false;
      this.form.reset();
      if (result && result.hasOwnProperty('code')) {
        this.resetError = result['message'];
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  private createForm() {
    const lowercase = new RegExp('(?=.*[a-z])');
    const uppercase = new RegExp('(?=.*[A-Z])');
    const digit = new RegExp('(?=.*[0-9])');
    const special = new RegExp('([!@#$%^&*?_+-])');
    const minLength = new RegExp('(.{8,})');

    this.form = this.formBuilder.group({
      username: [{ value: '', disabled: true }, Validators.required],
      code: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(lowercase),
          Validators.pattern(uppercase),
          Validators.pattern(digit),
          Validators.pattern(special),
          Validators.pattern(minLength)
        ]
      ]
    });
  }
}
