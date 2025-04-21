# Conpago Test Automation Project

## Overview

Conpago is a digital customer management system designed for care providers in aged care, home care, and retirement living, offering a platform to streamline communication, customer support, service delivery, and business administration, with a mobile app for customers.

## Pre-requisites

### SDKs and other tools

Please install the following SDKs/Tools to your machine:

-   Git
-   Node/NPM

### IDE/Text editors

You can download and use the following text editors:

-   VScode
-   Sublime

## Setting-up Salesbricks Test Automation Repository

1. Establish VCS account and .ssh key on your local.
2. Clone the forked repository or you can directly the repository without forking.
    - Go to the list of repositories in your profile and select `conpago-test-automation` repository.
    - Click `Code` button then click the `copy` icon.
    - Open a terminal and navigate to the path where you want to save or store the `conpago-test-automation` project in your local. Run this command `git clone <space>` and paste the github path of `conpago-test-automation` repository.
3. In your local, navigate to the path where you cloned the test-automation-cd project then run `npm install` command.
4. Install the Playwright framework by running `npx playwright install` command.

## How to Run Tests

There are two options in running the automation tests, headed and headless.

### Running test via Playwright in headed mode

1. Naviate to the `conpago-test-automation` project in your local.
2. Open a terminal and type `npm run test:web` command.
3. The test will run and the result will be displayed in the terminal.

### Running test via Playwright in headless mode

1. Naviate to the `conpago-test-automation` project in your local.
2. Open a terminal and type `npm run test:web` command.
3. The test will run and the result will be displayed in the terminal.

### Playwright Test Report

1. After running the tests, run `npx playwright show-report` command to generate a test report.
