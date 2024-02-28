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
    //emotions
    this.openEmotionsButton = "[data-testid = 'openEmotionsButton']";
    this.emotionsList = "[data-testid ='emotionsList']";
    this.emotion = "[data-testid ='emotion']";
    //energy
    this.openEnergySlider = "[data-testid = 'openEnergySlider']";
    this.energySlider = "[data-testid = 'energySlider']";
    this.energy = "[data-testid = 'energy']";
    this.saveEnergy = "[data-testid = 'saveEnergy']";

  }
  getWellBeingCheckinContainer() {
    return cy.get(this.wellBeingCheckin);
  }

  //Emotions Methods
  getOpenEmotionsButton(){
    return cy.get(this.openEmotionsButton);
  }

  getEmotionsList(){
    return cy.get(this.emotionsList);
  }

  getEmotion(){
    return cy.get(this.emotion);
  }

  //Energy Methods
  getOpenEnergySlider(){
    return cy.get(this.openEnergySlider);
  }

  getEnergySlider(){
    return cy.get(this.energySlider);
  }

  getEnergy(){
    return cy.get(this.energy);
  }

  getSaveEnergy(){
    return cy.get(this.saveEnergy);
  }

}

//Template IDEA for Schema Validation 
/* function isJSONValid(obj) {

  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      if (typeof obj[key] === "object") {
        if (Object.keys(obj[key]).length === 0) {
          return false; //invalid
        }
      }
      if (Array.isArray(obj[key])) {
        if (obj[key].length === 0) {
          return false; //invalid
        }
      }
      if (!isJSONValid(obj)) {
        return isJSONValid(obj);
      }

    } else {
      return false; //invalid
    }
  }
  return true; //valid
}; */

//SHAPE TO FOLLOW:
/* addToEmotionsHistory({
  date: today,
  name: picName,
  pic: picSrc,
}) */
