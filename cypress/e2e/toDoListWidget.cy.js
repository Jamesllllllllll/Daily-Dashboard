import { MainPageObject } from "../pageObjects/pageObject";
// const { cy } = require("date-fns/locale")
const mainPageObject = new MainPageObject();

describe("User Journey", () => {
  beforeEach(() => {
    mainPageObject.visit();
  })

  it("allows the user to add a To-Do item, add two tasks and mark one as complete", () => {
    cy.get("#new-task-item").type("Clean kitchen")

    cy.get("[data-testid='new-task-step']").type("Fill dishwasher")
    cy.get("[data-testid='add-task-step']").click()

    cy.get("[data-testid='new-task-step']").type("Wipe counters")
    cy.get("[data-testid='add-task-step']").click()

    cy.get("[data-testid='save-task']").click()

    // Open the task again
    cy.get("[data-testid='task-0']").click()

    cy.get('#task-step-0').should("have.value", "Fill dishwasher")
    cy.get("#task-step-1").should("have.value", "Wipe counters")

    // Mark one as complete
    cy.get("[data-testid='task-checkbox-0']").click()

    cy.get("[data-testid='save-opened-task']").click()

    // "Completed 1 of 2 steps" shown when viewing task list
    cy.get("[data-testid='steps-completed-0']").contains("Completed 1 of 2 steps.")
  })
  
})