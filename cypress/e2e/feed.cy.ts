import { faker } from '@faker-js/faker'

describe('Admin feed management', () => {
  const base = 'http://localhost:5173/'

  it('should login to admin account and create an active tag with 3 characters long, disable and re-enable the tag', () => {
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
    cy.get(`[data-test-id=switch-${tag}]`).click()

    cy.wait(500)
    cy.get(`[data-test-id=switch-${tag}]`).should('have.attr', 'data-state', 'unchecked')
    cy.get(`[data-test-id=switch-${tag}]`).click()
    cy.wait(500)
    cy.get(`[data-test-id=switch-${tag}]`).should('have.attr', 'data-state', 'checked')
  })

  it('should create a draft post, click on created draft and check inserted draft info into post creation form and create post', () => {
    const title = faker.lorem.sentence(3)
    const content = faker.lorem.paragraph(3)
    const author = faker.person.fullName()

    cy.visit('/login')
    cy.get('input[name="email"]').type('admin@gmail.com')
    cy.get('input[name="password"]').type('1234')
    cy.get('button').contains('Sign In').click()
    cy.wait(2000)

    cy.visit('/dashboard/feed/posts/create')

    cy.wait(2000)

    cy.get('input[name=title]').type(title)
    cy.get('input[name=content]').type(content)
    cy.get('input[name=creator]').type(author)

    cy.get('input[id=tags_search_field]').type('web').trigger('keydown', {
      code: 'Tab',
    })

    cy.get('input[name=is_active]').check()

    cy.get('button').contains('Save as draft').click()

    cy.wait(200)

    cy.get('label').contains('No drafts').should('not.exist')

    cy.get('label').contains(title).click()

    cy.wait(200)

    cy.get('input[name=title]').should('have.value', title)

    cy.get('button').contains('Create new post').click()
  })
})
