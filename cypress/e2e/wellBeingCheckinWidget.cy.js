import { MainPageObject } from "../pageObjects/pageObject";
const mainPageObject = new MainPageObject();

describe("User Journey", () => {
  beforeEach(() => {
    mainPageObject.visit();
  }) 

  //EMOTIONS

  it("is shows corresponding emotion when clicking on it", () => {
    const wellBeingCheckinWidget = mainPageObject.getWellBeingCheckinWidget();

    //opening emotions' slider
    wellBeingCheckinWidget.getWellBeingCheckinContainer().should("be.visible");
    wellBeingCheckinWidget.getOpenEmotionsButton().click();
    wellBeingCheckinWidget.getEmotionsList().should("be.visible"); 
    //clicking on "meh"
    wellBeingCheckinWidget.getEmotionsList().get('[name="meh"]').click();
    //checking "meh" is visible
    wellBeingCheckinWidget.getEmotion().get('[alt="meh"]').should("be.visible");  
  })


   it("shows the correct emotion when app reloads", () => {
    const wellBeingCheckinWidget = mainPageObject.getWellBeingCheckinWidget();

    //opening emotions' slider
    wellBeingCheckinWidget.getWellBeingCheckinContainer().should("be.visible");
    wellBeingCheckinWidget.getOpenEmotionsButton().click();
    wellBeingCheckinWidget.getEmotionsList().should("be.visible"); 

    //clicking on "sad"
    wellBeingCheckinWidget.getEmotionsList().get('[name="sad"]').click();
    wellBeingCheckinWidget.getEmotion().get('[alt="sad"]').should("be.visible");  

    //checking that "sad" is still visible after reloading page
    cy.reload();
    wellBeingCheckinWidget.getEmotion().get('[alt="sad"]').should("be.visible");  
  }) 

    //ENERGY
  
    it("is shows corresponding energy level when dragging slider", () => {
    it("it saves corresponding energy level when dragging slider", () => {
      const wellBeingCheckinWidget = mainPageObject.getWellBeingCheckinWidget();
  
      //opening energy slider
      wellBeingCheckinWidget.getWellBeingCheckinContainer().should("be.visible");
      wellBeingCheckinWidget.getOpenEnergySlider().click();
      wellBeingCheckinWidget.getEnergySlider().should("be.visible"); 
      // Move the focus to slider, by clicking on the slider's circle element
      wellBeingCheckinWidget.getEnergySlider().click({ multiple: true, force: true });
      // Press right arrow four times to "40"
      wellBeingCheckinWidget.getEnergySlider().type("{leftarrow}");
      wellBeingCheckinWidget.getEnergySlider().as('range').invoke('val', 40).trigger('input');
      //saving energy
      wellBeingCheckinWidget.getSaveEnergy().click();
      //checking "40" is visible
      wellBeingCheckinWidget.getOpenEnergySlider().click();
      wellBeingCheckinWidget.getEnergySlider().should("be.visible"); 
      wellBeingCheckinWidget.getEnergy().get('[value="40"]').should("be.visible");
      wellBeingCheckinWidget.getEnergy().should('have.text', '40');


/*       
      //dragging slider to "60"
      wellBeingCheckinWidget.getEnergySlider().get('[value = "60"]');
       //saving energy
      wellBeingCheckinWidget.saveEnergy().click();
      //checking "60" is visible
      wellBeingCheckinWidget.getOpenEnergySlider().click();
      wellBeingCheckinWidget.getEnergySlider().should("be.visible"); 
      wellBeingCheckinWidget.getEnergy().get('[value="60"]').should("be.visible");   */
    })
  
/*  
// Move the focus to slider, by clicking on the slider's circle element
cy.get(".irs-handle.single").click({ multiple: true, force: true });
// Press right arrow two times
cy.get(".irs-handle.single").type(
  "{rightarrow}{rightarrow}"
);

 */
/*      it("shows the correct energy level when app reloads", () => {
      const wellBeingCheckinWidget = mainPageObject.getWellBeingCheckinWidget();
  
      //opening emotions' slider
      wellBeingCheckinWidget.getWellBeingCheckinContainer().should("be.visible");
      wellBeingCheckinWidget.getOpenEmotionsButton().click();
      wellBeingCheckinWidget.getEmotionsList().should("be.visible"); 
  
      //clicking on "sad"
      wellBeingCheckinWidget.getEmotionsList().get('[name="sad"]').click();
      wellBeingCheckinWidget.getEmotion().get('[alt="sad"]').should("be.visible");  
  
      //checking that "sad" is still visible after reloading page
      cy.reload();
      wellBeingCheckinWidget.getEmotion().get('[alt="sad"]').should("be.visible");  
    })  */

  

})  

