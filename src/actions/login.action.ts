import { LoginPage } from "../page_objects/login.page";

export class LoginAction {
  private loginPage: LoginPage = new LoginPage();
  private t: any;

  constructor(t: any) {
    this.t = t;
  }

  async goto(url: string) {
    await this.t.navigateTo(url);
  }

  async login(email: string, password: string) {
    await this.t
              .click(this.loginPage.getBtnSignIn())
              .typeText(this.loginPage.getTxtEmail(), email)
              .typeText(this.loginPage.getTxtPassword(), password)
              .click(this.loginPage.getBtnSignIn());
  }
}
