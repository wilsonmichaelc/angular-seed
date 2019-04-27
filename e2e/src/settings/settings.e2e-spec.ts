import { SettingsPage } from './settings.po';
import { browser } from 'protractor';

describe('Settings', () => {
  const page = new SettingsPage();

  beforeAll(() => {
    page.navigateTo();
  });

  beforeEach(() => {
    browser.driver.sleep(2000);
  });

  it('As a logged in user I should be able to navigate to he Settings page', () => {
    expect(browser.getCurrentUrl()).toContain('/settings');
  });
});
