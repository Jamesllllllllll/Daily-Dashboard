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
