/// <reference types="Cypress" />

context('Simple test cases', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Validate homepage', () => {
    cy.title().should('eq', 'Express Framework')
    cy.get('p').should('be.visible')
    cy.wait(500)
  })
})
