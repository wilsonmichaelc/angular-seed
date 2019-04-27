import { AboutPage } from './about.po';
import { browser } from 'protractor';

describe('About', () => {
  const page = new AboutPage();

  beforeAll(() => {
    page.navigateTo();
    browser.waitForAngularEnabled(true);
  });

  beforeEach(() => {
    browser.driver.sleep(2000);
  });

  it('As a logged in user I should be able to navigate to he About page', () => {
    expect(browser.getCurrentUrl()).toContain('/about');
  });
});
