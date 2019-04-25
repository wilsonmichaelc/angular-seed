// login.po.ts
import { browser, element, by } from 'protractor';

export class LoginPage {
  usernameInput = element(by.css('input#username'));
  passwordInput = element(by.css('input#password'));
  loginButton = element(by.css('button#login-btn'));
  signUpButton = element(by.css('#sign-up'));

  navigateTo() {
    return browser.get('/login');
  }

  getCardTitle() {
    return element(by.css('#home-title')).getText();
  }
}
