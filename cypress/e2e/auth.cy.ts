import { faker } from '@faker-js/faker'

describe('User authentication', () => {
  const base = 'http://localhost:5173/'

  const email = faker.internet.email()
  const password = '1234'

  it('should register an account', () => {
    cy.visit('/')

    cy.get('a[href*="/"]').contains('Reset')

    cy.visit('/register')

    cy.url().should('eq', base + 'register')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    cy.get('button').contains('Sign Up').click()

    cy.wait(3000)

    cy.url().should('eq', base + 'login')
  })

  it('should login to the account', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    cy.get('button').contains('Sign In').click()

    cy.wait(2000)

    cy.url().should('eq', base)
  })
})
