/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { browser, by, element } from 'protractor';

export class AppPage {
  constructor() {
    // Forces default language
    this.navigateTo();
    browser.executeScript(() => localStorage.setItem('language', 'en-US'));
  }

  navigateTo() {
    return browser.get('/');
  }

  navAbout() {
    element(by.className('menu-button mat-icon-button')).click();
    browser.driver.sleep(2000);
    element(by.id('about')).click();
    browser.driver.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/about');
  }
}
