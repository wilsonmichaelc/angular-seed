import { HomePage } from './home.po';
import { browser } from 'protractor';

describe('Home', () => {
  const page = new HomePage();

  beforeAll(() => {
    page.navigateTo();
  });

  beforeEach(() => {
    browser.driver.sleep(2000);
  });

  it('As a logged in user I should be displayed the home page', () => {
    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
