// https://docs.cypress.io/api/introduction/api.html
describe('Test main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })
  it('check links', () => {
    cy.get('[data-cy=links]')
      .children()
      .should('have.length', 5)
  })
})
