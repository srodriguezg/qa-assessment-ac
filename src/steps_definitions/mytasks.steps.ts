import { expect } from "chai";
import { When, Then } from "cucumber";
import { MytasksAction } from "../actions/mytasks.action";

let t: TestController;
let myTasksAction: MytasksAction;
let quantityOfTasksBeforeSave: any;
let quantityOfsubTasksBeforeSave: any;

When(/^User types new task name "([^"]*)"$/, async function(taskName: string) {
  t = await this.getTestController();
  myTasksAction = new MytasksAction(t);
  quantityOfTasksBeforeSave = await myTasksAction.getTasksQuantity();
  await myTasksAction.addNewTask(taskName);
});

When(/^User go to manage subtasks$/, async function() {
  await myTasksAction.goToManageSubtasks();
});

When(/^Types new subtask name "([^"]*)"$/, async function(subtaskName: string) {
  t = await this.getTestController();
  myTasksAction = new MytasksAction(t);
  quantityOfsubTasksBeforeSave = await myTasksAction.getSubtasksQuantity();
  await myTasksAction.addSubTask(subtaskName, '06/30/2022');
});

Then(/^The app does not allow to enter this tasks due the task should require at least three characters$/, async function() {
  myTasksAction = new MytasksAction(t);
  let quantityOfTasksAfterSave = await myTasksAction.getTasksQuantity();
  expect(quantityOfTasksAfterSave).is.equal(quantityOfTasksBeforeSave,
    `Before to click on save the quantity of tasks is ${quantityOfTasksBeforeSave}
     and after to save the quantity of tasks is ${quantityOfTasksAfterSave},
     this means that the task was added successfully`);
});

Then(/^The app does not allow to enter this tasks because the task can not have more than 250 characters$/, async function() {
  myTasksAction = new MytasksAction(t);
  let quantityOfTasksAfterSave = await myTasksAction.getTasksQuantity();
  expect(quantityOfTasksAfterSave).is.equal(quantityOfTasksBeforeSave,
    `Before to click on save the quantity of tasks is ${quantityOfTasksBeforeSave}
     and after to save the quantity of tasks is ${quantityOfTasksAfterSave},
     this means that the task was added successfully`);
});

Then(/^Main task name field should be read-only$/, async function() {
  expect(await myTasksAction.isMainTaskFieldReadOnly()).to.true;
});

Then(/^The user can enter the SubTask Description 250 characters$/, async function() {
  let quantityOfsubTasksAfterSave = await myTasksAction.getSubtasksQuantity();
  expect(quantityOfsubTasksAfterSave).is.equal(quantityOfsubTasksBeforeSave,
    `Before to click on save the quantity of subtasks is ${quantityOfsubTasksBeforeSave}
     and after to save the quantity of subtasks is ${quantityOfsubTasksAfterSave},
     this means that the subtask was added successfully`);
});

Then(/^The user cannot enter a empty subtask$/, async function() {
  let quantityOfsubTasksAfterSave = await myTasksAction.getSubtasksQuantity();
  expect(quantityOfsubTasksAfterSave).is.equal(quantityOfsubTasksBeforeSave,
    `Before to click on save the quantity of subtasks is ${quantityOfsubTasksBeforeSave}
     and after to save the quantity of subtasks is ${quantityOfsubTasksAfterSave},
     this means that the subtask was added successfully and the user was able to save empty subtask`);
});
