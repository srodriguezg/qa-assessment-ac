import { MenuPage } from "../page_objects/menu.page";

export class MenuAction {
  private menuPage: MenuPage = new MenuPage();
  private t: any;

  constructor(t: any) {
    this.t = t;
  }

  async goMyTasksSession() {
    await this.t.click(this.menuPage.getBtnMyTasks());
  }
}
