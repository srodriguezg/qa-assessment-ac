@create_task

Feature: Create Task
 As a ToDo App user
 I should be able to create a task
 So I can manage my tasks

Scenario: (471) Message on the top part when the user is in my tasks session
 Given The user opens the app and login using email and password
 When Go to My Tasks session
 Then The message on the top part should say "Hey Santiago Rodriguez Gutierrez, this is your todo list for today:"

Scenario: (472) The field to add new task allows you to enter less than 3 characters and create the task
 Given The user opens the app and login using email and password
 When Go to My Tasks session
 When User types new task name "nt"
 Then The app does not allow to enter this tasks due the task should require at least three characters

Scenario: (473) The field to add new task allows to add more than 250 characters
 Given The user opens the app and login using email and password
 When Go to My Tasks session
 When User types new task name "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddded"
 Then The app does not allow to enter this tasks because the task can not have more than 250 characters
