import { expect } from "chai";
import { Given } from "cucumber";
import { LoginAction } from "../actions/login.action";

let t: TestController;
let loginAction: LoginAction;

Given(/^The user opens the app and login using email and password$/, {timeout: 180 * 1000}, async function() {
  t = await this.getTestController();
  loginAction = new LoginAction(t);

  await loginAction.goto('https://qa-test.avenuecode.io/');
  await loginAction.login('santiagorock000@gmail.com', 'EkPdVN7S4RLGyLX');
});
