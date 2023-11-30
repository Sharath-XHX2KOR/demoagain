import {Given,When,Then} from "cypress-cucumber-preprocessor/steps";

before(()=>{
  cy.visit('https://www.demoblaze.com/');
})


    Given("user in home page",()=>{
      cy.get('a[id="itemc"]').contains('Laptops').click()
    })

    When("click phone",()=>{
      cy.get('a[class="hrefch"]').contains('MacBook air').click()
    })

    Then("add to cart",()=>{
      cy.get('a').contains('Add to cart',{timeout:5000}).click()
      cy.get('a').contains('Home').click()
    })
    