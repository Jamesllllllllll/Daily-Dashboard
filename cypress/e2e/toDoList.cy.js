/* global cy */

import { MainPageObject } from "../pageObjects/pageObject";

const mainPageObject = new MainPageObject();
const toDoWidget = mainPageObject.getToDoListWidget();
// E2E Test 1
const taskName = 'Buy Groceries';
const taskNameEdit = ' - 8/4/23';
const stepNameEdit = 'Ice cream';
const newStepName = 'Kombucha';

// E2E Test 2
const taskName2 = 'Daily Exercise';
const taskName2Step1 = '100 squats';
const taskName2Step2 = '100 push-ups';
const taskName2StepToBeDeleted = 'Run 20km';
const taskName2Step3 = '100 sit-ups';
const taskName2Step4 = 'Run 10km';


describe('ToDo Widget E2E Tests', () => {
  
  it('E2E test 1', () => {
    // Open URL
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
    toDoWidget.getNewTaskTitleInput().should('have.value', '');
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

  it('E2E Test 2', () => {
    // Open URL
    mainPageObject.visit();
    // Enter new task name, delete it, then add different task name
    toDoWidget.setNewTaskTitle(taskName);
    toDoWidget.getNewTaskTitleInput().should('have.value', taskName);
    const newTaskStepInput = toDoWidget.getNewTaskNewStep();
    toDoWidget.getNewTaskTitleInput().type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
    toDoWidget.getToDoContainer().should('not.contain', newTaskStepInput);
    toDoWidget.getNewTaskStepSubmitBtn().should('not.exist');
    toDoWidget.getNewTaskSubmitBtn().should('not.exist');
    toDoWidget.setNewTaskTitle(taskName2);
    toDoWidget.getNewTaskNewStep().should('be.visible');
    toDoWidget.getNewTaskStepSubmitBtn().should('be.visible');
    toDoWidget.getNewTaskSubmitBtn().should('be.visible');
    // Enter multiple steps
    toDoWidget.setNewTaskNewStep(taskName2Step1);
    toDoWidget.getNewTaskNewStep().should('have.value', taskName2Step1);
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().should('be.visible');
    toDoWidget.getNewTaskStepList().children().should('have.length', 1);
    toDoWidget.getNewTaskStepList().first().find('input').should('have.value', taskName2Step1);
    toDoWidget.setNewTaskNewStep(taskName2StepToBeDeleted);
    toDoWidget.getNewTaskNewStep().should('have.value', taskName2StepToBeDeleted);
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().children().should('have.length', 2);
    toDoWidget.getNewTaskStepList().first().find('input').eq(1).should('have.value', taskName2StepToBeDeleted);
    toDoWidget.setNewTaskNewStep(taskName2Step2);
    toDoWidget.getNewTaskNewStep().should('have.value', taskName2Step2);
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().children().should('have.length', 3);
    toDoWidget.getNewTaskStepList().first().find('input').eq(2).should('have.value', taskName2Step2);
    toDoWidget.setNewTaskNewStep(taskName2Step3);
    toDoWidget.getNewTaskNewStep().should('have.value', taskName2Step3);
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().children().should('have.length', 4);
    toDoWidget.getNewTaskStepList().first().find('input').eq(3).should('have.value', taskName2Step3);
    // Delete a step
    toDoWidget.getNewTaskStepList().first().find('button').eq(1).click();
    toDoWidget.getNewTaskStepList().first().find('input').eq(1).should('have.value', taskName2Step2);
    // Add one more step
    toDoWidget.setNewTaskNewStep(taskName2Step4);
    toDoWidget.getNewTaskNewStep().should('have.value', taskName2Step4);
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().children().should('have.length', 4);
    toDoWidget.getNewTaskStepList().first().find('input').eq(3).should('have.value', taskName2Step4);
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepSubmitBtn().click();
    toDoWidget.getNewTaskStepList().children().should('have.length', 4);
    // Save task
    toDoWidget.getNewTaskSubmitBtn().click();
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 0 of 4 steps.')
    // Click into task
    toDoWidget.getToDoList().first().click();
    // Toggle step removal
    toDoWidget.getSubmittedTaskStepList().find('button').first().click();
    toDoWidget.getSubmittedTaskStepList().first().find('li').first().find('input').should('be.disabled');
    toDoWidget.getSubmittedTaskStepList().find('button').first().click();
    toDoWidget.getSubmittedTaskStepList().first().find('li').first().find('input').should('be.enabled');
    // Save Task
    toDoWidget.getSubmittedTaskSaveBtn().click();
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 0 of 4 steps.');
    // Re-enter task and remove the first step and save
    toDoWidget.getToDoList().first().click();
    toDoWidget.getSubmittedTaskStepList().find('button').first().click();
    toDoWidget.getSubmittedTaskSaveBtn().click();
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 0 of 3 steps.');
    // Re-enter task, mark some steps complete, and save
    toDoWidget.getToDoList().first().click();
    toDoWidget.getSubmittedTaskStepList().first().find('li').first().find('input').first().should('have.value', taskName2Step2);
    toDoWidget.getSubmittedTaskStepList().first().find('li').first().find('input').last().click();
    toDoWidget.getSubmittedTaskStepList().first().find('li').last().find('input').last().click();
    toDoWidget.getSubmittedTaskSaveBtn().click();
    toDoWidget.getToDoList().find('p').last().should('have.text', 'Completed 2 of 3 steps.');
  })

});
