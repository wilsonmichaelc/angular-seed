import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './login.service';
import { LoginComponent } from './login/login.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResendActivationComponent } from './resend-activation/resend-activation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './signup/signup.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, LoginRoutingModule],
  declarations: [LoginComponent, SignUpComponent, ResetPasswordComponent, RequestResetComponent, ResendActivationComponent],
  providers: [LoginService]
})
export class LoginModule {}
