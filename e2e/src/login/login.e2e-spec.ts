import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login', () => {
  const page = new LoginPage();

  beforeEach(() => {
    browser.driver.sleep(2000);
    browser.waitForAngularEnabled(false);
  });

  it('As a user I should be displayed the login page if not logged in', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('As a user I should be able to login with valid credentials', function() {
    page.usernameInput.sendKeys(process.env.PROTRACTOR_USERNAME);
    page.passwordInput.sendKeys(process.env.PROTRACTOR_PASSWORD);
    page.loginButton.click();
    browser.driver.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
