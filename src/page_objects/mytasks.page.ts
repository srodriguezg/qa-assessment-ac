import { $ } from "../utils/selector-factory";

export class MytasksPage {
  private lblTopPart: any;
  private txtNewTask: any;
  private tblTasks: any;
  private btnManageSubtasks: any;
  private txtMainTaskName: any;
  private tblSubtasks: any;
  private txtSubtaskDescription: any;
  private txtDuedate: any;
  private btnAdd: any;

  constructor() {
    this.lblTopPart = $('h1');
    this.txtNewTask = $('#new_task');
    this.tblTasks = $('.table');
    this.btnManageSubtasks = $('.btn-primary');
    this.txtMainTaskName = $('#edit_task');
    this.tblSubtasks = $('.modal-content .table')
    this.txtSubtaskDescription = $('#new_sub_task');
    this.txtDuedate = $('#dueDate');
    this.btnAdd = $('#add-subtask');
  }

  getLblTopPart() {
    return this.lblTopPart;
  }

  getTxtNewTask() {
    return this.txtNewTask;
  }

  getTblTasks() {
    return this.tblTasks;
  }

  getBtnManageSubtasks() {
    return this.btnManageSubtasks;
  }

  getTxtMainTaskName() {
    return this.txtMainTaskName;
  }

  getTblSubtasks() {
    return this.tblSubtasks;
  }

  getTxtSubtaskDescription() {
    return this.txtSubtaskDescription;
  }

  getTxtDueDate() {
    return this.txtDuedate;
  }

  getBtnAdd() {
    return this.btnAdd;
  }
}
