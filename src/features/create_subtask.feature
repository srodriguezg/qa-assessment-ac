@create_subtask

Feature: Create subTask
 As a ToDo App user
 I should be able to create a subtask
 So I can break down my tasks into smaller pieces

Scenario: (474) The description field into the pop-up to add new subtasks does not have read-only property and the user can edit it
 Given The user opens the app and login using email and password
 When Go to My Tasks session
 When User types new task name "This is a new automated task"
 When User go to manage subtasks
 Then Main task name field should be read-only

Scenario: (475) The field to add SubTask Description allows to add more than 250 characters
 Given The user opens the app and login using email and password
 When Go to My Tasks session
 When User types new task name "This is a new automated task"
 When User go to manage subtasks
 When Types new subtask name "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddded"
 Then The user can enter the SubTask Description 250 characters

Scenario: (476) User can add a new subtask with empty description and due date
Given The user opens the app and login using email and password
 When Go to My Tasks session
 When User types new task name "This is a new automated task"
 When User go to manage subtasks
 When Types new subtask name " "
 Then The user cannot enter a empty subtask
