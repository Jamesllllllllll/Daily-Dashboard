export class MainPageObject {
  constructor() {
    this.settingsIcon = "[data-testid='SettingsIcon']";
    this.dashboardLogo = "div:contains('Daily Dashboard')";
  }
  visit() {
    cy.visit("/");
  }
  clickSettingsIcon() {
    cy.get(this.settingsIcon).click();
  }
  getDashboardLogo() {
    return cy.get(this.dashboardLogo);
  }
  getWeatherWidget() {
    return new WeatherWidget();
  }
  async getLocalStorageItem(key) {
    try {
      const response = await cy.getAllLocalStorage();
      return response["http://localhost:3000"][key];
    } catch (error) {
      console.error(`Error getting local storage item: ${error}`);
    }
  }
}

class WeatherWidget {
  constructor() {
    this.weatherWidget = "[data-testid='weatherWidget']";
  }
  getWeatherContainer() {
    return cy.get(this.weatherWidget);
  }
}
