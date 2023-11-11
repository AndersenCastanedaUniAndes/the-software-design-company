# Cypress

Cypress application that executes E2E cases over the application ghost.

## Installation

This guide will help you install Cypress 13.5.0 on Mac, Linux, or Windows.

### Install dependecies
1. Go to the cypress folder
2. Execute in a terminal any of the following commands: npm i, npm install, yarn install.
3. If the previous step went well then you are alredy to start with Cypress !!!

### Configuration
1. These e2e tests run on http://localhost:2369/ghost/. If you wanna run it on a different url and port, please go to cypress.config.js and modify the baseURL property.
2. **(IMPORTANT) To allow cypress to log in to your local version of Ghost, please add your credentials (email, password) in the user.json file localed in cypress/fixtures**

## Usage
### To run Cypress without a UI (headless mode)
Execute in a terminal any of the following commands: 
1. **npm run run:headless** 
2. **yarn run:headless**

### To run Cypress with a UI
Execute in a terminal any of the following commands: 
1. **npm run open**
2. **yarn open**

### To run Cypress (headless mode) to generate reports
Execute in a terminal any of the following commands: 
1. **npm run run:reporter**
2. **yarn run:reporter**

- The results can be found in cypress / reports /  html. You should open the index.html file with any browser to see the results.
- Also videos can be found in videos.

## Authors 

* Cristian Camilo Pinzon Hernandez
* Juan Carlos De Jesus
* Alex Santiago Meneses Sanchez
* Andersen Castañeda 
