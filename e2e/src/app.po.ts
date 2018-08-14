import { browser, by, element } from 'protractor';
import { UserService } from 'src/app/user.service';

export class AppPage {
  constructor() {

  }
  navigateTo() {
    return browser.get('/create');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getRows() {
    return element(by.id('rows'));
  }
  login() {
    element(by.name('username')).sendKeys('test@test.com');
    element(by.name('password')).sendKeys('123456');
    element(by.name('signin')).click();
  }
  fillItemName(name) {
    element(by.name('unit_name')).sendKeys(name);
  }
  fillItemPrice(price) {
    element(by.name('unit_price')).sendKeys(price);
  }
  saveItem() {
    element(by.name('create_unit')).click();
  }
  navigateToIndex() {
    return browser.get('/index');
  }
  getSaveButton() {
    return element(by.name('create_unit'));
  }
  navigateToLogin() {
    return browser.get('/login');
  }
}