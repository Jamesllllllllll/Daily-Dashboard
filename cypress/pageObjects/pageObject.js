
export class MainPageObject {
  constructor() {
    this.settingsIcon = "[data-testid='SettingsIcon']";
    this.dashboardLogo = "div:contains('Daily Dashboard')";
  }
  visit() {
    cy.visit("/");
  }
  clickSettingsIcon() {
    cy.get(this.settingsIcon).click();
  }
  getDashboardLogo() {
    return cy.get(this.dashboardLogo);
  }
  getWeatherWidget() {
    return new WeatherWidget();
  }

  getEmotionsCheckinWidget() {
    return new EmotionsCheckinWidget();
  }

  getEnergyCheckinWidget() {
    return new EnergyCheckinWidget();
  }

  getCalendarWidget() {
    return new CalendarWidget();
  }

  getToDoListWidget() {
    return new ToDoListWidget();
  }

  async getLocalStorageItem(key) {
    try {
      const response = await cy.getAllLocalStorage();
      const baseUrl = cy.config("baseUrl");
      console.log(baseUrl);
      console.log(response);
      return response[baseUrl][key];
    } catch (error) {
      console.error(`Error getting local storage item: ${error}`);
    }
  }
  setLocalStorageItem(key, value) {
    try {
      cy.window().then((win) => {
        win.localStorage.setItem(key, value);
      });
    } catch (error) {
      console.error(`Error setting local storage item: ${error}`);
    }
  }
}

class WeatherWidget extends MainPageObject {
  constructor() {
    super();
    this.weatherWidget = "[data-testid='weatherWidget']";
  }
  getWeatherContainer() {
    return cy.get(this.weatherWidget);
  }
}

class EmotionsCheckinWidget extends MainPageObject {
  constructor() {
    super();
    this.emotionsCheckin = "[data-testid='emotionsCheckin']";
  }
  getEmotionsCheckinContainer() {
    return cy.get(this.emotionsCheckin);
  }
}

class EnergyCheckinWidget extends MainPageObject {
  constructor() {
    super();
    this.energyCheckin = "[data-testid='energyCheckin']";
  }
  getEnergyCheckinContainer() {
    return cy.get(this.energyCheckin);
  }
}

class CalendarWidget extends MainPageObject {
  constructor() {
    super();
    this.calendar = "[data-testid='calendar']";
  }
  getCalendarContainer() {
    return cy.get(this.calendar);
  }
}

class ToDoListWidget extends MainPageObject {
  constructor() {
    super();
    //NewTask component (4)
    this.newTaskTitle = '[data-test="todo-newtask-name-input"]';
    this.newTaskSteps = '[data-test="todo-newtask-steps-list"]';
    this.newTaskSubmitBtn = '[data-test="todo-newtask-submit-btn"]';
    this.newTaskStepsSubmitBtn = '[data-test="todo-newtask-step-submit-btn"]';
    //TaskList component (1)
    this.toDoList = '[data-test="todo-list"]';
    //FullTaskDisplay component (5)
    this.submittedTaskTitle = '[data-test="todo-submitted-task-title"]';
    this.submittedTaskSaveBtn = '[data-test="todo-submitted-task-save-btn"]';
    this.submittedTaskStepList = '[data-test="todo-submitted-task-step-list"]';
    this.submittedTaskNewStep = '[data-test="todo-submitted-task-new-step-input"]';
    this.submittedTaskNewStepSubmitBtn = '[data-test="todo-submitted-task-new-step-submit-btn"]';
  }
  getNewTaskTitleInput() {
    return cy.get(this.newTaskTitle);
  }
  setNewTaskTitle(text) {
    return this.getNewTaskTitleInput().type(text);
  }
  getNewTaskStepList() {
    return cy.get(this.newTaskSteps);
  }
  getNewTaskSubmitBtn() {
    return cy.get(this.newTaskSubmitBtn);
  }
  getNewTaskStepSubmitBtn() {
    return cy.get(this.newTaskStepsSubmitBtn)
  }

}