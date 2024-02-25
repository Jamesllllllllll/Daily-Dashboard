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

  getWellBeingCheckinWidget() {
    return new WellBeingCheckinWidget();
  }

  async getLocalStorageItem(key) {
    try {
      const response = await cy.getAllLocalStorage();
      const baseUrl = cy.config("baseUrl");
      console.log(baseUrl);
      console.log(response);
      return response[baseUrl][key];
    } catch (error) {
      console.error(`Error getting local storage item: ${error}`);
    }
  }
  setLocalStorageItem(key, value) {
    try {
      cy.window().then((win) => {
        win.localStorage.setItem(key, value);
      });
    } catch (error) {
      console.error(`Error setting local storage item: ${error}`);
    }
  }
}

class WeatherWidget extends MainPageObject {
  constructor() {
    super();
    this.weatherWidget = "[data-testid='weatherWidget']";
  }
  getWeatherContainer() {
    return cy.get(this.weatherWidget);
  }
}

class WellBeingCheckinWidget extends MainPageObject {
  constructor() {
    super();
    this.wellBeingCheckin = "[data-testid='wellBeingCheckin']";
    this.openEmotionsButton = "[data-testid = 'openEmotionsButton']";
    this.emotionsList = "[data-testid ='emotionsList']";
    this.emotion = "[data-testid ='emotion']";

  }
  getWellBeingCheckinContainer() {
    return cy.get(this.wellBeingCheckin);
  }
  getOpenEmotionsButton(){
    return cy.get(this.openEmotionsButton);
  }

  getEmotionsList(){
    return cy.get(this.emotionsList);
  }

  getEmotion(){
    return cy.get(this.emotion);
  }

}
