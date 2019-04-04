import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-resend-activation',
  templateUrl: './resend-activation.component.html',
  styleUrls: ['../login.component.scss']
})
export class ResendActivationComponent {
  version: string = environment.version;
  isLoading = false;
  activateError;
  resendActivationForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.createForm();
  }

  resendActivationEmail() {
    this.isLoading = true;
    this.authenticationService.resendActivationEmail(this.resendActivationForm.value).then(response => {
      this.isLoading = false;
      this.resendActivationForm.reset();
      if ((response as Object).hasOwnProperty('user')) {
        this.router.navigate(['login']);
      } else {
        this.activateError = response['message'];
      }
    });
  }

  private createForm() {
    this.resendActivationForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
}
