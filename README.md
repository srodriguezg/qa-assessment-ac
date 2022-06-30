# qa-assessment-ac
## _By: Santiago Rodriguez Gutierrez_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

I did this evaluation using technologies below

- nodejs
- typescript
- testcafe
- cucumber
- BDD

To run this repository you need to have nodejs (v16.13.0) and npm (v8.1.0) installed on your machine.


## How to install and execute tests

- Clone the repository in your local machine.
- Checkout to main branch where is located the code.
- Open the repository in your preferred editor, I use Visual Studio Code https://code.visualstudio.com/
- Open a terminal and execute ```npm install``` to download all dependencies.
- As soon as dependencies are installed, in the same terminal execute ```npm test``` and wait until automation finish.
- To generate the HTML report execute in the same terminal ```npm run report``` and the report is generated in reports/ folder.

> Important!
> This execution will be done headless, the framework executes the tests in the Chrome browser in headless mode, you will 
> not see the browser or the interaction of the tests. If you want to see the execution please follow instructions:
> - Go to environment.ts file.
> - Comment line #8 and uncomment line #9
> - Execute again and you will see the framework interaction with browser.



## Overview

Next I am going to explain a little about the architecture of the framework, what layers it has and the tests that I added:
All framework code is inside src/ folder.

- features/

In this layer you will find all the test cases defined to automate, and within each test case the scenarios corresponding to the failed acceptance criteria found in exercise number 1 of the assessment. Here we only find gherking and BDD language

- steps_definitions/

In this layer, a link is made between the guerking and the language selected to automate (Typescript) and here only the corresponding functions will be invoked for the test.

- actions/

In this layer we find all the logic and interaction of the elements, writing in a text type field, clicking on a button, returning the size of a table, returning if an element has a specific attribute, etc.

- page_objects/

In this layer is the definition of all the elements that are in a specific page of the application with all the corresponding locators, use identifiers such as classes, IDs or css selectors

- support/

In this layer we find configuration files for the execution of the framework with testcafe and cucumber, this is not part of the tests, but it is important to mention it so that you have it in mind.

## License

MIT

Please feel free to contact me in case you have any doubt or question about this. santiagorock000@gmail.com
**Free Software, Hell Yeah!**

