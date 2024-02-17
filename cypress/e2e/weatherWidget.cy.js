import { MainPageObject } from "../pageObjects/pageObject";
// const { cy } = require("date-fns/locale")
const mainPageObject = new MainPageObject();

describe("User Journey", () => {
  beforeEach(() => {
    mainPageObject.visit();
  })

  it("allows a user to enter a city and load the current weather, then change their city", () => {
    cy.intercept({
      url: 'http://localhost:3000/api/weather*',
      query: { city: 'Toronto, Ontario, Canada' },
    }).as('getWeather')

    cy.get("[data-testid='weather-form']").type('Toronto')
    cy.get("[data-testid='cityPicker-0']").click()
    cy.wait('@getWeather')
    cy.get("[data-testid='weather-info']").should("exist").contains('in Toronto')
  })

  it("allows a user to change their city", () => {
    cy.intercept({
      url: 'http://localhost:3000/api/weather*',
      query: { city: 'Atlanta, Georgia, United States' },
    }).as('getWeather')

    cy.get("[data-testid='SettingsIcon']").eq(0).click()
    cy.get("[data-testid='ChangeCity']").click()
    cy.get("[data-testid='weather-form']").type('Atlanta')
    cy.get("[data-testid='cityPicker-0']").click()
    cy.get("[data-testid='CloseIcon']").eq(0).click()
    cy.wait('@getWeather')
    cy.get("[data-testid='weather-info']").should("exist").contains('in Atlanta')
  })

})