describe('Blog app', function() {
  const user = {
    username: 'Username1',
    name: 'TestUser',
    password: '1234'
  };

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.clearLocalStorage();
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#loginFormButton').click();

      cy.contains('Logged in')
        .should('be.visible')
        .and('have.css', 'border-color', 'rgb(0, 128, 0)');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password + '1234');
      cy.get('#loginFormButton').click();

      cy.contains('Invalid username or password')
        .should('be.visible')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
  });
});
