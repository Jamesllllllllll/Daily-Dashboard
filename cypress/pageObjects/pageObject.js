export class MainPageObject {
  constructor() {
    this.settingsIcon = "[data-testid='SettingsIcon']";
    this.dashboardLogo = "div:contains('Daily Dashboard')";
  }
  visit() {
    cy.visit('/');
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
      const baseUrl = cy.config('baseUrl');
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
    this.toDoList = "[data-testid='toDoList']";
    this.taskItem = '#new-task-item';
    this.taskInput = "[data-testid='new-task-step']";
    this.addTaskStep = "[data-testid='add-task-step']";
    this.saveTask = "[data-testid='save-task']";
    this.firstTask = "[data-testid='task-0']";
    this.firstStep = "#task-step-0";
    this.removeSecondStep = "[data-testid='remove-step-1']"
    this.secondStep = "#task-step-1";
    this.thirdStep = "#task-step-2";
    this.addTaskStepInTaskView = "[data-testid='add-new-step']"
    this.submitStepInTaskView = "[data-testid='submit-new-step']"
    this.firstStepCheckbox = "[data-testid='task-checkbox-0']";
    this.saveOpenTask = "[data-testid='save-opened-task']";
    this.firstTaskStepsCompleted = "[data-testid='steps-completed-0']";
    this.deleteTask = "[data-testid='delete-task']";
  }
  getToDoListContainer() {
    return cy.get(this.toDoList);
  }
  getTaskItem() {
    return cy.get(this.taskItem)
  }
  getTaskInput() {
    return cy.get(this.taskInput);
  }
  getAddTaskStep() {
    return cy.get(this.addTaskStep)
  }
  getSaveTask() {
    return cy.get(this.saveTask)
  }
  getFirstTask() {
    return cy.get(this.firstTask)
  }
  getFirstStep() {
    return cy.get(this.firstStep)
  }
  getRemoveSecondStep() {
    return cy.get(this.removeSecondStep)
  }
  getSecondStep() {
    return cy.get(this.secondStep)
  }
  getThirdStep() {
    return cy.get(this.thirdStep)
  }
  getAddTaskStepInTaskView() {
    return cy.get(this.addTaskStepInTaskView)
  }
  getSubmitStepInTaskView() {
    return cy.get(this.submitStepInTaskView)
  }
  getFirstStepCheckbox() {
    return cy.get(this.firstStepCheckbox)
  }
  getSaveOpenTask() {
    return cy.get(this.saveOpenTask)
  }
  getFirstTaskStepsCompleted() {
    return cy.get(this.firstTaskStepsCompleted)
  }
  getDeleteTask() {
    return cy.get(this.deleteTask)
  }
}
