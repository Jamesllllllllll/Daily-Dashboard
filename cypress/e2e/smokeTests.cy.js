import { MainPageObject } from "../pageObjects/pageObject";
const mainPageObject = new MainPageObject();
describe("Smoke Tests", () => {
  it("Loads the page with out errors", () => {
    mainPageObject.visit();
    mainPageObject.getDashboardLogo().should("be.visible");
  });
});
