// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("doLoginAs", function(user) {
	cy
		.get("input[name='email']").type(user.email)
    	.get("input[name='password']").type(user.password + '{enter}')
    cy.wait(3000)
})
Cypress.Commands.add("doSelect", function() {
  cy.get("div").first().click()
    .find('li[role="option"]').first().click()
})

Cypress.Commands.add("getElUseLabel", function(lb){
	return cy.get("label.required").contains(lb).parent()
})








