import { MainPageObject } from "../pageObjects/pageObject";
const mainPageObject = new MainPageObject();

describe("User Journey", () => {
  beforeEach(() => {
    mainPageObject.visit();
  })

  it("is able to select an emotion", () => {
    const wellBeingCheckinWidget = mainPageObject.getWellBeingCheckinWidget();

    toDoListWidget.getToDoListContainer().should("be.visible")
    toDoListWidget.getTaskItem().type("Clean kitchen")

    toDoListWidget.getTaskInput().type("Fill dishwasher")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getTaskInput().type("Wipe counters")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getSaveTask().click()

    // Open the task again
    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().should("have.value", "Fill dishwasher")
    toDoListWidget.getSecondStep().should("have.value", "Wipe counters")

    // Mark one as complete
    toDoListWidget.getFirstStepCheckbox().click()

    toDoListWidget.getSaveOpenTask().click()

    // "Completed 1 of 2 steps" shown when viewing task list
    toDoListWidget.getFirstTaskStepsCompleted().contains("Completed 1 of 2 steps.")
  })

  it("shows the correct emotion when app reloads", () => {
    const toDoListWidget = mainPageObject.getToDoListWidget();

    toDoListWidget.getToDoListContainer().should("be.visible")
    toDoListWidget.getTaskItem().type("Write novel")

    toDoListWidget.getTaskInput().type("Gather ideas")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getTaskInput().type("Write outline")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getSaveTask().click()

    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().type("{selectall}{backspace}Use ChatGPT")

    toDoListWidget.getRemoveSecondStep().click()

    toDoListWidget.getAddTaskStepInTaskView().type("???")
    toDoListWidget.getSubmitStepInTaskView().click()

    toDoListWidget.getAddTaskStepInTaskView().type("Profit!")
    toDoListWidget.getSubmitStepInTaskView().click()

    toDoListWidget.getSaveOpenTask().click()

    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().should("have.value", "Use ChatGPT")
    toDoListWidget.getSecondStep().should("have.value", "???")
    toDoListWidget.getThirdStep().should("have.value", "Profit!")

    toDoListWidget.getSaveOpenTask().click()

    toDoListWidget.getDeleteTask().click()

    toDoListWidget.getFirstTaskStepsCompleted().should("not.exist")
  })

  it("changes emotion when clicking on a different one", () => {
    const toDoListWidget = mainPageObject.getToDoListWidget();

    toDoListWidget.getToDoListContainer().should("be.visible")
    toDoListWidget.getTaskItem().type("Write novel")

    toDoListWidget.getTaskInput().type("Gather ideas")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getTaskInput().type("Write outline")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getSaveTask().click()

    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().type("{selectall}{backspace}Use ChatGPT")

    toDoListWidget.getRemoveSecondStep().click()

    toDoListWidget.getAddTaskStepInTaskView().type("???")
    toDoListWidget.getSubmitStepInTaskView().click()

    toDoListWidget.getAddTaskStepInTaskView().type("Profit!")
    toDoListWidget.getSubmitStepInTaskView().click()

    toDoListWidget.getSaveOpenTask().click()

    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().should("have.value", "Use ChatGPT")
    toDoListWidget.getSecondStep().should("have.value", "???")
    toDoListWidget.getThirdStep().should("have.value", "Profit!")

    toDoListWidget.getSaveOpenTask().click()

    toDoListWidget.getDeleteTask().click()

    toDoListWidget.getFirstTaskStepsCompleted().should("not.exist")
  })

  it("stores the selected emotion on local storage", () => {
    const toDoListWidget = mainPageObject.getToDoListWidget();

    toDoListWidget.getToDoListContainer().should("be.visible")
    toDoListWidget.getTaskItem().type("Write novel")

    toDoListWidget.getTaskInput().type("Gather ideas")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getTaskInput().type("Write outline")
    toDoListWidget.getAddTaskStep().click()

    toDoListWidget.getSaveTask().click()

    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().type("{selectall}{backspace}Use ChatGPT")

    toDoListWidget.getRemoveSecondStep().click()

    toDoListWidget.getAddTaskStepInTaskView().type("???")
    toDoListWidget.getSubmitStepInTaskView().click()

    toDoListWidget.getAddTaskStepInTaskView().type("Profit!")
    toDoListWidget.getSubmitStepInTaskView().click()

    toDoListWidget.getSaveOpenTask().click()

    toDoListWidget.getFirstTask().click()

    toDoListWidget.getFirstStep().should("have.value", "Use ChatGPT")
    toDoListWidget.getSecondStep().should("have.value", "???")
    toDoListWidget.getThirdStep().should("have.value", "Profit!")

    toDoListWidget.getSaveOpenTask().click()

    toDoListWidget.getDeleteTask().click()

    toDoListWidget.getFirstTaskStepsCompleted().should("not.exist")
  })

})