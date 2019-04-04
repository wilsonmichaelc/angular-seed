import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('app', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.driver.sleep(2000);
    page = new AppPage();
  });

  it('As a user I should be displayed the login page and login into app', () => {
    page.navigateTo();
  });

  // it('Should be able to navigate on "About Page"', function() {
  //   page.navAbout();
  // });
});
