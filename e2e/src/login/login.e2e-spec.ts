// login.e2e-spec.ts
import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login', () => {
  const page = new LoginPage();

  // beforeEach(() => {
  //   page.navigateTo();
  // });

  it('should navigate to the signup page when the sign up button is clicked', () => {
    page.navigateTo();
    page.signUpButton.click();
    expect(browser.getCurrentUrl()).toContain('signup');
  });

  it('should allow a user to log in', () => {
    page.navigateTo();
    browser.driver.sleep(1000);

    page.usernameInput.sendKeys('wilsonm@twd.com');
    page.passwordInput.sendKeys('Pa55uuord!');
    page.loginButton.click();
    browser.driver.sleep(1000);

    expect(browser.getCurrentUrl()).toContain('home');
    expect(page.getCardTitle()).toContain("There's no place like 127.0.0.1");
  });
});
