import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { extract } from '@app/core';

import { LoginComponent } from './login/login.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResendActivationComponent } from './resend-activation/resend-activation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent, data: { title: extract('Sign Up') } },
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'request-reset', component: RequestResetComponent, data: { title: extract('Request Password Reset') } },
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: extract('Reset Password') } },
  { path: 'resend-activation', component: ResendActivationComponent, data: { title: extract('Send Actication Email') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {}
