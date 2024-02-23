/* global cy */

import { MainPageObject } from "../pageObjects/pageObject";

const mainPageObject = new MainPageObject();
const toDoList = mainPageObject.getToDoListWidget();
describe('To-Do List', () => {
  it('testing todo widget object function', () => {
    mainPageObject.visit();
    toDoList.setNewTaskTitle('hello');
    
  });
});