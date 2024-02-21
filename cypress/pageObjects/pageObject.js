/* global cy */

export class MainPageObject {
  constructor() {
    this.settingsIcon = "[data-testid='SettingsIcon']";
    this.dashboardLogo = "div:contains('Daily Dashboard')";
  }
  visit() {
    cy.visit('/');
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

  getNewsWidget() {
    return new NewsWidget();
  }

  async getLocalStorageItem(key) {
    try {
      const response = await cy.getAllLocalStorage();
      const baseUrl = cy.config('baseUrl');
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

class NewsWidget extends MainPageObject {
  constructor() {
    super();
    this.news = "[data-testid='news-widget']";
    this.loadingArticles = "[data-testid='loading-articles";
    this.fifthArticle = "[data-testid='article-4']";
    this.failedToLoad = "[data-testid='failed-to-load']"
  }
  getNewsContainer() {
    return cy.get(this.news);
  }
  getLoadingArticles() {
    return cy.get(this.loadingArticles);
  }
  getFifthArticle() {
    return cy.get(this.fifthArticle);
  }
  getFailedToLoad() {
    return cy.get(this.failedToLoad)
  }
  getApiAlias() {
    return cy
      .intercept({
        method: 'GET',
        url: '/api/news',
      })
      .as('api');
  }
  getApiError() {
    return cy.intercept('GET', '/api/news', {
      statusCode: 500,
      body: {
        statusText: 'Could not fetch news items',
      },
    }).as('apiError');
  }
}
