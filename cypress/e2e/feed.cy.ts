import { faker } from '@faker-js/faker'

describe('Admin feed management', () => {
  const base = 'http://localhost:5173/'

  it('should login to admin account and create an active tag with 3 characters long', () => {
    const tag = faker.lorem.word(3)
    cy.visit('/login')
    cy.get('input[name="email"]').type('admin@gmail.com')
    cy.get('input[name="password"]').type('1234')
    cy.get('button').contains('Sign In').click()
    cy.wait(2000)

    cy.visit('/dashboard/feed/tags')

    cy.get('input[name=label]').type(tag)
    cy.get('input[name=is_active]').check()
    cy.get('button').contains('Create new tag').click()

    cy.wait(2000)

    cy.get(`[data-test-id=${tag}]`).should('have.text', `#${tag}`)
  })

  it('should disable & enable the web tag', () => {
    cy.visit('/dashboard/feed/tags')

    cy.get('button[role=switch]').check()

    cy.wait(2000)

    cy.get('button[role=switch]').should('not.be.checked')

    cy.get('button[role=switch]').check()

    cy.get('button[role=switch]').should('be.checked')
  })
})
