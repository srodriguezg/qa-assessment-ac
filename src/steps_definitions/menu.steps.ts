import { expect } from "chai";
import { When, Then } from "cucumber";
import { MenuAction } from "../actions/menu.action";
import { MytasksAction } from "../actions/mytasks.action";

let t: TestController;
let menuAction: MenuAction;
let myTasksAction: MytasksAction;

When(/^Go to My Tasks session$/, async function() {
  t = await this.getTestController();
  menuAction = new MenuAction(t);

  await menuAction.goMyTasksSession();
});

Then(/^The message on the top part should say "([^"]*)"$/, async function(message: string) {
  myTasksAction = new MytasksAction(t);
  let actualMessage = await myTasksAction.getTopPartLabel();
  expect(actualMessage).to.equal(message, `The message ${actualMessage} is not equal to ${message}`);
});
