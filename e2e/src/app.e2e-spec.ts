import { AppPage } from './app.po';
import { UserService } from 'src/app/user.service';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToLogin();
  });

  /*it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });*/

  it('should create new item', () => {
    page.login();
    page.navigateTo();
    const name = 'Basket' + Date.now();
    page.fillItemName(name);
    page.fillItemPrice('29');
    page.saveItem();
    page.navigateToIndex();
    expect(page.getRows().getText()).toContain(name);
  });

  it('should be disabled button if no price', () => {
    page.login();
    page.navigateTo();
    page.fillItemName('Basket');
    expect(page.getSaveButton().getAttribute('disabled')).toBe('true');
  })

  it('should be enabled button when everything filled', () => {
    page.login();
    page.navigateTo();
    page.fillItemName('Basket');
    page.fillItemPrice('39');
    expect(page.getSaveButton().getAttribute('disabled')).toBeNull();
  })
});
