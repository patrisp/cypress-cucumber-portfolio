# Test automation project - Cypress with Cucumber

This repository contains a test automation project using Cypress and Cucumber for testing the website [justjoin.it](https://justjoin.it/). The tests are written in JavaScript.

## Project Overview
The goal of this project is to automate the testing of the justjoin.it website, ensuring the functionality works as expected and providing a reliable and efficient testing solution. Cypress is used as the test automation framework due to its simplicity and flexibility. Cucumber is employed for writing expressive and readable feature files in Gherkin syntax.

Cypress Mochawesome reporting tool is impelemented to generate interactive HTML reports. It provides detailed information about test results, including a summary overview, test duration and pass/fail status. The HTML report is stored in `cypress/reports`.

## Features
- **End-to-End Testing:** Automate end-to-end tests to validate the core functionalities of the justjoin.it website.
- **Cucumber Integration:** Leverage Cucumber to write and execute behavior-driven development (BDD) style tests for better collaboration between technical and non-technical team members.
- **JavaScript:** The test scripts are written in JavaScript, making it accessible to a wide range of developers.


## Installation

Clone the project

```bash
  git clone https://github.com/patrisp/cypress-portfolio.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install cypress --save-dev
  npm install --save-dev cypress-cucumber-preprocessor
  npm install --save-dev cypress-mochawesome-reporter
```

## Test running

Run all tests in headless mode

```bash
  npm run cy:run
```
Run only the test teardown

```bash
  npm run cy:teardown
```



