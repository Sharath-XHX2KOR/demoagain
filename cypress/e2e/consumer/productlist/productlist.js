import {Given,When,Then} from "cypress-cucumber-preprocessor/steps";

before(()=>{
    cy.homePage();
})

const category = "SaaS"
const product = ["TreeLine","DocHub"]

    Given("the Service menu is visible",()=>{
        cy.mouseHover('Service')
        cy.checkSubCategory(category)
    })

    When("user clicks on SaaS sub-category",()=>{
        cy.checkSubCategory(category).click().wait(5000)
    })

    Then("user should be able to view products in the SaaS landing page",()=>{
        cy.productListedInSubCat(category)
    })
    
    Given("user is in SaaS landing page",()=>{
        cy.verifyLandingPage(category)
    })
    When("user clicks on Explore All",()=>{
        cy.exploreAll()
    })
    Then("user should be able to view all the products which belongs to SaaS sub-category",()=>{
        product.forEach((product)=>{
            cy.checkListing(category,product)
        })
    })