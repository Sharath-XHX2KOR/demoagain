//create custom commands

//CUSTOM COMMAND TO ACCEPT COOKIE IF VISIBLE
Cypress.Commands.add('acceptCookies',()=>{
    let cookiesAccepted = false;
    if (!cookiesAccepted) {   
      cy.get(":nth-child(4) > .MuiButton-text").click();   
      cookiesAccepted = true; 
         
    }    
})
  
  //CUSTOM COMMAND TO ENSURE HOMEPAGE IS COMPLETELY LOADED: 
  Cypress.Commands.add("homePage", () => {
          const homepageUrl = "https://qa-sp.docs-dev.bosch-fsde.com/";
          cy.visit(homepageUrl).then(() => {   
            cy.acceptCookies()
            cy.url()    
              .should("eq", homepageUrl)    
              .then(() => {    
                cy.get("span")    
                  .contains("BEST Sharing Platform")
                  .should("be.visible")
                  .then(() => {
                    const searchCategory = ["Services", "Workflows", "Frameworks"];
                    searchCategory.forEach((text) => {
                      cy.contains(text).should("be.visible");
                    });
                  });
              });
          });
  });
  
  // CUSTOM COMMAND TO MOUSEHOVER ON AN ITEM
  Cypress.Commands.add('mouseHover',(category)=>{
          cy.contains(category).should('be.visible').trigger('mouseover')
  })
  
  // CUSTOM COMMAND TO CHECK IF THE SUB-CATEGORY IS VISIBLE OR NOT
  Cypress.Commands.add('checkSubCategory',(subCategory)=>{
          cy.contains("p",subCategory).should('be.visible')
  })

  //FUNCTION TO REPLACE WHITE SPACE(' ') WITH HYPHEN('-')
  function formatCategory(category) {
    if (category.includes(' ')) {
      return category.replace(/ /g, '-').toLowerCase();
    }
    return category.toLowerCase();
  }

  //CUSTOM COMMAND TO FIND THE CARD WHERE ALL THE PRODUCTS ARE LISTED
  Cypress.Commands.add('productListedInSubCat',(category)=>{
      const extension= formatCategory(category);
      cy.url().then((url)=>{
        expect(url).to.include(extension)
      })
      cy.get('.category_products-container__uEVuR').first().should('be.visible').within(($element)=>{
      cy.wrap($element).find('.view-product-info_card-item-responsive__29uWN').should('be.visible').its('length').should('be.gt',0)
    })
  })
  
  //CUSTOM COMMAND TO VERIFY IF THE REQUIRED PAGE IS LOADED
  Cypress.Commands.add('verifyLandingPage',(category)=>{
    const extension= formatCategory(category);
    const urlWithExtension='https://qa-sp.docs-dev.bosch-fsde.com/'+ extension ;
    cy.visit(urlWithExtension)
    cy.acceptCookies()
    cy.get('a').contains(category).should('be.visible')
  })
  
  //CUSTOM COMMAND TO FIND EXPLORE ALL BUTTON INSIDE THE CARD AREA
  Cypress.Commands.add('exploreAll',()=>{
    cy.get('.category_products-container__uEVuR').first().should('be.visible').within(($element)=>{
      cy.get('button').contains('Explore All').click().wait(10000)
    })
  })
  
  //CUSTOM COMMAND TO CHECK THE PRODUCTS ARE LISTING IN LISTING PAGE
  Cypress.Commands.add('checkListing',(category,product)=>{
    cy.get('.makeStyles-breadcrumbOuterDiv-1').contains(category).should('be.visible')
    cy.get('.makeStyles-breadcrumbOuterDiv-1').contains('Listing').should('be.visible')
    cy.get('#container0 > :nth-child(1)').within(()=>{
      cy.contains(category).get('input').should('be.checked')
    })
    cy.get('.MuiGrid-spacing-xs-3').should('be.visible').within(()=>{
        cy.get('.MuiGrid-item').should('be.visible').get('h6').contains(product)
   })
  })
