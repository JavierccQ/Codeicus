import { element, by, ElementFinder } from 'protractor';

export default class TareaUpdatePage {
  pageTitle: ElementFinder = element(by.id('codeicusApp.tarea.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#tarea-name'));
  typeInput: ElementFinder = element(by.css('input#tarea-type'));
  updatedInput: ElementFinder = element(by.css('input#tarea-updated'));
  descriptionInput: ElementFinder = element(by.css('input#tarea-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setUpdatedInput(updated) {
    await this.updatedInput.sendKeys(updated);
  }

  async getUpdatedInput() {
    return this.updatedInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
