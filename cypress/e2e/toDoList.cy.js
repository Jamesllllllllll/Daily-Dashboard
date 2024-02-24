/* global cy */

import { MainPageObject } from "../pageObjects/pageObject";

const mainPageObject = new MainPageObject();
const toDoWidget = mainPageObject.getToDoListWidget();
const taskName = 'Buy Groceries';
const taskNameEdit = ' - 8/4/23';
const stepNameEdit = 'Ice cream';
const newStepName = 'Kombucha';

describe('ToDo Widget E2E Tests', () => {

  it('E2E test 1', () => {
    mainPageObject.visit();
    // Enter new task name
    toDoWidget.setNewTaskTitle(taskName);
    toDoWidget.getNewTaskTitleInput().should('have.value', taskName);
    toDoWidget.getNewTaskNewStep().should('be.visible');
    toDoWidget.getNewTaskStepSubmitBtn().should('be.visible');
    toDoWidget.getNewTaskSubmitBtn().should('be.visible');
    // Click add step button when step input is empty
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().should('be.empty');    
    // Submit task
    toDoWidget.getNewTaskSubmitBtn().click();
    toDoWidget.getToDoList().should('be.visible');
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 0 of 1 steps.')
    // Click into task to display detailed task view
    toDoWidget.getToDoList().first().click();
    toDoWidget.getSubmittedTaskTitle().should('have.value', taskName);
    toDoWidget.getSubmittedTaskStepList().first().find('input').first().should('have.value', taskName);
    toDoWidget.getSubmittedTaskSaveBtn().should('be.visible');
    toDoWidget.getSubmittedTaskNewStepInput().should('be.visible');
    toDoWidget.getSubmittedTaskNewStepSubmitBtn().should('be.visible');
    // Click add step button when step input is empty
    toDoWidget.getSubmittedTaskNewStepSubmitBtn().click();
    toDoWidget.getSubmittedTaskNewStepSubmitBtn().click();
    toDoWidget.getSubmittedTaskNewStepSubmitBtn().click();
    toDoWidget.getSubmittedTaskStepList().children().should('have.length', 1);
    // Rename step 1
    toDoWidget.getSubmittedTaskStepList().first().find('input').first().type(`{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}${stepNameEdit}`);
    toDoWidget.getSubmittedTaskStepList().first().find('input').first().should('have.value', stepNameEdit);
    // Add new step
    toDoWidget.setSubmittedTaskNewStep(newStepName);
    toDoWidget.getSubmittedTaskNewStepSubmitBtn().click();
    toDoWidget.getSubmittedTaskStepList().children().should('have.length', 2);
    toDoWidget.getSubmittedTaskStepList().first().find('input').eq(2).should('have.value', newStepName);
    // Rename task
    toDoWidget.editSubmittedTaskTitle(taskNameEdit);
    toDoWidget.getSubmittedTaskTitle().should('have.value', taskName + taskNameEdit);
    // Save task
    toDoWidget.getSubmittedTaskSaveBtn().click();
    toDoWidget.getNewTaskTitleInput().should('be.visible');
    toDoWidget.getToDoList().should('be.visible');
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 0 of 2 steps.');
    // Click back into task to display detailed task view
    toDoWidget.getToDoList().first().click();
    // Marks steps as complete
    toDoWidget.getSubmittedTaskStepList().first().find('input').eq(1).click();
    toDoWidget.getSubmittedTaskStepList().first().find('input').eq(1).should('have.prop', 'checked', true);
    toDoWidget.getSubmittedTaskStepList().first().find('input').eq(3).click();
    toDoWidget.getSubmittedTaskStepList().first().find('input').eq(3).should('have.prop', 'checked', true);
    toDoWidget.getSubmittedTaskSaveBtn().click();
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 2 of 2 steps.');
    toDoWidget.getToDoList().find('div').eq(1).should('have.css', 'background-color', 'rgba(0, 255, 0, 0.25)');
    toDoWidget.getToDoList().find('div').last().should('have.css', 'background-color', 'rgba(0, 255, 0, 0.25)');
    // Delete task
    toDoWidget.getToDoList().find('button').click();
    toDoWidget.getToDoList().should('be.empty');
  });

});
