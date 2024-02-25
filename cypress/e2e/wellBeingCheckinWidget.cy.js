import { MainPageObject } from "../pageObjects/pageObject";
const mainPageObject = new MainPageObject();

describe("User Journey", () => {
  beforeEach(() => {
    mainPageObject.visit();
  })

  it("is shows corresponding emotion when clicking on it", () => {
    const wellBeingCheckinWidget = mainPageObject.getWellBeingCheckinWidget();

    wellBeingCheckinWidget.getWellBeingCheckinContainer().should("be.visible");
    wellBeingCheckinWidget.getOpenEmotionsButton().click();
    wellBeingCheckinWidget.getEmotionsList().should("be.visible"); 
    wellBeingCheckinWidget.getEmotionsList().get('[name="meh"]').click();
    wellBeingCheckinWidget.getEmotion().get('[alt="meh"]').should("be.visible");  
  })
/* 
  it("shows the correct emotion when app reloads", () => {
 
  })

  it("changes emotion when clicking on a different one", () => {

  })

  it("stores the selected emotion on local storage", () => {
    
  }) 
  */

})  