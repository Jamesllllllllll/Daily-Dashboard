export class MainPageObject {
  constructor() {
    this.url = "http://localhost:3000";
    this.settingsIcon = "[data-testid='SettingsIcon']";
    this.dashboardLogo = "div:contains('Daily Dashboard')";
  }
  visit() {
    cy.visit(this.url);
  }
  clickSettingsIcon() {
    cy.get(this.settingsIcon).click();
  }
  getDashboardLogo() {
    return cy.get(this.dashboardLogo);
  }
}
