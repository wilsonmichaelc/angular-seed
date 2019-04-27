import { browser, by, element } from 'protractor';

export class LoginPage {
  usernameInput = element(by.css('input#username'));
  passwordInput = element(by.css('input#password'));
  loginButton = element(by.css('button#login-btn'));

  constructor() {
    this.navigateTo();
    browser.executeScript(() => localStorage.setItem('language', 'en-US'));
  }

  navigateTo() {
    return browser.get('/');
  }
}
