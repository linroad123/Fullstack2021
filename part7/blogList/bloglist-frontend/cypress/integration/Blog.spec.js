describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Test User')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('nottest')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')

      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('test1')
      cy.get('#author').type('test author')
      cy.get('#url').type('test.com')
      cy.get('#create-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('test2')
      cy.get('#author').type('test author')
      cy.get('#url').type('test.com')
      cy.get('#create-button').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('test3')
      cy.get('#author').type('test author')
      cy.get('#url').type('test.com')
      cy.get('#create-button').click()
    })
    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test0')
      cy.get('#author').type('test author')
      cy.get('#url').type('test.com')
      cy.get('#create-button').click()
      cy.should('not.contain', 'test2')
    })
    it('User can like the blog', function () {
      cy.get('#test1-toggle').click()
      cy.get('#test1-like-button').click()
      cy.get('#test1-likes').should('contain', '1')
    })
    it('User can delete the blog', function () {
      cy.get('#test2-toggle').click()
      cy.get('#test2-remove-button').click()
      cy.contains('test2').should('not.exist')
    })
    it('Blogs are ordered by likes', function () {
      const counts = [5, 15, 10]
      // Should be test2, test3, test1
      for (let foo = 1; foo <= 3; foo++) {
        cy.get(`#test${foo}-toggle`).click()
        for (let bar = 0; bar < counts[foo - 1]; bar++) {
          cy.get(`#test${foo}-like-button`).click()
        }
      }
      cy.get('#blog-form')
        .next().should('contain', 'test2')
        .next().should('contain', 'test3')
        .next().should('contain', 'test1')
    })
  })
})
