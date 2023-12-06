Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
import './commands'

// cypress/support/index.js
import 'cypress-cucumber-preprocessor/register';
import 'cypress-mochawesome-reporter/register';
