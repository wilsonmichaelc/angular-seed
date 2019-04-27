import { browser } from 'protractor';

export class AboutPage {
  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    return browser.get('/about');
  }
}
