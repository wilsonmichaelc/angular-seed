import { LoginPage } from './home.po';
import { browser, element, by } from 'protractor';

describe('home', () => {
  const page = new LoginPage();

  beforeAll(() => {
    page.navigateTo();
    browser.waitForAngularEnabled(false);
  });

  beforeEach(() => {
    browser.driver.sleep(2000);
  });

  it('As a logged in user I should be displayed the home page', () => {
    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
