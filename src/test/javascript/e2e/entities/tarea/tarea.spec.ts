/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TareaComponentsPage from './tarea.page-object';
import { TareaDeleteDialog } from './tarea.page-object';
import TareaUpdatePage from './tarea-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Tarea e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tareaUpdatePage: TareaUpdatePage;
  let tareaComponentsPage: TareaComponentsPage;
  let tareaDeleteDialog: TareaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();

    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Tareas', async () => {
    await navBarPage.getEntityPage('tarea');
    tareaComponentsPage = new TareaComponentsPage();
    expect(await tareaComponentsPage.getTitle().getText()).to.match(/Tareas/);
  });

  it('should load create Tarea page', async () => {
    await tareaComponentsPage.clickOnCreateButton();
    tareaUpdatePage = new TareaUpdatePage();
    expect(await tareaUpdatePage.getPageTitle().getAttribute('id')).to.match(/codeicusApp.tarea.home.createOrEditLabel/);
  });

  it('should create and save Tareas', async () => {
    const nbButtonsBeforeCreate = await tareaComponentsPage.countDeleteButtons();

    await tareaUpdatePage.setNameInput('name');
    expect(await tareaUpdatePage.getNameInput()).to.match(/name/);
    await tareaUpdatePage.setTypeInput('type');
    expect(await tareaUpdatePage.getTypeInput()).to.match(/type/);
    await tareaUpdatePage.setUpdatedInput('updated');
    expect(await tareaUpdatePage.getUpdatedInput()).to.match(/updated/);
    await tareaUpdatePage.setDescriptionInput('description');
    expect(await tareaUpdatePage.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(tareaUpdatePage.getSaveButton());
    await tareaUpdatePage.save();
    await waitUntilHidden(tareaUpdatePage.getSaveButton());
    expect(await tareaUpdatePage.getSaveButton().isPresent()).to.be.false;

    await tareaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tareaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Tarea', async () => {
    await tareaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tareaComponentsPage.countDeleteButtons();
    await tareaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tareaDeleteDialog = new TareaDeleteDialog();
    expect(await tareaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/codeicusApp.tarea.delete.question/);
    await tareaDeleteDialog.clickOnConfirmButton();

    await tareaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tareaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
