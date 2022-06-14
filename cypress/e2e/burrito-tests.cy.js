describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders'})
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {fixture: 'newOrder'})
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/4')
    cy.visit('http://localhost:3000').wait(500)
  })

  it('should have a title header', () => {
    cy.get('h1').contains('Burrito Builder')
  })

  it('should display all orders', () => {
    cy.get('.order').should('have.length', 3)
  })

  it('should display orders with a header, ingredients, button to remove', () => {
    cy.get('.order-header').eq(1).contains('Artan')
    cy.get('.ingredient-list > li').eq(1).contains('queso fresco')
    cy.get('.order-complete-btn')
  })

  it('should have ingredient options', () => {
    cy.get('.order-form-button').should('have.length', 12)
  })

  it('should display default if no ingredients selected', () => {
    cy.get('.order-form-selected-ingredients').contains('Nothing selected')
  })

  it('should display ingredients selected', () => {
    cy.get('.order-form-button').first().click()
    cy.get('.order-form-button').eq(3).click()
    cy.get('.order-form-button').eq(6).click()
    cy.get('.order-form-selected-ingredients').contains('beans')
    cy.get('.order-form-selected-ingredients').contains('sofritas')
    cy.get('.order-form-selected-ingredients').contains('pico de gallo')
  })

  it('should have an input for order name', () => {
    cy.get('input').should('have.length', 1)
    cy.get('input').should('have.value', '')

    cy.get('input').type('Artan')
    cy.get('input').should('have.value', 'Artan')
  })
  
  it('should be able to submit an order', () => {
    cy.get('.order-form-button').eq(3).click()
    cy.get('input').type('newOrder')
    cy.get('.order-form-submit-btn').click()

    cy.get('.order').should('have.length', 4)
    cy.get('.order-header').eq(3).contains('newOrder')
    cy.get('.ingredient-list').eq(3).contains('lettuce')
  })

  it('should display an error if no name input when submitting a new order', () => {
    cy.get('.order-form-button').first().click()
    cy.get('.order-form-submit-btn').click()
    cy.get('.order-form-error').contains('Please Enter a Name!')
  })
  
  it('should display an error if no ingredients selected when submitting a new order', () => {
    cy.get('input').type('newOrder')
    cy.get('.order-form-submit-btn').click()
    cy.get('.order-form-error').contains('Please select at least one ingredient!')
  })

  it('should be able to complete an order', () => {
    cy.get('.order-complete-btn').first().click()
    cy.get('.order').should('have.length', 2)
  })

})