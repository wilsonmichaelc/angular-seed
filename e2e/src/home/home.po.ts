import { browser } from 'protractor';

export class HomePage {
  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    return browser.get('/home');
  }
}
