import { MainPageObject } from "../pageObjects/pageObject";
const mainPageObject = new MainPageObject();
describe("General Smoke Tests", () => {
  it("Loads the page with out errors", () => {
    mainPageObject.visit();
    mainPageObject.getDashboardLogo().should("be.visible");
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
