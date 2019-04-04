import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { environment } from '@env/environment';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['../login.component.scss']
})
export class RequestResetComponent implements OnDestroy {
  version: string = environment.version;
  isLoading = false;
  initResetError;
  initResetForm: FormGroup;

  resetEmail = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.loginService.resetEmail = this.resetEmail;
  }

  initiateForgotPassword() {
    this.isLoading = true;
    this.authenticationService.initiateForgotPassword(this.initResetForm.controls.email.value).then((result: any) => {
      this.isLoading = false;
      this.initResetForm.reset();
      if (result.hasOwnProperty('CodeDeliveryDetails')) {
        this.resetEmail = result.CodeDeliveryDetails.Destination;
        this.router.navigate(['reset-password']);
      } else if (result.hasOwnProperty('code') && result['code'] === 'UserNotFoundException') {
        this.initResetError = result['message'];
      } else {
        this.initResetError = result['message'];
      }
    });
  }

  private createForm() {
    this.initResetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
}
