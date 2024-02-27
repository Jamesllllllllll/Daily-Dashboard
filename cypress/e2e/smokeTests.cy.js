/* global cy */

import { MainPageObject } from "../pageObjects/pageObject";

const mainPageObject = new MainPageObject();
describe("General Smoke Tests", () => {
  it("Loads the page with out errors", () => {
    mainPageObject.visit();
    mainPageObject.getDashboardLogo().should("be.visible");
  });
  it("Able to set and retrieve local storage", async () => {
    mainPageObject.setLocalStorageItem("testKey", "testValue");
    const response = await mainPageObject.getLocalStorageItem("testKey");
    expect(response).to.equal("testValue");
  });
});

describe("Weather Widget Smoke Tests", () => {
  it("Loads the weather widget", () => {
    mainPageObject.visit();
    mainPageObject
      .getWeatherWidget()
      .getWeatherContainer()
      .should("be.visible");
  });
});

describe("Emotions Check-in Smoke Tests", () => {
  it("Loads the Emotions Ckeck-in Widget", () => {
    mainPageObject.visit();
    mainPageObject
      .getEmotionsCheckinWidget()
      .getEmotionsCheckinContainer()
      .should("be.visible");
  });
});

describe("Energy Checkin", () => {
  it("Loads the Energy Ckeck-in Widget", () => {
    mainPageObject.visit();
    mainPageObject
      .getEnergyCheckinWidget()
      .getEnergyCheckinContainer()
      .should("be.visible");
  });
});

describe("Calendar", () => {
  it("Loads the Calendar Widget", () => {
    mainPageObject.visit();
    mainPageObject
      .getCalendarWidget()
      .getCalendarContainer()
      .should("be.visible");
  });
});

describe('To-Dos', () => {
  it('Loads the ToDos Widget"', () => {
    mainPageObject.visit();
    mainPageObject
      .getToDoListWidget()
      .getNewTaskTitleInput()
      .should('be.visible')
      .and('not.have.value');
  });
});