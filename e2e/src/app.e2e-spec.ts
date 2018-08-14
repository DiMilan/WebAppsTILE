import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';
import { UserService } from 'src/app/user.service';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;
  const EC = protractor.ExpectedConditions;
  let itemName = 'Basket' + Date.now();
  beforeEach(() => {
    page = new AppPage();
  });

  /*it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });*/

  it('should login', () => {
    browser.get('/login');
    page.login();
    browser.wait(() => {
      return browser.getCurrentUrl().then((url) => {
        return url.indexOf('index') >= 0;
      });
    });
  });

  it('should be disabled button if no price', () => {
    browser.sleep(1000);
    element(by.id('create')).click();
    browser.wait(() => {
      return browser.getCurrentUrl().then((url) => {
        return url.indexOf('create') >= 0;
      });
    });
    browser.sleep(1000);
    page.fillItemName(itemName);
    expect(page.getSaveButton().getAttribute('disabled')).toBe('true');
  });

  it('should be enabled button when everything filled', () => {
    page.fillItemPrice('39');
    expect(page.getSaveButton().getAttribute('disabled')).toBeNull();
  });

  it('should show up in the grid', () => {
    page.saveItem();
    element(by.id('list')).click();
    browser.wait(() => {
      return browser.getCurrentUrl().then((url) => {
        return url.indexOf('index') >= 0;
      });
    });
    browser.sleep(1000);
    expect(page.getRows().getText()).toContain(itemName);
  });
});
