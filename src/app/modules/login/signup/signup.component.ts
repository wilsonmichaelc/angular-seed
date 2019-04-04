import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login.component.scss']
})
export class SignUpComponent {
  version: string = environment.version;
  isLoading = false;
  signupError;
  signupForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.createForm();
  }

  signup() {
    this.isLoading = true;
    this.authenticationService.signup(this.signupForm.value).then(response => {
      this.isLoading = false;
      this.signupForm.reset();
      if ((response as Object).hasOwnProperty('user')) {
        this.router.navigate(['login']);
      } else {
        this.signupError = response['message'];
      }
    });
  }

  private createForm() {
    const lowercase = new RegExp('(?=.*[a-z])');
    const uppercase = new RegExp('(?=.*[A-Z])');
    const digit = new RegExp('(?=.*[0-9])');
    const special = new RegExp('([!@#$%^&*?_+-])');
    const minLength = new RegExp('(.{8,})');

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
