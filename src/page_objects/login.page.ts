import { $ } from "../utils/selector-factory";

export class LoginPage {
  private btnSignIn: any;
  private txtEmail: any;
  private txtPassword: any;

  constructor() {
    this.btnSignIn = $('.btn-primary');
    this.txtEmail = $('#user_email');
    this.txtPassword = $('#user_password');
  }

  getBtnSignIn() {
    return this.btnSignIn;
  }

  getTxtEmail() {
    return this.txtEmail;
  }

  getTxtPassword() {
    return this.txtPassword;
  }
}
