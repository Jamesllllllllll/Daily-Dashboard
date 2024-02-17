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

  getEmotionsCheckinWidget() {
    return new EmotionsCheckinWidget();
  }

  getEnergyCheckinWidget() {
    return new EnergyCheckinWidget();
  }

  getCalendarWidget() {
    return new CalendarWidget();
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

class EmotionsCheckinWidget extends MainPageObject {
  constructor() {
    super();
    this.emotionsCheckin = "[data-testid='emotionsCheckin']";
  }
  getEmotionsCheckinContainer() {
    return cy.get(this.emotionsCheckin);
  }
}

class EnergyCheckinWidget extends MainPageObject {
  constructor() {
    super();
    this.energyCheckin = "[data-testid='energyCheckin']";
  }
  getEnergyCheckinContainer() {
    return cy.get(this.energyCheckin);
  }
}

class CalendarWidget extends MainPageObject {
  constructor() {
    super();
    this.calendar = "[data-testid='calendar']";
  }
  getCalendarContainer() {
    return cy.get(this.calendar);
  }
}
