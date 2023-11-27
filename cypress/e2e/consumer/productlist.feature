Feature: Product Listing-SaaS
Scenario: User should be able to view items under SaaS landing page
        Given the Service menu is visible
        When user clicks on SaaS sub-category
        Then user should be able to view products in the SaaS landing page

Scenario: User should be able to view all the products which belongs to SaaS sub-category
        Given user is in SaaS landing page
        When user clicks on Explore All
        Then user should be able to view all the products which belongs to SaaS sub-category

 

 
