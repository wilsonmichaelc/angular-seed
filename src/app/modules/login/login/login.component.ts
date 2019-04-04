import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginComponent {
  version: string = environment.version;
  isLoading = false;
  loginError;
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.createForm();
  }

  login() {
    this.isLoading = true;
    this.authenticationService.login(this.loginForm.value).subscribe((response: any) => {
      this.isLoading = false;
      this.loginForm.reset();
      if (response.hasOwnProperty('idToken')) {
        this.router.navigate(['/home']);
      } else if (response.hasOwnProperty('code') && response['code'] === 'UserNotConfirmedException') {
        this.isLoading = true;
        this.loginError = response['message'];
        setTimeout(() => {
          this.router.navigate(['resend-activation']);
          this.isLoading = false;
        }, 1000);
      } else {
        this.loginError = response['message'];
      }
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: true
    });
  }
}
