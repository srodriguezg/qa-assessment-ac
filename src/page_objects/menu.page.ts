import { $ } from "../utils/selector-factory";

export class MenuPage {
  private btnMyTasks: any;

  constructor() {
    this.btnMyTasks = $('#my_task');
  }

  getBtnMyTasks() {
    return this.btnMyTasks;
  }
}
