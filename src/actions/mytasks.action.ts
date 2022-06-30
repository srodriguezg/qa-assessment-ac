import { MytasksPage } from "../page_objects/mytasks.page";

export class MytasksAction {
  private mytasksPage: MytasksPage = new MytasksPage();
  private t: any;

  constructor(t: any) {
    this.t = t;
  }

  async getTopPartLabel() {
    return await this.mytasksPage.getLblTopPart().innerText;
  }

  async addNewTask(taskName: string) {
    await this.t.typeText(this.mytasksPage.getTxtNewTask(), taskName).pressKey('enter');
  }

  async getTasksQuantity() {
    return await this.mytasksPage.getTblTasks().find('tr').count;
  }

  async goToManageSubtasks() {
    await this.t.click(this.mytasksPage.getBtnManageSubtasks().nth(0));
  }

  async isMainTaskFieldReadOnly() {
    return await this.mytasksPage.getTxtMainTaskName().hasAttribute('readonly');
  }

  async editMainTaskName(taskName: string) {
    await this.t.typeText(this.mytasksPage.getTxtMainTaskName(), taskName);
  }

  async getSubtasksQuantity() {
    return await this.mytasksPage.getTblSubtasks().find('tr').count;
  }

  async addSubTask(subtaskDescription: string, dueDate: string) {
    await this.t
              .typeText(this.mytasksPage.getTxtSubtaskDescription(), subtaskDescription)
              .typeText(this.mytasksPage.getTxtDueDate(), dueDate)
              .click(this.mytasksPage.getBtnAdd());
  }
}
