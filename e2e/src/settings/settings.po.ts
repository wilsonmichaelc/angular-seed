import { browser } from 'protractor';

export class SettingsPage {
  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    return browser.get('/settings');
  }
}
