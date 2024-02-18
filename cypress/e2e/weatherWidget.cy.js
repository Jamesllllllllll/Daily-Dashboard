import { MainPageObject } from "../pageObjects/pageObject";
// const { cy } = require("date-fns/locale")
const mainPageObject = new MainPageObject();

describe("User Journey", () => {
  beforeEach(() => {
    mainPageObject.visit();
  })

  it.only("allows a user to enter a city name, choose their city and load the current weather", () => {
    cy.get("[data-testid='weather-form']").type('Toronto')

    // cy.intercept({
    //   url: 'http://localhost:3000/api/city*',
    //   query: { city: 'Toronto' },
    // }).as('getCity')

    // cy.intercept({
    //   url: 'http://localhost:3000/api/weather*',
    //   query: { city: 'Toronto, Ontario, Canada' },
    // }).as('getWeather')
    
    // cy.wait('@getCity')
    cy.get("[data-testid='cityPicker-0']").click()
    
    // cy.wait('@getWeather')
    cy.get("[data-testid='weather-info']").should("exist").contains('in Toronto')
  })

  it("allows a user to change their city", () => {

    cy.intercept({
      url: 'http://localhost:3000/api/city*',
      query: { city: 'Atlanta' },
    }).as('getCity')

    cy.intercept({
      url: 'http://localhost:3000/api/weather*',
      query: { city: 'Atlanta, Georgia, United States' },
    }).as('getWeather')

    cy.get("[data-testid='SettingsIcon']").eq(0).click()
    cy.get("[data-testid='ChangeCity']").click()
    cy.get("[data-testid='weather-form']").type('Atlanta')
    cy.get("[data-testid='cityPicker-0']").click()
    cy.wait('@getCity')
    cy.get("[data-testid='CloseIcon']").eq(0).click()
    cy.wait('@getWeather')
    cy.get("[data-testid='weather-info']").should("exist").contains('in Atlanta')
  })

})